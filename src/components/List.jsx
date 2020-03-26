import React, { useState } from 'react';
import Ticket from './Ticket';
import Modal from './Modal';
import users from './user';

function List({listName, currentListIndex, lists, setLists}) {
  const [tickets, setTickets] = useState([
    {   
      title: 'test1',
      description: 'description test 1',
      assignedTo: ['karin'],
    },
    {   
      title: 'test4',
      description: 'description test 1',
      assignedTo: ['karin'],
    },
  ]);
  const [showModal, toggleModal] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);
  
  const addTicket = (ticket) => {
    setTickets([...tickets, ticket])
    toggleModal(!showModal);
  }

  const addUser = (userIndex, ticketIndex) => {
    let userValue = users[userIndex].name;
    let assignedUsers = tickets[ticketIndex].assignedTo;

    if (!assignedUsers.includes(userValue)) {
      let newArr = [...tickets];
      newArr[ticketIndex].assignedTo.push(userValue);
      setTickets(newArr);
    } else {
      console.log("you've already added this user")
    }
  }

  const handleDragStart = (e, index) => {
    // console.log("dragged index", index);
    // e.dataTransfer.setData("text/plain",index)

    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.parentElement);
    e.dataTransfer.setData("text", e.target.id);
    console.log("EVENT TARGET ID", e.target.id)
    console.log("currentLISt INDEx, DRAGGED", e.target.parentNode.id)
    e.dataTransfer.setDragImage(e.target.parentElement, 20, 20);

    // console.log("DATA TRANSFERED ELEMENTS", e.target)
    
    setDraggedItem(tickets[index]);
    console.log("DRAGGED ITEM", draggedItem)

  }

  const sortTickets = (e, targetIndex, i) => {
    e.preventDefault();
    if (draggedItem === tickets[i]) return null;
    
      // const newOrder = tickets.filter(ticket => ticket !== draggedItem)
      let newOrder = tickets.filter(ticket => ticket !== draggedItem)
      newOrder.splice(i, 0, draggedItem);
      
      setTickets(newOrder);

    
  }

  const findTargetIndex = async (e) => {
    let targI = await e.target.parentNode.parentNode.id
    return targI;
  }
  
  const handleDragOver = (e, ticketIndex) => {
    e.preventDefault();
    // console.log("DROPPED IT IN COLUMN", e.target.parentNode.parentNode.id)
    
    // e.dataTransfer.dropEffect = "move";
    // let targetIndex = e.target.parentNode.parentNode.id;
    let targetIndex;
    // findTargetIndex(e).then(targI => targetIndex = targI);
    // let targetIndex = findTargetIndex(e);

    // let tempData = e.dataTransfer.getData("text/html");
    // console.log("GOTTEN DATA", JSON.stringify(tempData));
    
    // console.log("LIST NUMBER", currentListIndex)
    // let newList = [...lists];
    // console.log("++++New list", newList[currentListIndex].tickets)
    
    sortTickets(e, targetIndex, ticketIndex)
    // newList[currentListIndex].tickets = tickets;
    // setLists(newList)
  }

  const handleDrop = (e) => {
    let tempData = e.dataTransfer.getData("text/html");
    // e.target.appendChild(document.getElementById(tempData));
    console.log("DROPPED IT IN COLUMN", e.target.parentNode.parentNode.id)
    let targetListIndex = e.target.parentNode.parentNode.id
    // sortTickets(e, targetListIndex, ticketIndex)


  }


  return (
    <div className="list_wrapper droppable" onDrop={handleDrop}>
      <div> {listName} </div> 
      <div id={currentListIndex}>
      {
        tickets.map((ticket, i) => {
          return (
          <div className="ticket-wrapper">
            <Ticket handleDragStart={handleDragStart} handleDragOver={handleDragOver} {...ticket} addUser={addUser} key={i} index={i} users={users}/>
          </div>)
        })
      }
      </div>
      <Modal showModal={showModal} addTicket={addTicket}  />
      <button class="add_tix_btn" type="submit" onClick={() => toggleModal(!showModal)}>Add Ticket</button>
    </div>
  )
}

export default List;