import React, { useState } from 'react';
import Ticket from './Ticket';
import Modal from './Modal';
import users from './user';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';


const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 220px;
  background: lightgrey;

  // created a flex box where children are aligned vertically 
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  padding: 8px;
`;

const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? "skyblue" : "lightgrey")};

  flex-grow: 1;
  min-height: 100px;
`;

function List({currentListIndex, list, addTicket, updateUsers, deleteTicket, lists, setLists}) {
  const [showModal, toggleModal] = useState(false);

  const deleteList = () => {
    const newList = [...lists];
    newList.splice(currentListIndex, 1);
    setLists(newList);
  }

  return (
    <Container>
      <Title> {list.listName} </Title> 
      <button onClick={deleteList}>x</button>
      <Droppable droppableId={`${currentListIndex}`}>
        {(provided, snapshot) => (
          <TaskList 
          className="list" 
          ref={provided.innerRef} 
          {...provided.droppableProps}
          isDraggingOver={snapshot.isDraggingOver}
          >
          {
            list.tickets.map((ticket, i) => {
              return (
                <Ticket {...ticket} key={i} ticketIndex={i} users={users} updateUsers={updateUsers} currentListIndex={currentListIndex} deleteTicket={deleteTicket} lists={lists} setLists={setLists}/>
                )
              })
            }
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
      <Modal showModal={showModal} addTicket={addTicket} currentListIndex={currentListIndex} toggleModal={toggleModal} />
      <button class="add_tix_btn" type="submit" onClick={() => toggleModal(!showModal)}>Add Ticket</button>
  </Container>
  )
}

export default List;