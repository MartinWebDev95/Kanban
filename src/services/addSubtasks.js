import supabase from '../../supabase';

const addSubtasks = async ({ subtasks }) => {
  // Add new subtasks in the database that belong to the new task
  try {
    await supabase
      .from('subtasks')
      .insert(subtasks)
      .select();
  } catch (error) {
    throw new Error(error.message);
  }
};

export default addSubtasks;
