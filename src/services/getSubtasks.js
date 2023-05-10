import supabase from '../../supabase';

const getSubtasks = async ({ taskId }) => {
  try {
    // Get all subtasks that belongs to the selected task
    const { data } = await supabase.from('subtasks').select().eq('task_id', taskId);

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default getSubtasks;
