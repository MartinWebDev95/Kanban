import supabase from '../../supabase';

const updateTaskStatus = async ({ idTask, idStatus }) => {
  // Update the status id in tasks table in the database
  try {
    await supabase
      .from('tasks')
      .update({ status_id: idStatus })
      .eq('id', idTask);
  } catch (error) {
    throw new Error(error.message);
  }
};

export default updateTaskStatus;
