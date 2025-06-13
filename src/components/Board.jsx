import useDatabaseContext from '../hooks/useDatabaseContext';

function Board({ board }) {
  const { selectedBoard, setSelectedBoard } = useDatabaseContext();

  return (
    <li>
      <button
        type="button"
        className={`${board.name === selectedBoard.name ? 'bg-gradient-to-r from-white to-indigo-700 to-90% dark:text-white text-black' : 'text-gray-500'} flex items-center gap-4 pl-6 py-4 rounded-r-full w-full whitespace-nowrap lg:hover:text-indigo-700 dark:lg:hover:bg-white lg:hover:bg-gray-100 transition-all duration-200 ease-in-out`}
        value={board.name}
        onClick={() => setSelectedBoard(board)}
      >
        <img src="/assets/icon-board.svg" alt="Board" />

        <span className={`${board.name === selectedBoard.name && 'dark:drop-shadow-[1px_1px_1px_rgba(0,0,0,0.8)] drop-shadow-[1px_1px_1px_rgba(255,255,255,0.8)]'}`}>
          {board.name}
        </span>
      </button>
    </li>
  );
}

export default Board;
