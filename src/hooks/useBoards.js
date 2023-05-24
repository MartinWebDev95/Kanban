import { useCallback, useEffect, useState } from 'react';
import useAuthContext from './useAuthContext';
import useDatabaseContext from './useDatabaseContext';
import addBoard from '../services/addBoard';
import updateBoardName from '../services/updateBoardName';
import deleteBoard from '../services/deleteBoard';

function useBoards({ openBoardModal, updating } = {}) {
  const { currentUser } = useAuthContext();
  const {
    selectedBoard, setSelectedBoard, boards, setBoards, setTaskStatus,
  } = useDatabaseContext();
  const [nameBoard, setNameBoard] = useState('');

  // Write the board name in the input value if it is in update mode
  useEffect(() => {
    if (updating) {
      setNameBoard(selectedBoard && selectedBoard.name);
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

  const handleDeleteBoard = async () => {
    // Delete board in database
    await deleteBoard(selectedBoard);

    // Update the boards state without the board just deleted
    const remainingBoards = boards.filter((board) => board.id !== selectedBoard.id);

    setBoards(remainingBoards);

    // If there are boards remaining, change the selected board to the first
    // in the list of boards, in case there are no boards remaining, reset
    // the selected board state to null and remove the task status of the
    // board just deleted
    if (remainingBoards.length > 0) {
      setSelectedBoard(boards[0]);
    } else {
      setSelectedBoard(null);
      setTaskStatus([]);
    }
  };

  return {
    addOrUpdateBoards, nameBoard, setNameBoard, selectedBoard, handleDeleteBoard,
  };
}

export default useBoards;
