import supabase from '../../supabase';

const deleteSubtask = async ({ idSubtask }) => {
  // Delete subtask from the database
  try {
    await supabase.from('subtasks').delete().eq('id', idSubtask);
  } catch (error) {
    throw new Error(error.message);
  }
};

export default deleteSubtask;
