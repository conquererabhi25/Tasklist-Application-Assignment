import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faArrowAltCircleDown, faArrowAltCircleUp, faArrowDown, faCalendar, faCancel, faClock, faFlag, faRemove,  faTasks, faUser } from '@fortawesome/free-solid-svg-icons';
import './index.css';

const Home = () => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [assignee, setAssignee] = useState('');
  const [priority, setPriority] = useState('');
  const [reminders, setReminders] = useState('');
  const [tasks, setTasks] = useState([]);
  const [selectedPriority, setSelectedPriority] = useState('');
  const [activeTask, setActiveTask] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'taskName':
        setTaskName(value);
        break;
      case 'description':
        setDescription(value);
        break;
      case 'dueDate':
        setDueDate(value);
        break;
      case 'assignee':
        setAssignee(value);
        break;
      case 'priority':
        setPriority(value);
        break;
      case 'reminders':
        setReminders(value);
        break;
      default:
        break;
    }
  };

  const handleTaskCancel =()=>{
    setTaskName("")
    setDescription("")
    setDueDate("")
    setAssignee("")
    setPriority("")
    setSelectedPriority("")
  }

  const handleChange = (event) => {
    setSelectedPriority(event.target.value);
  };


  const handleStartTask = (index) => {
    setActiveTask(index);
  };

  const handleEndTask = () => {
    setActiveTask(null);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const handleAddTask = () => {
    const newTask = {
      taskName,
      description,
      dueDate,
      assignee,
      selectedPriority,
      activeTask,
      reminders,
    };
    setTasks([...tasks, newTask]);
    resetForm();
  };

  const resetForm = () => {
    setTaskName('');
    setDescription('');
    setDueDate('');
    setAssignee('');
    setPriority('');
    setReminders('');
  };



  return (
    <div className="task-list-main-box">
      <div className='tasklist-card'>
      <h1 className='heading'><FontAwesomeIcon icon={faTasks} color='green'/> My Tasklist</h1>
      <div className="task-form">
        <div className='taskInput-container'>
        <input
          type="text"
          name="taskName"
          value={taskName}
          onChange={handleInputChange}
          placeholder="Task name"
          className='taskinput'
        />
                
        <input
          type="text"
          name="description"
          value={description}
          onChange={handleInputChange}
          placeholder="Description"
          className='taskDesc'
        />
        </div>

        <div className="task-details">
          <input
            type="date"
            name="dueDate"
            value={dueDate}
            onChange={handleInputChange}
           className='dueDate'
          />
          <input
            type="text"
            name="assignee"
            value={assignee}
            onChange={handleInputChange}
            placeholder="Assignee"
            className='otherInput'
          />


<select
        value={selectedPriority}
        onChange={handleChange}
        className="prioritySelector"
      >
        <option value="" disabled>
          Set Priority 
        </option>
        <option value="High" className='highPrio'>
          High
        </option>
        <option value="Medium" className='MediumPrio'>
          Medium
        </option>
        <option value="Low" className='lowPrio'>
          Low
        </option>
      </select>
        </div>
        <div className="task-footer">
     
          <div>
            <button className="cancel-btn" onClick={handleTaskCancel}> <FontAwesomeIcon icon={faCancel}/> Cancel</button>
            <button className="add-task-list" onClick={handleAddTask}>
            <FontAwesomeIcon icon={faAdd}/> Add task
            </button>
          </div>
        </div>
      </div>

      <p className='tasksectiontext'>Task Section <FontAwesomeIcon icon={faArrowAltCircleDown}/></p>

      <ul className='unordered-list'>
          {tasks.map((task, index) => (
            <li key={index} className='eachTaskList'>
              <div>
                <h5><FontAwesomeIcon icon={faTasks}/> {task.taskName}</h5>
               
                <div className='status'>
                <p className='taskdecend'>{task.description}</p>
                {activeTask === index && <p className='taskStatus'> <FontAwesomeIcon icon={faClock}/> Task started</p>}
                </div>
              </div>
              <div className="task-details">
                <span className='taskDetailItem'><FontAwesomeIcon icon={faCalendar}/> Due date: <span className='shortele'>{task.dueDate}</span></span>
                <span className='taskDetailItem'><FontAwesomeIcon icon={faUser}/> Assignee: <span className='shortele'>{task.assignee}</span></span>
                <span className='taskDetailItem'><FontAwesomeIcon icon={faFlag}/> Priority: <span className='shortele'>{task.selectedPriority}</span></span>

              </div>
              <div className="task-actions">
            
                {activeTask === index ? (
                  <button onClick={handleEndTask} className='endbutton'>End Task</button>
                ) : (
                  <button onClick={() => handleStartTask(index)} className='Startbutton'>
                     Start Task
                  </button>
                )}
                <button onClick={() => handleDeleteTask(index)} className='Deletebutton'>
                  <FontAwesomeIcon icon={faRemove}/> Delete Task
                </button>
              </div>
              
            </li>
          ))}
        </ul>


      </div>
     
    </div>
  );
};

export default Home;