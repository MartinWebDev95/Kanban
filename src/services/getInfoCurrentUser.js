import supabase from '../../supabase';

// Gets the current user details if there is an existing session
const getInfoCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();

  const { app_metadata: { provider } } = user;

  if (provider === 'google') {
    return { id: user.id, name: user.user_metadata.full_name };
  }

  return { id: user.id, name: user.email };
};

export default getInfoCurrentUser;
