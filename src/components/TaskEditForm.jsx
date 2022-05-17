import {fetchServiceById} from "../thunks/serviceThunk";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import { useParams} from "react-router-dom";

export default function TaskEditForm() {

  let { id } = useParams();

  const dispatch = useDispatch();
  const task = useSelector(state => state.tasks.services)
  const loading = useSelector(state => state.tasks.loading)
  const error = useSelector(state => state.tasks.error)

  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [content, setContent] = useState('')

  const handleSubmit = () => {

  }

  useEffect(() => {
    dispatch(fetchServiceById(id))
  },[dispatch])

  return (
    <>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading === 'pending' ? <div className="spinner"></div> :
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input onChange={(e) => setName(e.target.value)} type="text" placeholder="name" value={task.name} className="form-control" />
        </div>
        <div className="mb-3">
          <input onChange={(e) => setPrice(e.target.value)} placeholder="price" type="text" value={task.price} className="form-control" />
        </div>
        <div className="mb-3">
          <input onChange={(e) => setContent(e.target.value)} placeholder="content" type="text" value={task.content} className="form-control" />
        </div>
      </form> }
    </>
    )
}
