const getFormattedInputs = ({ newInputs, isSubtask, id }) => newInputs.map((input) => {
  const { idInput, value, ...restNewInput } = input;

  if (isSubtask) {
    return { ...restNewInput, name: value, task_id: id };
  }

  return { ...restNewInput, name: value, board_id: id };
});

export default getFormattedInputs;
