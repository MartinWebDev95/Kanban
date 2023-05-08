import supabase from '../../supabase';

const deleteBoard = async (selectedBoard) => {
  // Delete the selected board from the database
  try {
    await supabase.from('boards').delete().eq('id', selectedBoard.id);
  } catch (error) {
    throw new Error(error.message);
  }
};

export default deleteBoard;
