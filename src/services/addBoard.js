import supabase from '../../supabase';

const addBoard = async ({ boardName, idUser }) => {
  // Add a new board in the database
  try {
    const { data } = await supabase
      .from('boards')
      .insert({ name: boardName, user_id: idUser })
      .select();

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default addBoard;
