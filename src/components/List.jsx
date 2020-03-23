import React, { useState } from 'react';
import Ticket from './Ticket';
import Modal from './Modal';
import users from './user';

function List({listName}) {
  const [tickets, setTickets] = useState([{   
    title: 'test1',
    description: 'description test 1',
    assignedTo: ['karin'],
  }]);
  const [showModal, toggleModal] = useState(false);
  
  const addTicket = (ticket) => {
    setTickets([...tickets, ticket])
    console.log("TICKETS", tickets)
    toggleModal(!showModal);
  }

  const addUser = (userIndex, ticketIndex) => {
    let userValue = users[userIndex].name;
    let assignedUsers = tickets[ticketIndex].assignedTo;

    if (!assignedUsers.includes(userValue)) {
      assignedUsers.push(userValue);
      console.log("added user", assignedUsers);
    } else {
      console.log("you've already added this user")
    }
    console.log("users", assignedUsers)
  }

  const onDragStart = (e, index) => {
    e.preventDefault();
    console.log("dragged index", index);
    e.dataTransfer.setData("text/plain",index)

  }

  const onDrop = (e, index) => {
    let id = e.dataTransfer.getData("index");  
  //   let tasks = this.state.tasks.filter((task) => {
  //     if (task.name == id) {               
  //       task.category = cat;
  //     }                     
  //     return task;          
  //   });           
  //   this.setState({                 
  //     ...this.state,                 
  //     tasks          
  //   });    
  // }
  console.log("id",id)
  console.log("index", index);
  console.log("DROPPE")

  }

  const onDragOver = (e) => {
    e.preventDefault();
    console.log("DRAG OVER")
  }

  return (
    <div className="list_wrapper">
      <div> {listName} </div> 
      <div>
      {tickets.map((ticket, i) => {
        return <Ticket onDragStart={onDragStart} onDrop={onDrop} onDragOver={onDragOver} {...ticket} addUser={addUser} key={i} index={i} users={users}/>
      })}
      <Modal showModal={showModal} addTicket={addTicket}  />
      <button class="add_tix_btn" type="submit" onClick={() => toggleModal(!showModal)}>Add Ticket</button>
      </div>
    </div>
  )
}

export default List;