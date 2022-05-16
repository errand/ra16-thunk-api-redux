import Task from './Task';
import {useDispatch, useSelector} from "react-redux";
import {servicesReceived, servicesLoading, servicesError, deleteService} from "../redux/tasksSlice";
import {useEffect} from "react";

export default function TasksList() {

  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks.services)
  const loading = useSelector(state => state.tasks.loading)
  const error = useSelector(state => state.tasks.error)

  const fetchServices = () => (dispatch) => {

    dispatch(servicesLoading());

    fetch("http://localhost:7070/api/services")
      .then(request => {
        if (request.status === 200) {
          return request.json();
        } else {
          dispatch(servicesError('Произошла ошибка'));
          return;
        }
      })
      .then(json => {
        dispatch(servicesReceived(json))
      })
      .catch((err) => dispatch(servicesError(`Произошла ошибка: ${err}`)));
  }

  const deleteServices = (id) => (dispatch) => {
    dispatch(servicesLoading());
    fetch("http://localhost:7070/api/services/" + id, {
      method: "DELETE"
    })
      .then(() => {
        dispatch(deleteService(id))
      })
      .then(() => dispatch(servicesLoading()))
      .then(() => dispatch(fetchServices()))
      .catch((err) => dispatch(servicesError(`Произошла ошибка: ${err}`)));
  }

  const deleteTask = (id) => dispatch(deleteServices(id));

  useEffect(() => {
    dispatch(fetchServices())
    },[dispatch])

  return (
    <ul className="list-group">
      {loading === 'pending' ? <div className="spinner"></div> :
      <li className="list-group-item d-flex justify-content-between align-items-center">
        <div className="col-6 col-md-10 fw-bold">Title</div>
        <div className="fw-bold flex-fill">Price</div>
        <div className="controls fw-bold">
          Control
        </div>
      </li> }
      {error && <div className="alert alert-danger">{error}</div>}
      {tasks ? tasks.map((task) => (
        <Task key={task.id} id={task.id} title={task.name} price={task.price} onClick={deleteTask} />
      )) : 'Nothing found'}
    </ul>
  );
}
