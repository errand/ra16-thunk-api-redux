import {fetchServiceById, updateServices } from "../thunks/serviceThunk";
import { changeServiceState} from "../redux/tasksSlice";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {
  Link
} from "react-router-dom";

export default function TaskEditForm() {

  let { id } = useParams();
  id = +id

  const navigate = useNavigate()

  const dispatch = useDispatch();
  const task = useSelector(state => state.tasks.task)
  const loading = useSelector(state => state.tasks.loading)
  const error = useSelector(state => state.tasks.error)
  const goodToGo = useSelector(state => state.tasks.goodToGo)

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateServices({id, name: task.name, price: task.price, content: task.content}))
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(changeServiceState(name, value));

    console.log(name, value)
  }

  useEffect(() => {
    dispatch(fetchServiceById(id));
  },[dispatch, id])

  return (
    <>
      {goodToGo && navigate('/services')}
      {error && <div className="alert alert-danger">{error}</div>}
      {loading === 'pending' ? <div className="spinner"></div> :
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input onChange={handleChange} type="text" placeholder="name" name="name" value={task.name} className="form-control" />
        </div>
        <div className="mb-3">
          <input onChange={handleChange} placeholder="price" type="text" name="price" value={task.price} className="form-control" />
        </div>
        <div className="mb-3">
          <input onChange={handleChange} placeholder="content" type="text" name="content" value={task.content} className="form-control" />
        </div>
        <div>
          <Link to="/services" className="btn btn-danger me-1" type="submit">Cancel</Link>
          <button className="btn btn-primary" type="submit" onClick={(e) => handleSubmit(e)}>Save</button>
        </div>
      </form> }
    </>
    )
}
