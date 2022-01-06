import React from "react";

const Administrator = () => {
  const [todos, setTodos] = React.useState([]);

  React.useEffect(() => {
    fetch("http://localhost:5000/todos")
    .then((res) => res.json())
    .then((data) => setTodos(data));
  }, [todos])

  return (
    <div>
      {todos.map((todos) => (
        <li key={todos._id} style={{listStyle:'none' }}>{todos.title}</li>
      ))}
    </div>
  );
};

export default Administrator;
