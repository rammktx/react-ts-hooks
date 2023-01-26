import * as React from 'react';
import { useState, useEffect } from 'react';
import './style.css';

export default function App() {
  const [count, setCount] = useState(0);
  const [inputText, setInputText] = useState('');
  const [historyList, setHistoryList] = useState([]);
  const [users, setUsers] = useState([]);

  console.log('Text Array: ', inputText);

 

  async function getUsers() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users/');
    const users = await response.json();
    setUsers(users);
  }

  useEffect(() => {
    console.log('useEffect called');
    getUsers();
  }, [count>2]);

  return (
    <div>
      <h1>Let's Count!</h1>
      <button onClick={() => setCount(count + 1)}>+ 1</button>
      <button onClick={() => setCount(count - 1)}>- 1</button>
      <br />
      <h4>{count}</h4>

      <input
        type="text"
        placeholder="Enter some text."
        onChange={(evt) => {
          setInputText(evt.target.value);
          setHistoryList([...historyList, evt.target.value]);
        }}
      />

      {users.map((user, index) => (
        <p key={index}>{user.username}</p>
      ))}

      <ul>
        {historyList.map((record, index) => (
          <div key={index}>
            {index}: {record}
          </div>
        ))}
      </ul>
    </div>
  );
}
