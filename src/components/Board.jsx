import React, { useState } from 'react';

function Board () {
  const [users, setUsers] = useState('hello world');

  return (
    <div>
      {users}
    </div>
  )
}

export default Board;