import supabase from '../../supabase';

const addTaskStatus = async ({ taskStatus }) => {
  // Add new tasks status in the database that belong to the new board
  try {
    const { data } = await supabase
      .from('status')
      .insert(taskStatus)
      .select();

    return data[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

export default addTaskStatus;
