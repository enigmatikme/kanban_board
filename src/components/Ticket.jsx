import React, { useState } from 'react';

function Ticket({title, description, assignedTo, addUser, index, users, handleDragStart, handleDragOver}) {
  const [selectedUser, setValue] = useState('');
  const [showModal, toggleModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submitted', selectedUser);
    addUser(selectedUser, index)

  }

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  return (
    <div id="chocolate" draggable onDragStart={e => handleDragStart(e, index)} onDragOver={e => handleDragOver(e, index)} className="ticket droppable">
      <div className="ticket_header">{title}</div>
      <div> {description} </div>
      <div className="assigned_users_wrapper">
        { assignedTo && assignedTo.map(user => {
          return <div className="assigned_user"> {user} </div>
        })
        }
      </div>
      <button onClick={() => toggleModal(!showModal)}>Add Members</button>
      { 
        showModal ? 
        <form onSubmit={handleSubmit}>
          <label>
            Assign Users:
            <select value={selectedUser} onChange={handleChange}>
              <option value="">Select someone</option>
              { users.map((user, i) => {
                  return (
                    <option key={i} value={i}>{user.name}</option>
                  )
                })
              }
            </select>
          </label>
        <button type="submit" value="Submit">Add User</button>
      </form> : 
        null
      }
    </div>
    
  )
}

export default Ticket;