import React, { useState } from 'react';
import './App.css';
import Board from './components/Board';
import List from './components/List';

function App() {
  const [lists, setLists] = useState([]);
  const [showModal, toggleModal] = useState(false);

  const handleClick = () => {
    setLists([...lists, "lol"])
    console.log(lists);
  }

  const handleChange = (e) => {
    let title = '';
    title += e.target.value;

  }

  const addList = () => {
    setLists([...lists, {
      listName: '',
      tasks: []
    }])
  }

  return (
    <div className="App">
    <button class="create_list_btn" onClick={() => toggleModal(!showModal)}>Add List</button>
    {/* <button class="create_list_btn" onClick={handleClick}>Add List</button> */}
    { 
      showModal ? 
      <div>
        <input type="text" onChange={handleChange} id="title"/> 
        <button onClick={handleClick}>Submit</button>
      </div> : null 
    }

    <Board />
    <div className="board_lists">

      { 
        lists.map((list, i) => {
          return <List key={i} listName={list[i]}/>
        })
      }
    </div>
    </div>
  );
}

export default App;
