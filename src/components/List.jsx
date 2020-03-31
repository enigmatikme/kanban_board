import React, { useState } from 'react';
import Ticket from './Ticket';
import Modal from './Modal';
import users from './user';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const AddTixBtn = styled.button`
  // border: none;
  // background: none;
  // padding: 13px;
  // font-size: 15px;

  border: none;
  background: none;
  font-size: 15px;

  border-radius: 3px;
  color: #5e6c84;
  display: block;
  flex: 1 0 auto;
  margin: 2px 8px 8px 8px;
  padding: 4px 8px;
  position: relative;
  text-decoration: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 220px;
  background: #ebecf0;

  // created a flex box where children are aligned vertically 
  display: flex;
  flex-direction: column;

  &:hover ${AddTixBtn} {
    background-color: rgba(9,30,66,.08);
    color: #091e42;

    // box-shadow: inset 5em 1em #42526e;
    // box-shadow: inset 5em 1em gold;
    // box-shadow: 5px 5px black;
  }
`;

const Title = styled.h3`
  padding: 8px;
`;

const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? "skyblue" : "#ebecf0")};

  flex-grow: 1;
`;

const ListButton = styled.button`
  width: 80px;
  align-self: flex-end;
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
      <ListButton onClick={deleteList}>Close list</ListButton>
      <Title> {list.listName} </Title> 
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
      <AddTixBtn class="add_tix_btn" type="submit" onClick={() => toggleModal(!showModal)}>Add another card</AddTixBtn>
  </Container>
  )
}

export default List;