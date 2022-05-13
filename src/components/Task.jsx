import { useDispatch } from "react-redux";
import { deleteService, editService } from "../redux/tasksSlice";
import PropTypes from 'prop-types'

export default function Task({ id, title, price }) {
  const dispatch = useDispatch();

  const editTask = id => dispatch(editService({id: id}));
  const deleteTask = id => dispatch(deleteService({id: id}));

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div className="col-6 col-lg-10 fw-bold">{title}</div>
      <div className="fw-bold flex-fill">${price}</div>
      <div className="controls">
        <button className="btn btn-primary badge me-1" onClick={()=>{ editTask(id) }}>Edit</button>
        <button className="btn btn-danger badge" onClick={()=>{ deleteTask(id) }}>Delete</button>
      </div>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired
};
