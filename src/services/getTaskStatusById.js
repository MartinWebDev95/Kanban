import supabase from '../../supabase';

const getTaskStatusById = async ({ boardId, statusId }) => {
  // Returns a specific taskStatus
  try {
    const { data } = await supabase
      .from('status')
      .select('id')
      .eq('id', statusId)
      .eq('board_id', boardId);

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default getTaskStatusById;
