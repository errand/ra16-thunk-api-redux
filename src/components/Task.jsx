import { useDispatch } from "react-redux";
import {deleteService, servicesError, servicesLoading} from "../redux/tasksSlice";
import PropTypes from 'prop-types'
import {
  Link
} from "react-router-dom";

export default function Task({ id, title, price, onClick: deleteTask }) {
  const dispatch = useDispatch();

    return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div className="col-6 col-lg-10 fw-bold">{title}</div>
      <div className="fw-bold flex-fill">{price}</div>
      <div className="controls">
        <Link  to={`/services/${id}`} className="btn btn-primary badge me-1">Edit</Link>
        <button className="btn btn-danger badge" onClick={()=>{ deleteTask(id) }}>Delete</button>
      </div>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired
};
