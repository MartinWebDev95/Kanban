function getDefaultInputs({ inputs, isSubtask }) {
  if (isSubtask) {
    if (inputs.length > 0) {
      return inputs.map((subtask) => (
        {
          idInput: subtask.id,
          nameInput: `subtasks-${subtask.id}`,
          doneInput: subtask.done,
          valueInput: subtask.name,
        }
      ));
    }

    return (
      [
        {
          idInput: crypto.randomUUID(),
          nameInput: `subtasks-${crypto.randomUUID()}`,
          doneInput: false,
          valueInput: '',
        },
      ]
    );
  }

  if (inputs.length > 0) {
    return inputs.map((status) => (
      {
        idInput: status.id,
        nameInput: `taskStatus-${status.id}`,
        valueInput: status.name,
      }
    ));
  }

  return (
    [
      {
        idInput: crypto.randomUUID(),
        nameInput: `taskStatus-${crypto.randomUUID()}`,
        valueInput: '',
      },
    ]
  );
}

export default getDefaultInputs;
