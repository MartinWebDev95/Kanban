import supabase from '../../supabase';

const addTaskStatus = async ({ taskStatus }) => {
  // Add new tasks status in the database that belong to the new board
  try {
    await supabase
      .from('status')
      .insert(taskStatus);
  } catch (error) {
    throw new Error(error.message);
  }
};

export default addTaskStatus;
