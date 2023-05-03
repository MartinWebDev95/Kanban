import {
  createContext, useEffect, useMemo, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../supabase';

const authContext = createContext();

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [inputEmail, setInputEmail] = useState('');
  const navigate = useNavigate();

  // Gets the current user details if there is an existing session
  const getInfoCurrentUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    const { app_metadata: { provider } } = user;

    if (provider === 'google') {
      setCurrentUser({ id: user.id, name: user.user_metadata.full_name });
    } else {
      setCurrentUser({ id: user.id, name: user.email });
    }
  };

  useEffect(() => {
    // Receive a notification every time an auth event happens.
    supabase.auth.onAuthStateChange((event, session) => {
      // If session is null that means the user is not logged so redirect the user to login page
      if (!session) {
        navigate('/login');

        setCurrentUser(null);
      } else {
        navigate('/');

        getInfoCurrentUser();
      }
    });
  }, []);

  // Sign with magic link method
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await supabase.auth.signInWithOtp({
        email: inputEmail,
        options: {
          emailRedirectTo: import.meta.env.VITE_HOME_URL,
        },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // Sign in with Google OAuth
  const handleLoginWithGoogle = async () => {
    try {
      await supabase.auth.signInWithOAuth({
        provider: 'google',
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const value = useMemo(() => ({
    currentUser, setCurrentUser, inputEmail, setInputEmail, handleLogin, handleLoginWithGoogle,
  }), [currentUser, inputEmail]);

  return (
    <authContext.Provider value={value}>
      {children}
    </authContext.Provider>
  );
}

export { AuthProvider, authContext };
