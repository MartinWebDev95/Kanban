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

      // Select the new board added
      setSelectedBoard(newBoard[0]);

      // Update the board state with the new board
      setBoards((prevState) => prevState.concat(newBoard[0]));

      // Return the id of the new board just added
      return newBoard[0].id;
    }

    if (selectedBoard.name !== nameBoard) {
      // Update the board name in the database
      await updateBoardName({ idBoard: selectedBoard.id, newBoardName: nameBoard });

      const newBoardsState = boards.map((item) => {
        if (item.id === selectedBoard.id) {
          const newBoardName = { ...item, name: nameBoard };

          // Select the board just updated
          setSelectedBoard(newBoardName);

          return newBoardName;
        }

        return item;
      });

      // Update the board name in the boards state
      setBoards(newBoardsState);
    }

    return null;
  }, [currentUser, nameBoard]);

  return {
    addOrUpdateBoards, nameBoard, setNameBoard, selectedBoard,
  };
}

export default useBoards;
