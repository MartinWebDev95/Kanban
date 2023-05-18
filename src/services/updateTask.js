import supabase from '../../supabase';

const updateTask = async ({ idTask, newTask }) => {
  const { taskName, taskDescription } = newTask;

  // Update the name and description in task table in the database
  try {
    await supabase
      .from('tasks')
      .update({ name: taskName, description: taskDescription })
      .eq('id', idTask);
  } catch (error) {
    throw new Error(error.message);
  }
};

export default updateTask;
