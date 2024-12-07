import React ,{ useState } from 'react'

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [value, setValue] = useState('');
  const [todolist,setTodolist] = useState([]);
  const [filterMode, setFilterMode] = useState("all");
  const [uncompletedCount, setUncompletedCount] = useState(0);
  const [currentMode, setCurrentMode]=useState("all");
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [hasInput, setHasInput] = useState(false);

  const checkAllStatus=()=>{
    const allStatus = todolist.every(item=>item.status);
    setIsAllChecked(allStatus);
  }

  const handleAll=()=>{
    setIsAllChecked((prevIsAllChecked) =>!prevIsAllChecked);
    const updatedTodos=todolist.map(item=>({
      ...item,status:isAllChecked
    }));
    setTodolist(updatedTodos);
    calculateUncompleteCount();
  }
  const handleInputChange = (e) => {
    if (e.target.value.length > 0) {
        setHasInput(true);
    } else {
        setHasInput(false);
    }
  };
  const calculateUncompleteCount =()=>{
    const count=todolist.filter((item)=>!item.status).length;
    setUncompletedCount(count)
  }
  React.useEffect(()=>{
    calculateUncompleteCount();
    checkAllStatus();
  },[todolist]);

  const handleClearCompleted = ()=>{
    const updatedTodos= todolist.filter((item)=>!item.status);
    setTodolist(updatedTodos);
    setUncompletedCount(updatedTodos.length);

  }

  const handleKeyDown=(e)=>{
    if (e.key ==="Enter"){
      const newTodo ={value:value, status:false};
      const newTodolist = [...todolist,newTodo];
      setTodolist(newTodolist);
    }
  }
  const handleFilterChange = (mode)=>{
    setFilterMode(mode);
  };
  const filterTodos = () =>{
    if (filterMode === "completed"){
      return todolist.filter((item) => item.status);
    }else if (filterMode === "active"){
      return todolist.filter((item)=>!item.status);
    }
    return todolist;
  };
  
  
  return (
    <div className='container'>
    <div>
      <h1>todos</h1>
      <div className='header' style={{ border: hasInput? '1px solid black' : 'header' ,display:'flex'}}>
      <button className='allChange' onClick={()=>handleAll}>▽</button>
      <input 
        type='text' 
        placeholder='What needs to be done?' 
        className='inputBox'
        onChange={(e) => {setValue(e.target.value)}}
        onKeyDown={handleKeyDown} />
      
      </div>
      
    </div>
    <ul>
      {filterTodos().map((item,index) => 
      <li key={index}>
        <span className='finish'>
          <input 
            type='checkbox' 
            checked={item.status}
            className='finishBox'
            onChange={(e) => {
              const updatedTodos = todolist.map((todo) => {
                  if (todo === item) {
                      return {
                        ...todo,
                          status: e.target.checked,
                      };
                  }
                  return todo;
              });
              setTodolist(updatedTodos);
              checkAllStatus();
              calculateUncompleteCount();
            }}
        ></input>
        </span>
        <span style={{textDecoration:item.status?'line-through':null}}>{item.value}</span>
        <div>
          <button className='delete'
          onClick={()=>{
          const newTodolist=[...todolist.slice(0,index),...todolist.slice(index+1)]
          setTodolist(newTodolist);
          checkAllStatus();
          calculateUncompleteCount();
        }}>
          ☓
          </button>
          </div>
      </li>)
      }
    </ul>
    <div className='functions'>
      <span className='count'>{uncompletedCount} item left!</span>
       
      <span className='mode'>
        <button 
          className={filterMode==="all"?"currentMode":"modeBtn"} 
          onClick={()=>handleFilterChange("all")}
        >
           All</button>
        <button className={filterMode==="active"?"currentMode":"modeBtn"} onClick={()=>handleFilterChange("active")}>Active</button>
        <button className={filterMode==="completed"?"currentMode":"modeBtn"} onClick={()=>handleFilterChange("completed")}>Completed</button>
      </span>
      <span className='clear'>
        <button className='clearBtn' onClick={handleClearCompleted}>Clear completed</button>
      </span>
      
    </div>
    <div className='footOne'></div>
    <div className='footTwo'></div>
    </div>
  )
};



export default App
