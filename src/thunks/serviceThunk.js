import { servicesError, servicesLoading, servicesReceived, servicesRedirect } from "../redux/tasksSlice";
const PATH = "https://errand-thunk-redux.herokuapp.com/";

export const fetchServices = () => (dispatch) => {

  dispatch(servicesLoading());

  fetch(PATH)
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

  fetch(PATH + id)
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
  fetch(PATH + id, {
    method: "DELETE"
  })
    .then(() => dispatch(fetchServices()))
    .catch((err) => dispatch(servicesError(`Произошла ошибка: ${err}`)));
}

export const updateServices = (obj) => (dispatch) => {
  dispatch(servicesLoading());
  fetch(PATH, {
    method: "POST",
    body: JSON.stringify(obj),
  })
    .then((res) => {
      console.log(res);
      res.ok ? dispatch(servicesRedirect(true)) : dispatch(servicesRedirect(false));
    })
    .then(() => dispatch(fetchServices()))
    .catch((err) => {
      dispatch(servicesError(`Произошла ошибка: ${err}`));
      dispatch(servicesRedirect(false));
    });
}
