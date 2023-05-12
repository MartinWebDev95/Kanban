function ListOfInputs({ inputs, setInputs, isSubtask = false }) {
  // Change the input value that has been written to
  const handleChange = (e) => {
    const newState = inputs.map((input) => {
      if (input.idInput === e.target.id) {
        return { ...input, valueInput: e.target.value };
      }

      return input;
    });

    setInputs(newState);
  };

  // Add news inputs
  const handleAddInput = () => {
    const generateInputId = crypto.randomUUID();

    if (isSubtask) {
      setInputs([
        ...inputs,
        {
          idInput: generateInputId,
          nameInput: `subtask-${generateInputId}`,
          doneInput: false,
          valueInput: '',
        },
      ]);
    } else {
      setInputs([
        ...inputs,
        {
          idInput: generateInputId,
          nameInput: `taskStatus-${generateInputId}`,
          valueInput: '',
        },
      ]);
    }
  };

  // Delete inputs
  const handleDelete = (id) => {
    setInputs(inputs.filter((input) => input.idInput !== id));
  };

  return (
    <>
      <label htmlFor="taskName" className="flex flex-col gap-2">
        <span className="text-gray-500 dark:text-white text-sm font-semibold">
          {isSubtask ? 'Subtasks' : 'Board Columns'}
        </span>

        {inputs.map(({ idInput, nameInput, valueInput }) => (
          <div className="flex items-center gap-2" key={idInput}>
            <input
              type="text"
              name={nameInput}
              id={idInput}
              value={valueInput}
              placeholder={isSubtask ? 'e.g. Take coffe break' : 'e.g. Todo'}
              className="dark:bg-slate-800 border-2 rounded-md py-2 px-2 border-gray-200 dark:border-gray-500 flex-1 placeholder:text-sm dark:text-white text-black font-normal"
              onChange={handleChange}
            />
            <button
              type="button"
              className="w-fit"
              onClick={() => handleDelete(idInput)}
            >
              <img src="/assets/icon-cross.svg" alt="Delete input" />
            </button>
          </div>
        ))}
      </label>

      <button
        type="button"
        className="w-full rounded-full text-white bg-indigo-700 dark:text-indigo-700 dark:bg-white py-2 font-semibold lg:hover:bg-indigo-500 lg:hover:text-white transition-all duration-300 ease-in-out"
        onClick={handleAddInput}
      >
        {isSubtask ? '+ Add New Subtask' : '+ Add New Column'}
      </button>
    </>
  );
}

export default ListOfInputs;
