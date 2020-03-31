import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';


const Container = styled.div`
border: 1px solid lightgrey;
padding: 6px 8px 2px;
margin-bottom: 8px;
border-radius: 2px;
background-color: ${props => (props.isDragging ? "lightgreen" : "white")};

display: flex;
flex-direction: column;
align-items: flex-start;
text-align: left;

box-shadow: 0px 1px lightgrey;
`;

const RemoveTicketButton = styled.button`
  align-self: flex-end;
`;

const AssignedUsers = styled.div`
  display: flex;
`;


function Ticket({title, description, assignedTo, ticketIndex, users, updateUsers, currentListIndex, lists, setLists}) {
  const [selectedUser, setValue] = useState('');
  const [showModal, toggleModal] = useState(false);
  const [showTicket, toggleTicket] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    updateUsers(currentListIndex, selectedUser, ticketIndex)
  }

  const handleChange = (e) => {
    // e.stopPropagation();

    setValue(e.target.value)
  }

  const change = () => {
    const newList = [...lists];
    const newColumn = newList[currentListIndex]
    newColumn.tickets.splice(ticketIndex, 1);
    newList[currentListIndex] = newColumn;

    setLists(newList);
  }

  const setTicket = (e) => {
    if (e.target.nodeName === 'SELECT' || e.target.nodeName === 'BUTTON') {
      return;
    }
    toggleTicket(!showTicket);
  }

  return (
    <Draggable 
      draggableId={`${currentListIndex}-${ticketIndex}`} 
      index={ticketIndex}
    >
      {provided => (
        <Container onClick={(e) => setTicket(e)}  className="Container"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
        <div className="ticket_header">{title}</div>
        {
          showTicket? 
          <div className="tester">
          <RemoveTicketButton onClick={change}>x</RemoveTicketButton>
              <div>{description}</div>
              <AssignedUsers>
                { assignedTo && assignedTo.map((user, i) => {
                  return <div className="assigned_user" key={i}> {user} </div>
                  })
                }
              </AssignedUsers>
              <button onClick={(e) => {e.stopPropagation(); toggleModal(!showModal)}}>Add Members</button>
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
        </div> : null }
    </Container>
      )}
    
    </Draggable>
  )
}

export default Ticket;