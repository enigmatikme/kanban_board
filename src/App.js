import React, { useState } from 'react';
import './App.css';
// import Board from './components/Board';
import List from './components/List';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';
import users from './components/user';

const Container = styled.div`
  display: flex;
`;

function App() {
  const [lists, setLists] = useState([
    {
      listName: 'testing 1', 
      tickets: [{   
        title: 'test1',
        description: 'This is the description box. please write a description here, testing for length and wrap around ',
        assignedTo: ['karin'],
      },
      {   
        title: 'test4',
        description: 'This is the description box. please write a description here, testing for length and wrap around ',
        assignedTo: ['karin'],
      },]
    }, 
    {
      listName: "testing 2", 
      tickets: [{   
        title: 'test1',
        description: 'This is the description box. please write a description here, testing for length and wrap around ',
        assignedTo: ['karin'],
      },
      {   
        title: 'test4',
        description: 'This is the description box. please write a description here, testing for length and wrap around ',
        assignedTo: ['karin'],
      },]
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
      tickets: []
    }])

    setListTitle('');
  }

  const onDragStart = () => {
    document.body.style.color = 'orange';
    document.body.style.transition = 'background-color 0.2s ease';
  }

  const onDragUpdate = update => {
    const { destination } = update;
    // console.log("UPDATE", update);
    const opacity = destination ? destination.index / 2 : 0;
    // const opacity = destination ? destination.index / Object.keys(this.state.tasks).length : 0;
    document.body.style.backgroundColor = `rgb(153, 141, 217, ${opacity})`
  }

  const onDragEnd = result => {
    //* responsible to synchronously update state to reflect drag and drop result
    //TODO: reorder column
    document.body.style.color = 'inherit';
    document.body.style.backgroundColor = 'inherit';

    const { source, destination } = result;
    if(!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;

    //start finish refer to column ids
    const start = lists[source.droppableId];
    const finish = lists[destination.droppableId];
    const startTickets = Array.from(start.tickets);
    const finishTickets = Array.from(finish.tickets);
    const draggedTicket = start.tickets[source.index];
    const newList = [...lists];
    
    if (start === finish) {
      startTickets.splice(source.index, 1);
      startTickets.splice(destination.index, 0, draggedTicket);
      const newColumn = {
        ...start, 
        tickets: startTickets
      }

      newList[source.droppableId] = newColumn;
      setLists(newList);
    } else {
      //droppableid = stringed column index
      //index = Num ticket index
      startTickets.splice(source.index, 1);
      finishTickets.splice(destination.index, 0, draggedTicket);

      newList[source.droppableId].tickets = startTickets;
      newList[destination.droppableId].tickets = finishTickets;

      setLists(newList);
    }
  }

  const addTicket = (ticket, columnId) => {
    const newTaskList = [...lists];
    newTaskList[columnId].tickets.push(ticket)
    setLists(newTaskList)
  }

  const updateUsers = (currentListIndex, selectedUser, ticketIndex) => {
    const newList = [...lists];
    const newColumn = lists[currentListIndex];
    const assignedUsers = newColumn.tickets[ticketIndex].assignedTo;
    const userValue = users[selectedUser].name;
    
    if (!assignedUsers.includes(userValue)) {
      assignedUsers.push(users[selectedUser].name)
      newList[currentListIndex] = newColumn;
      setLists(newList);
    } else {
      new Error("This user is already assigned to this ticket :)")
      console.log("users already listed")
    }
  }

  const deleteTicket = () => {
    console.log("deleted");
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
      <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart} onDragUpdate={onDragUpdate}>
          <Container>
        { 
          lists.map((list, i) => {
            return <List setLists={setLists} key={i} currentListIndex={i} list={list} addTicket={addTicket} updateUsers={updateUsers} deleteTicket={deleteTicket} lists={lists}/>
          })
        }
        </Container>
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;
