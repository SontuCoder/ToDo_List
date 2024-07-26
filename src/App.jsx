import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true);

  const toggleFinished = (e) => {
    setshowFinished(!showFinished);
  }

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  const taskEdit = (e, id) => {
    let index = todos.findIndex(item => {
      return item.id == id;
    });
    let task = [...todos];
    setTodo(task[index].todo);
    let newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    saveToLS();
  }

  const taskDelete = (e, id) => {
    let index = todos.findIndex(item => {
      return item.id == id;
    })
    let newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    saveToLS();
  }

  const taskAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    console.log("Add");
    saveToLS();
  }

  const changeTask = (e) => {
    setTodo(e.target.value);
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id == id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();
  }

  return (
    <>
      <body className="bg-gradient-to-bl from-blue-900 via-purple-800 to-pink-900 h-screen ">
        <div
          className="container flex flex-col  w-96 absolute
      left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center">
          <p className="text-4xl font-bold text-sky-400 mb-5 glow">TODO LIST APP</p>
          <div className="flex  flex-col  backdrop-blur-sm bg-white/10  px-5 py-5">
            <h1 className="text-xl font-bold text-center">Add Task</h1>

            <div className=" flex h-10 mt-1 mb-8">
              <input value={todo} onChange={changeTask} type="text" className="text-wrap rounded  pl-5 h-full w-full font-bold" placeholder="Add your task..." />
              <button onClick={taskAdd} disabled={todo.length <= 3} className=" add w-20 disabled:hover:bg-red-600 bg-sky-400 rounded font-bold hover:shadow- hover:shadow-sky-400">Add</button>
            </div>
            <div >
              <input onChange={toggleFinished} type="checkbox" className="text-l font-bold" checked={showFinished} />Show Finished Tasks
            </div>
            <h2 className="text-l font-bold mb-2">Your Tasks...</h2>
            {
              todos.length === 0 && <div className="font-bold">No Task is painding...</div>
            }
            {todos.map(item => {
              return (showFinished || !item.isCompleted) &&
                (<div className="task bg-slate-200 h-16 w-80 flex flex-row px-5 items-center justify-between rounded mb-3">
                  <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id="" />
                  <p className={"text-black text-wrap w-40 font-bold text-l"} key={item.id}><div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                  </p>
                  <div className="flex">
                    <button onClick={(e) => { taskEdit(e, item.id) }} className="h-full">
                      <img className="edit h-8" src="img\kisspng-camera-icons-icon-interface-icon-pencil-edit-butto-5d3d604da91ac1.9087379215643034376927-removebg-preview.png" alt="" />
                    </button>
                    <button onClick={(e) => { taskDelete(e, item.id) }} className="delete h-full">
                      <img className="h-8" src="img\images-removebg-preview.png" alt="" />
                    </button>
                  </div>
                </div>
                )
            }
            )}
          </div>

        </div>
      </body>
    </>
  );
}

export default App;
