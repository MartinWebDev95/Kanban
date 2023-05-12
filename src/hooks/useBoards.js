import { useCallback, useEffect, useState } from 'react';
import useAuthContext from './useAuthContext';
import useDatabaseContext from './useDatabaseContext';
import addBoard from '../services/addBoard';
import updateBoardName from '../services/updateBoardName';

function useBoards({ openBoardModal, updating }) {
  const { currentUser } = useAuthContext();
  const {
    selectedBoard, setSelectedBoard, boards, setBoards,
  } = useDatabaseContext();
  const [nameBoard, setNameBoard] = useState('');

  // Write the board name in the input value if it is in update mode
  useEffect(() => {
    if (updating) {
      setNameBoard(selectedBoard.name);
    } else {
      setNameBoard('');
    }
  }, [openBoardModal, selectedBoard]);

  const addOrUpdateBoards = useCallback(async () => {
    if (!updating) {
      // Add new board to the database
      const newBoard = await addBoard({ boardName: nameBoard, idUser: currentUser.id });

      // Update the board state with the new board
      setBoards((prevState) => prevState.concat(newBoard[0]));

      // Return the id of the new board just added
      return newBoard[0].id;
    }

    if (selectedBoard.name !== nameBoard) {
      // Update the board name in the database
      await updateBoardName({ idBoard: selectedBoard.id, newBoardName: nameBoard });

      // Update the board name in the boards state
      const newBoardsState = boards.map((item) => {
        if (item.id === selectedBoard.id) {
          return { ...item, name: nameBoard };
        }

        return item;
      });

      setBoards(newBoardsState);

      // Change the first board state to selected
      setSelectedBoard(boards[0]);
    }

    return null;
  }, [currentUser, nameBoard]);

  return {
    addOrUpdateBoards, nameBoard, setNameBoard,
  };
}

export default useBoards;
