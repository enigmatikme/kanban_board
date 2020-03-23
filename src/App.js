import React, { useState } from 'react';
import './App.css';
// import Board from './components/Board';
import List from './components/List';

function App() {
  const [lists, setLists] = useState([]);
  const [showModal, toggleModal] = useState(false);
  const [listTitle, setListTitle] = useState('');

  const handleChange = (e) => {
    // e.preventDefault();
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

  const onDragOver = (e) => {
    e.preventDefault();
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
            return <List onDragOver={e => onDragOver(e)} key={i} listName={list.listName} listIndex={i}/>
          })
        }
      </div>
    </div>
  );
}

export default App;
