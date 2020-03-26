import React, { useState } from 'react';
import './App.css';
// import Board from './components/Board';
import List from './components/List';

function App() {
  const [lists, setLists] = useState([
    {
      listName: 'testing 1', 
      tickets: []
    }, 
    {
      listName: "testing 2", 
      tickets: []
    }
  ]);
  const [showModal, toggleModal] = useState(false);
  const [listTitle, setListTitle] = useState('');

  const handleChange = (e) => {
    setListTitle(e.target.value);
  }

  const handleSubmit = (e) => {
    e.stopPropagation()

    toggleModal(!showModal)
    setLists([...lists, {
      listName: [listTitle],
      tasks: []
    }])

    setListTitle('');
  }

  return (
    <div className="App">
      <button class="create_list_btn" onClick={() => toggleModal(!showModal)}>Add Another List</button>
      { 
        showModal ? 
        <form onSubmit={handleSubmit}>
          <input type="text" onChange={handleChange} id="title" placeholder="Add List Name"/> 
        </form> : null 
      }
      <div className="board">
        
        { 
          lists.map((list, i) => {
            return <List setLists={setLists} key={i} listName={list.listName} currentListIndex={i} lists={lists} />
          })
        }
      </div>
    </div>
  );
}

export default App;
