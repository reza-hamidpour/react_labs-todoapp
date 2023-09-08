import React from "react";
import "./App.css";

const App = () => {
  const [todos, setTodos] = React.useState([]);
  const [todo, setTodo] = React.useState("");
  const [showCompleted, setShowCompleted] = React.useState(false);
  const [todoEditing, setTodoEditing] = React.useState(null)
  const [editingText, setEditingText] = React.useState("")


  const toggleShowCompletedTasks = () => {
    setShowCompleted( !showCompleted )
  }

  React.useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);
  React.useEffect(() => {
    if([todos].length > 0) {
        const json = JSON.stringify(todos);
        localStorage.setItem("todos", json);
    }
  }, [todos]);

  // Add the handlesubmit code here
  const handleSubmit = (e) => {
      e.preventDefault();
      const newTodo = {
          id: new Date().getTime(),
          text: todo.trim(),
          completed: false,
      }

      if (newTodo.text.length > 0) {
          setTodos([...todos].concat(newTodo))
          setTodo("")
      }else {
          alert("Enter Valid Task Name");
          setTodo("");
      }
      
  }
  
  // Add the deleteToDo code here
  const deleteToDo = (id) => {

    let updatedTodos = [...todos].filter((todo) => todo.id !== id)
    setTodos(updatedTodos)

  }
  
  // Add the toggleComplete code here
  const toggleComplete = (id) => {

    let updatedTodos = [...todos].map((todo) =>{
        if (todo.id === id ) { 
             todo.completed = !todo.completed;
        }
        return todo;
     })

    setTodos(updatedTodos)


  }

  
  // Add the submitEdits code here
  const submitEdits = (id, newText) => {
      const updatedTodos = [...todos].map((todo) => {
          if (todo.id === id )
            todo.text = editingText
          return todo
      })
      setTodos(updatedTodos)
      setTodoEditing(null)

  }
  
return(
<div className ="App">
    <h1>Todo List</h1>
    <form onSubmit={handleSubmit}>
        <lable for="show_completed_tasks">Show completed Tasks</lable>
        <input type="checkbox"
                id="show_completed_tasks"
                onChange={toggleShowCompletedTasks}
                value={showCompleted}
        />
        <input
             type="text"
             onChange={(e) => setTodo(e.target.value)}
             value={todo}/>
        <button type="submit">Add Todo</button>
    </form>
    {todos.map((todo)=> {
        
        if (showCompleted === false && todo.completed === true )
            return true
        return <div className="todo " key={todo.id}>
        <div>
            <input 
                type="checkbox"
                onChange={() => toggleComplete(todo.id)}
                checked={todo.completed}
                />
            {todo.id === todoEditing ? (
                  <input
                    type="text"
                    onChange={(e) => setEditingText(e.target.value)}
                  />
                ) : (
                  <div>{todo.text}</div>
                )}
              </div>
              <div className="todo-actions">
                {todo.id === todoEditing ? (
                  <button onClick={() => submitEdits(todo.id)}>Submit Edits</button>
                ) : (
                  <button onClick={() => setTodoEditing(todo.id)}>Edit</button>
                )}
            <div>
            <button onClick={() => deleteToDo(todo.id)}>Delete</button>
            </div>
        </div>
    </div>

    })}
</div>
);
};
export default App;
