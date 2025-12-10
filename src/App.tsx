import {useState } from 'react'
import './App.css'
import {TaskList} from './Components/TaskList/TaskList'
import type { Task, TaskStatus } from './types';
import { TaskFilter } from './Components/TaskFilter/TaskFilter';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {

  const [filters, setFilters ]=useState<{status?: TaskStatus; priority?: 'low' | 'medium' | 'high'}>({})
 
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Task 1',
      description: 'Description for Task 1',
      status: 'pending',
      priority: 'medium',
      dueDate: '2025-12-10',
    },
    {
      id: '2',
      title: 'Task 2',
      description: 'Description for Task 2',
      status: 'in-progress',
      priority: 'high',
      dueDate: '2025-12-11',
    },
    {
      id: '3',
      title: 'Task 3',
      description: 'Description for Task 3',
      status: 'completed',
      priority: 'low',
      dueDate: '2025-12-13',
    },
  ]);
 
  // handle status
  const handelStatus = (taskId:string, newStatus: TaskStatus)=>{
    setTasks((prevTask)=>
      prevTask.map(task =>
        task.id === taskId ? {...task , status: newStatus} : task
      )
    )
  }
  // filters
  const handleFilterChange = (newFilters: { status?: TaskStatus; priority?: 'low' | 'medium' | 'high' }) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
  }));
};
// delete
const handleDelete = (taskId : string)=>{
  setTasks((prevTask)=>prevTask.filter(task => task.id !== taskId))
}

const filteredTasks = tasks.filter((task) => {
  const matchesStatus = !filters.status || task.status === filters.status;
  const matchesPriority = !filters.priority || task.priority === filters.priority;
  return matchesStatus && matchesPriority;
});


  return (
    <div className='#' style={{ backgroundColor: '#252525', color: "#fff" }}>
    <h3 style={{ textAlign: 'center', margin:'10px 5px' }}>My List</h3>
    <div>
      <TaskFilter onFilterChange={handleFilterChange}/>
    </div>
     <div className='col-sm-12 col-md-12'>
       <TaskList 
        tasks={filteredTasks}
        onStatusChange={handelStatus}
        onDelete={handleDelete}
       />
     </div>
    </div>
  )
}

export default App
