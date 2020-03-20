import React, { useState } from 'react';
import './App.css';
import Board from './components/Board';
import List from './components/List';

function App() {
  const [lists, setLists] = useState([]);
  const handleClick = () => {
    setLists([...lists, "lol"])
    console.log(lists);
  }

  return (
    <div className="App">
    <Board />
    <button class="create_list_btn" onClick={handleClick}>Add List</button>
    <div className="board_lists">

      { 
        lists.map((list, i) => {
          return <List key={i}/>
        })
      }
    </div>
    </div>
  );
}

export default App;
