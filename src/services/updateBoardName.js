import supabase from '../../supabase';

const updateBoardName = async ({ idBoard, newBoardName }) => {
  // Update the name in boards table in the database
  try {
    await supabase
      .from('boards')
      .update({ name: newBoardName })
      .eq('id', idBoard);
  } catch (error) {
    throw new Error(error.message);
  }
};

export default updateBoardName;
