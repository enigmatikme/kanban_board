import React, { useState } from 'react';

function Ticket({title, description}) {
  return (
    <div className="ticket">
      <div>{title}</div>
      <div>{description}</div>
    </div>
  )
}

export default Ticket;