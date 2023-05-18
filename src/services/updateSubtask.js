import supabase from '../../supabase';

const updateSubtask = async ({ newSubtaskName, idSubtask }) => {
  // Update the name in subtask table in the database
  try {
    await supabase
      .from('subtasks')
      .update({ name: newSubtaskName })
      .eq('id', idSubtask);
  } catch (error) {
    throw new Error(error.message);
  }
};

export default updateSubtask;
