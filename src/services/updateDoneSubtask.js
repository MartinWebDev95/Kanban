import supabase from '../../supabase';

const updateDoneSubtask = async ({ idSubtask, doneSubtask }) => {
  // Update the done column in subtasks table in the database
  try {
    await supabase
      .from('subtasks')
      .update({ done: doneSubtask })
      .eq('id', idSubtask);
  } catch (error) {
    throw new Error(error.message);
  }
};

export default updateDoneSubtask;
