import supabase from '../../supabase';

const addSubtasks = async ({ subtasks }) => {
  // Add new subtasks in the database that belong to the new task
  try {
    const { data } = await supabase
      .from('subtasks')
      .insert(subtasks)
      .select();

    return data[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

export default addSubtasks;
