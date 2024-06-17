import { useState } from 'react';
import BoardModal from './BoardModal';

function NoItems({ isStatus = false }) {
  const [openAddBoardModal, setOpenAddBoardModal] = useState(false);

  return (
    <>
      <div className="w-full h-full grid place-items-center">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-lg lg:text-xl font-semibold text-gray-500 text-center">
            { isStatus
              ? 'This board is empty. Create a new column to get started.'
              : 'There are no boards available. Create a new board to get started.' }
          </h2>

          <button
            type="button"
            className="bg-indigo-700 lg:hover:bg-indigo-500 transition-all duration-300 ease-in-out rounded-full text-white font-semibold px-4 py-2 flex items-center gap-2 text-base lg:text-xl"
            onClick={() => setOpenAddBoardModal(true)}
          >
            <span>
              { isStatus ? '+ Add New Column' : '+ Create New Board' }
            </span>
          </button>
        </div>
      </div>

      <BoardModal
        openBoardModal={openAddBoardModal}
        setOpenBoardModal={setOpenAddBoardModal}
        updating={!!isStatus}
      />
    </>
  );
}

export default NoItems;
