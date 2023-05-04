import supabase from '../../supabase';

const getTasks = async (selectedBoard) => {
  try {
    // Get all boards that belongs to the current user
    const { data } = await supabase.from('tasks').select().eq('boardId', selectedBoard.id);

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default getTasks;
