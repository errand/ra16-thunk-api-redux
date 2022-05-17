import {fetchServiceById} from "../thunks/serviceThunk";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import { useParams} from "react-router-dom";

export default function TaskEditForm() {

  let { id } = useParams();

  const dispatch = useDispatch();
  const task = useSelector(state => state.tasks.services)
  const loading = useSelector(state => state.tasks.loading)
  const error = useSelector(state => state.tasks.error)

  useEffect(() => {
    dispatch(fetchServiceById(id))
  },[dispatch])

  return (
    <>
    {loading === 'pending' ? <div className="spinner"></div> :
      <form>
        <input type="text" value={task.name}/>
        <input type="text" value={task.price}/>
        <input type="text" value={task.content}/>
      </form> }
    </>
    )
}
