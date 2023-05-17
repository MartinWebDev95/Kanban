import supabase from '../../supabase';

const addTask = async ({ boardId, taskInfo }) => {
  const { taskName, taskDescription, taskStatus } = taskInfo;

  // Add a new task in the database
  try {
    const { data } = await supabase
      .from('tasks')
      .insert({
        name: taskName,
        description: taskDescription !== '' ? taskDescription : null,
        board_id: boardId,
        status_id: Number(taskStatus),
      })
      .select();

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default addTask;
