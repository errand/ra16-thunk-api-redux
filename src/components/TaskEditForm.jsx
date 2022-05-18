import {fetchServiceById, updateServices} from "../thunks/serviceThunk";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import { useHistory } from 'react-router-dom';
import {
  Link
} from "react-router-dom";

export default function TaskEditForm() {

  const { id } = useParams();
  const navigate = useNavigate()

  const dispatch = useDispatch();
  const task = useSelector(state => state.tasks.services)
  const loading = useSelector(state => state.tasks.loading)
  const error = useSelector(state => state.tasks.error)

  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [content, setContent] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    const goName = name ? name : task.name
    const goPrice = price ? price : task.price
    const goContent = content ? content : task.content
    dispatch(updateServices({id, name: goName, price: goPrice, content: goContent}))
  }

  useEffect(() => {
    dispatch(fetchServiceById(id));
  },[dispatch])

  return (
    <>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading === 'pending' ? <div className="spinner"></div> :
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input onChange={(e) => setName(e.target.value)} type="text" placeholder="name" value={name ? name : task.name} className="form-control" />
        </div>
        <div className="mb-3">
          <input onChange={(e) => setPrice(e.target.value)} placeholder="price" type="text" value={price ? price : task.price} className="form-control" />
        </div>
        <div className="mb-3">
          <input onChange={(e) => setContent(e.target.value)} placeholder="content" type="text" value={content ? content : task.content} className="form-control" />
        </div>
        <div>
          <Link to="/services" className="btn btn-danger me-1" type="submit">Cancel</Link>
          <button className="btn btn-primary" type="submit" onClick={(e) => handleSubmit(e)}>Save</button>
        </div>
      </form> }
    </>
    )
}
