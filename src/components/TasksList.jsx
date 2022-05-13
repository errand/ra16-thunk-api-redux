import Task from './Task';
import { useDispatch } from "react-redux";
import { servicesReceived, servicesLoading } from "../redux/tasksSlice";
import {useEffect, useState} from "react";

export default function TasksList() {
  const dispatch = useDispatch();
  const fetchServices = () => async (dispatch) => {
    dispatch(servicesLoading())
    const response = await fetch("http://localhost:7070/api/services")
    console.log(servicesReceived(response.data))
    dispatch(servicesReceived(response.data))
  }
  const [tasks, setState] = useState()

  useEffect(() => {
    setState(fetchServices())
    console.log(tasks)
    },[tasks])

  return (
    <ul className="list-group">
      <li className="list-group-item d-flex justify-content-between align-items-center">
        <div className="col-6 col-md-10 fw-bold">Title</div>
        <div className="fw-bold flex-fill">Price</div>
        <div className="controls fw-bold">
          Control
        </div>
      </li>
      {tasks ? tasks.map((task) => (
        <Task key={task.id} id={task.id} title={task.title} price={task.price} />
      )) : 'Nothing found'}
    </ul>
  );
}
