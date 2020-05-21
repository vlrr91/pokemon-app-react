import React from 'react';
import Header from './components/Header';
import InfiniteScroll from './components/InfiniteScroll';

import './App.css';

function App() {
  return (
    <div>
      <Header />
      <main className="main">
        <InfiniteScroll />
      </main>
    </div>
  );
}

export default App;
