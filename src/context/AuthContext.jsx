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

  const getInfoCurrentUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    if (user.user_metadata) {
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

        if (currentUser) {
          setCurrentUser(null);
        }
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
        inputEmail,
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
