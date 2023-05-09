function getDefaultInputs(taskStatus = []) {
  if (taskStatus.length > 0) {
    return taskStatus.map((status) => (
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
