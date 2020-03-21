import React, { useState } from 'react';
import Ticket from './Ticket';
import Modal from './Modal';

function List({listName}) {
  const [tickets, setTickets] = useState([]);
  const [showModal, toggleModal] = useState(false);
  
  const addTicket = (ticket) => {
    setTickets([...tickets, ticket])
    console.log("tickets");
    toggleModal(!showModal);
  }
  return (
    <div className="list_container">
      <div>List Title</div>
      {tickets.map((ticket, i) => {
        return <Ticket {...ticket} key={i} i={i}/>
      })}
      <button class="add_tix_btn" onClick={() => toggleModal(!showModal)}>Add Ticket</button>
      <Modal showModal={showModal} addTicket={addTicket} />
    </div>
  )
}

export default List;