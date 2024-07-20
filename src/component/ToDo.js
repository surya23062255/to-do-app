import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";

function ToDo() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  // For reload all todos from local storage
  useEffect(() => {
    let storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  // For Save the todos to local storage
  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const valueOnChange = (e) => {
    setTodo(e.target.value);
  };

  // Add Button Handler
  const addClick = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLS();
  };

  // This function is called when a checkbox clicked
  const checkboxOnChange = (e) => {
    // Get the ID of the todo item from the checkbox
    let id = e.target.name;

    // Find the index of the todo item in the todos array that matches the ID
    let index = todos.findIndex((item) => {
      return item.id === id;
    });

    // Create a new copy of the todos array
    let newTodos = [...todos];

    // Toggle the isCompleted property of the todo item at the found index
    newTodos[index].isCompleted = !newTodos[index].isCompleted;

    // Update the state with the new todos array
    setTodos(newTodos);

    // Save the updated todos to local storage
    saveToLS();
  };

  // Delete Button Handler
  const deleteClick = (id) => {
    const newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
    saveToLS();
  };

  // Edit Button Handler
  const editClick = (id) => {
    let existingTodo = todos.find((e) => e.id === id);
    setTodo(existingTodo.todo);
    const newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
    saveToLS();
  };

  return (
    <>
      <div className="md:container md:mx-auto my-5 md:w-2/3 rounded-xl p-5 bg-slate-200 min-h-[80vh]">
        <h1 className="text-center font-bold text-2xl">Manage your Here</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h1 className="text-xl font-bold">Add Todo</h1>
          <div className="flex">
            <input
              onChange={valueOnChange}
              value={todo}
              className="w-full px-4 rounded-full"
              placeholder="Please Enter Your Task Here"
              type="text"
            />
            <button
              onClick={addClick}
              disabled={todo.length <= 2}
              className="bg-green-500 w-32 px-1 py-2 hover:bg-green-600 disabled:bg-green-400 mx-4 text-white rounded-full"
            >
              Save Todo
            </button>
          </div>
        </div>

        <div className="h-[2px] bg-black opacity-15 w-[90%] mx-auto my-5"></div>

        <h2 className="text-lg font-bold">Your ToDos</h2>

        {/* Show All todo's here */}
        <div className="todos">
          {todos.length === 0 && <div className="m-5">No Todos to display</div>}
          {todos.map((e) => {
            return (
              <div
                key={e.id}
                className="todo flex md:w-1/2 my-3 justify-between"
              >
                <div className="flex gap-5">
                  <input
                    type="checkbox"
                    onChange={checkboxOnChange}
                    checked={e.isCompleted}
                    name={e.id}
                    id=""
                  />

                  <div className={e.isCompleted ? "line-through" : ""}>
                    {e.todo}
                  </div>
                </div>

                <div className="buttons flex h-full">
                  <button
                    onClick={() => editClick(e.id)}
                    className="bg-yellow-500 hover:bg-yellow-600 p-3 py-1 text-white rounded-md mx-2"
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() => deleteClick(e.id)}
                    className="bg-red-500 hover:bg-red-600 p-3 py-1 text-white rounded-md mx-2"
                  >
                    <MdDeleteForever />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default ToDo;
