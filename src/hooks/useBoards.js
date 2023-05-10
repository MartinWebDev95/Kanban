import { useCallback, useEffect, useState } from 'react';
import useAuthContext from './useAuthContext';
import useDatabaseContext from './useDatabaseContext';
import addBoard from '../services/addBoard';

function useBoards({ openBoardModal, updating }) {
  const { currentUser } = useAuthContext();
  const { selectedBoard, setBoards } = useDatabaseContext();
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

    return null;
  }, [currentUser, nameBoard]);

  return {
    addOrUpdateBoards, nameBoard, setNameBoard,
  };
}

export default useBoards;
