import { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import SectionTasks from '../components/SectionTasks';

function Home() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

      <main className="flex justify-between pt-16">
        <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

        <SectionTasks />
      </main>
    </>
  );
}

export default Home;
