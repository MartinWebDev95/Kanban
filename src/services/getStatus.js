import supabase from '../../supabase';

const getStatus = async (selectedBoard) => {
  try {
    // Get all status that belongs to the selected board
    const { data } = await supabase
      .from('status')
      .select()
      .eq('board_id', selectedBoard.id)
      .order('id', { ascending: true });

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default getStatus;
