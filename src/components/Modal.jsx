import React, { useState } from 'react';

function Modal({ addTicket, showModal }) {
  const [ticket, setTicket] = useState({
    title: '',
    description: '',
    assignedTo: [],
  })
  // const [ticket, setTicket] = useState({
  //   title: '',
  //   description: '',
  //   assignedTo: [],
  // })

  const handleChange = (e) => {
    if (e.target.id === 'title') {
      setTicket({...ticket, 
      [e.target.id] : e.target.value
      });
    } else {
      setTicket({...ticket, 
        [e.target.id] : e.target.value
      });
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    addTicket(ticket)
    setTicket({
      title: '',
      description: '',
      assignedTo: []
    })
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