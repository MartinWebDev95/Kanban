function getDefaultInputs({ inputs, isSubtask }) {
  if (isSubtask) {
    if (inputs.length > 0) {
      return inputs.map((subtask) => (
        {
          idInput: subtask.id,
          name: `subtasks-${subtask.id}`,
          done: subtask.done,
          value: subtask.name,
        }
      ));
    }

    return (
      [
        {
          idInput: crypto.randomUUID(),
          name: `subtasks-${crypto.randomUUID()}`,
          done: false,
          value: '',
        },
      ]
    );
  }

  if (inputs.length > 0) {
    return inputs.map((status) => (
      {
        idInput: status.id,
        name: `taskStatus-${status.id}`,
        value: status.name,
      }
    ));
  }

  return (
    [
      {
        idInput: crypto.randomUUID(),
        name: `taskStatus-${crypto.randomUUID()}`,
        value: 'Todo',
      },
      {
        idInput: crypto.randomUUID(),
        name: `taskStatus-${crypto.randomUUID()}`,
        value: 'Done',
      },
    ]
  );
}

export default getDefaultInputs;
