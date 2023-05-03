import { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

function Home() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <main>
        <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      </main>
    </>
  );
}

export default Home;
