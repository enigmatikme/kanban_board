import React, { useState } from 'react';
import users from './user';

function Ticket({title, description, assignedTo}) {
  const [value, setValue] = useState('');
  const [showModal, toggleModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submitted')

  }

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  return (
    <div className="ticket">
      <div className="list_header">{title}</div>
      <div>{description}</div>
      <button onClick={() => toggleModal(!showModal)}>Add Members</button>
      { 
        showModal ? 
        <form onSubmit={handleSubmit}>
          <label>
            Pick your favorite flavor:
            <select value={value} onChange={handleChange}>
              { users.map(user => {
                  return (
                    <option value={user.id}>{user.name}</option>
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