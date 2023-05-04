import useDatabaseContext from '../hooks/useDatabaseContext';

function Board({ board }) {
  const { selectedBoard, setSelectedBoard } = useDatabaseContext();

  return (
    <li>
      <button
        type="button"
        className={`${board.name === selectedBoard.name ? 'bg-indigo-700 text-white' : 'text-gray-500'} flex items-center gap-4 pl-6 py-4 rounded-r-full w-full  lg:hover:text-indigo-700 dark:lg:hover:bg-white lg:hover:bg-gray-100 transition-all duration-200 ease-in-out`}
        value={board.name}
        onClick={() => setSelectedBoard(board)}
      >
        <img src="/assets/icon-board.svg" alt="Board" />

        <span>
          {board.name}
        </span>
      </button>
    </li>
  );
}

export default Board;
