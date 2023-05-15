import supabase from '../../supabase';

const deleteTaskStatus = async ({ statusId }) => {
  // Delete task status from the database
  try {
    await supabase.from('status').delete().eq('id', statusId);
  } catch (error) {
    throw new Error(error.message);
  }
};

export default deleteTaskStatus;
