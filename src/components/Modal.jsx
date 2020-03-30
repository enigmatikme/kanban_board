import React, { useState } from 'react';

function Modal({ addTicket, showModal, currentListIndex, toggleModal }) {
  const [ticket, setTicket] = useState({
    title: '',
    description: '',
    assignedTo: [],
  })

  const handleChange = (e) => {
    setTicket({...ticket, 
      [e.target.id] : e.target.value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    addTicket(ticket, currentListIndex);
    toggleModal(!showModal);
  }

  if (!showModal) {
    return null;
  }
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" onChange={handleChange} id="title" placeholder="Ticket Name"/>
      <input type="text" onChange={handleChange} id="description" placeholder="Ticket Description"/>
      <button type="submit" style={{display:"none"}}>Submit</button>
    </form>
  )
}

export default Modal;