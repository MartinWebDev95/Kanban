import supabase from '../../supabase';

const getSubtaskById = async ({ idSubtask }) => {
// Returns a specific subtask
  try {
    const { data } = await supabase
      .from('status')
      .select('id')
      .eq('id', idSubtask);

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default getSubtaskById;
