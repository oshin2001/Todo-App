import React, { useEffect, useState }  from 'react'
import Create from './Create';
import axios from 'axios';
import './App.css'

const Home=()=>{
  const [todos, setTodos]=useState([]);

  useEffect(()=>{
    axios.get('http://localhost:3000/get')
    .then(result=> setTodos(result.data))
    .catch(err=>console.log(err))
  },[])

  const handleEdit = (id, currentDone) => {
  axios.put(`http://localhost:3000/update/${id}`)
    .then(result => {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === id ? { ...todo, done: !currentDone } : todo
        )
      );
    })
    .catch(err => console.log(err));
};
  const handleRemove = (id)=>{
    axios.delete('http://localhost:3000/delete/'+id)
    .then(result=>{
      location.reload();
    })
    .catch(err=>console.log(err));
  }
  return (
    <div className="home">
        <h1>Todo List</h1>
        <Create/>
        {
          todos.length===0
          ?
          <div>
            <h2>No Record</h2>
          </div>
          :
          todos.map(todo=>(
            <div className="list-item">
              <input className='checkBox' type="checkbox" name="listCheck" id="listCheck" 
              onClick={()=>handleEdit(todo._id, todo.done)}
              checked={todo.done}
              />
              <p className={todo.done?'strikeThrough':''}>{todo.task}</p>
              <button type="button" className="remove" onClick={()=>handleRemove(todo._id)}>Remove</button>
            </div>
          ))
        }
    </div>
  )
}

export default Home