import React, { useState } from 'react';

function Modal({ addTicket, showModal }) {
  const [ticket, setTicket] = useState({
    title: '',
    description: '',
  })

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
    // console.log(JSON.stringify(ticket));
    e.preventDefault();
    addTicket(ticket)
    setTicket({
      title: '',
      description: ''
    })
  }

  if (!showModal) {
    return null;
  }
  return (
    <div>
      <input type="text" onChange={handleChange} id="title"/>
      <input type="text" onChange={handleChange} id="description"/>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default Modal;