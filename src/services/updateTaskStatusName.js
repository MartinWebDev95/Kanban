import supabase from '../../supabase';

const updateTaskStatusName = async ({ newStatusName, idStatus }) => {
  // Update the status name in status table in the database
  try {
    await supabase
      .from('status')
      .update({ name: newStatusName })
      .eq('id', idStatus);
  } catch (error) {
    throw new Error(error.message);
  }
};

export default updateTaskStatusName;
