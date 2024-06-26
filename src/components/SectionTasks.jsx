import { useEffect } from 'react';
import useDatabaseContext from '../hooks/useDatabaseContext';
import ListOfStatus from './ListOfStatus';
import Spinner from './Spinner';
import getStatus from '../services/getStatus';

function SectionTasks() {
  const {
    selectedBoard, taskStatus, setTaskStatus, loading, setLoading,
  } = useDatabaseContext();

  useEffect(() => {
    // Shows the spinner every time the board is changed
    if (!loading) setLoading(true);

    getStatus(selectedBoard)
      .then((item) => {
        setTaskStatus(item);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [selectedBoard]);

  return (
    <section className="bg-gray-100 dark:bg-slate-900 px-4 pt-4 w-full h-full scrollbar-hide overflow-y-scroll overflow-x-scroll">

      {loading
        ? (<Spinner />)
        : (<ListOfStatus taskStatus={taskStatus} />)}
    </section>
  );
}

export default SectionTasks;
