import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
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

  const {
    register, handleSubmit, formState: { errors }, reset, control, setValue, setFocus,
  } = useForm({
    defaultValues: {
      nameBoard: '',
    },
  });

  // If it is in update mode, the form field is filled with the name of the selected board
  useEffect(() => {
    if (updating && openBoardModal) {
      setValue('nameBoard', selectedBoard.name);
    }

    setFocus('nameBoard');
  }, [openBoardModal]);

  const addOrUpdateBoards = useCallback(async ({ newBoardName }) => {
    if (!updating) {
      // Add new board to the database
      const newBoard = await addBoard({ boardName: newBoardName, idUser: currentUser.id });

      // Select the new board added
      setSelectedBoard(newBoard[0]);

      // Update the board state with the new board
      setBoards((prevState) => prevState.concat(newBoard[0]));

      // Return the id of the new board just added
      return newBoard[0].id;
    }

    if (selectedBoard?.name !== newBoardName) {
      // Update the board name in the database
      await updateBoardName({ idBoard: selectedBoard?.id, newBoardName });

      const newBoardsState = boards.map((item) => {
        if (item.id === selectedBoard.id) {
          const newName = { ...item, name: newBoardName };

          // Select the board just updated
          setSelectedBoard(newName);

          return newName;
        }

        return item;
      });

      // Update the board name in the boards state
      setBoards(newBoardsState);
    }

    return null;
  }, [currentUser, selectedBoard]);

  const handleDeleteBoard = async () => {
    // Delete board in database
    await deleteBoard(selectedBoard);

    // Update the boards state without the board just deleted
    const remainingBoards = boards.filter((board) => board.id !== selectedBoard.id);

    setBoards(remainingBoards);

    /* If there are boards remaining, change the selected board to the first
     in the list of boards, in case there are no boards remaining, reset
     the selected board state to null and remove the task status of the
     board just deleted */
    if (remainingBoards.length > 0) {
      setSelectedBoard(boards[0]);
    } else {
      setSelectedBoard(null);
      setTaskStatus([]);
    }
  };

  return {
    addOrUpdateBoards,
    register,
    handleSubmit,
    errors,
    reset,
    control,
    handleDeleteBoard,
  };
}

export default useBoards;
