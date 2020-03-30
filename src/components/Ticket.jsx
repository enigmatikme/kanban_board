import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Container = styled.div`
  border: 1px solid lightgrey;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 2px;
  background-color: ${props => (props.isDragging ? "lightgreen" : "white")};

  display: flex;
  flex-direction: column;
  align-items: flex-start;

`;
function Ticket({title, description, assignedTo, ticketIndex, users, updateUsers, currentListIndex, lists, setLists}) {
  const [selectedUser, setValue] = useState('');
  const [showModal, toggleModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUsers(currentListIndex, selectedUser, ticketIndex)
  }

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  const change = () => {
    const newList = [...lists];
    const newColumn = newList[currentListIndex]
    newColumn.tickets.splice(ticketIndex, 1);
    newList[currentListIndex] = newColumn;

    setLists(newList);
  }

  return (
    <Draggable 
      draggableId={`${currentListIndex}-${ticketIndex}`} 
      index={ticketIndex}
    >
      {provided => (
        <Container className="Container"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
      <div className="ticket_header">{title}</div>
      <div>{description}</div>
      <div className="assigned_users_wrapper">
        { assignedTo && assignedTo.map((user, i) => {
          return <div className="assigned_user" key={i}> {user} </div>
          })
        }
      </div>
      <button onClick={() => toggleModal(!showModal)}>Add Members</button>
      <button onClick={change}>x</button>
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
    </Container>
      )}
    </Draggable>
  )
}

export default Ticket;