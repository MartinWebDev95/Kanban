const getInputsToUpdate = ({ initialState, inputs }) => inputs.filter(
  (input) => !initialState.some(
    (state) => (input.idInput === state.id) && (input.value === state.name),
  ),
);

export default getInputsToUpdate;
