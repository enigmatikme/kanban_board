import React, { useState } from 'react';
import Ticket from './Ticket';
import Modal from './Modal';

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
  return (
    <div className="list_wrapper">
      <div> {listName} </div> 
      <div>
      {tickets.map((ticket, i) => {
        return <Ticket {...ticket} key={i} i={i}/>
      })}
      <Modal showModal={showModal} addTicket={addTicket} />
      <button class="add_tix_btn" type="submit" onClick={() => toggleModal(!showModal)}>Add Ticket</button>
        
      </div>
    </div>
  )
}

export default List;