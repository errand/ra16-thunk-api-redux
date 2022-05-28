import { useDispatch } from "react-redux";
import { deleteServices } from "../thunks/serviceThunk";
import PropTypes from 'prop-types'
import {
  Link
} from "react-router-dom";

export default function Task({ id, title, price }) {
  const dispatch = useDispatch();

  const deleteTask = (id) => dispatch(deleteServices(id));

    return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div className="col-6 col-lg-10">{title}</div>
      <div className="flex-fill">{price}</div>
      <div className="controls">
        <Link to={`https://errand.github.io/ra16-thunk-api-redux/services/${id}`} className="btn btn-primary badge me-1">Edit</Link>
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
