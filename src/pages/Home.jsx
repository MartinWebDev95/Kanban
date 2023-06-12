import { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import SectionTasks from '../components/SectionTasks';
import useDatabaseContext from '../hooks/useDatabaseContext';
import NoItems from '../components/NoItems';

function Home() {
  const [showSidebar, setShowSidebar] = useState(false);
  const { selectedBoard } = useDatabaseContext();

  return (
    <>
      <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

      <main className="flex items-start h-full">
        <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

        {selectedBoard ? <SectionTasks /> : <NoItems />}
      </main>
    </>
  );
}

export default Home;
