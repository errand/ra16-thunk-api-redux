import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import TasksList from "./components/TasksList";
import TaskEditForm from "./components/TaskEditForm"

const App = () => {
  return (
    <div className="tasks container">
      <h1 className="title">Services</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/ra16-thunk-api-redux/services" element={<TasksList />} />
          <Route path="/ra16-thunk-api-redux/services/:id" element={<TaskEditForm />} />
          <Route path="/" element={<Navigate to="/ra16-thunk-api-redux/services" replace />} />
          <Route path="*" element={<Navigate to="/ra16-thunk-api-redux/services" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App
