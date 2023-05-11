import supabase from '../../supabase';

const deleteTask = async ({ idTask }) => {
  // Delete the selected task from the database
  try {
    await supabase.from('tasks').delete().eq('id', idTask);
  } catch (error) {
    throw new Error(error.message);
  }
};

export default deleteTask;
