import supabase from '../../supabase';
import getInfoCurrentUser from './getInfoCurrentUser';

const getBoards = async () => {
  try {
    // Get user id for the query
    const infoUser = await getInfoCurrentUser();

    // Get all boards that belongs to the current user
    const { data } = await supabase
      .from('boards')
      .select()
      .eq('user_id', infoUser.id)
      .order('id', { ascending: true });

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default getBoards;
