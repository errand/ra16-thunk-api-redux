import {deleteService, servicesError, servicesLoading, servicesReceived, editService} from "../redux/tasksSlice";

export const fetchServices = () => (dispatch) => {

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

export const fetchServiceById = (id) => (dispatch) => {
  dispatch(servicesLoading());

  fetch("http://localhost:7070/api/services/" + id)
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

export const deleteServices = (id) => (dispatch) => {
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

export const updateServices = (obj) => (dispatch) => {
  dispatch(servicesLoading());
  fetch("http://localhost:7070/api/services/", {
    method: "POST"
  })
    .then(() => {
      dispatch(editService(obj))
    })
    .then(() => dispatch(servicesLoading()))
    .then(() => dispatch(fetchServices()))
    .catch((err) => {
      dispatch(servicesError(`Произошла ошибка: ${err}`))
    });
}
