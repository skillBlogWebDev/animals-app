import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import './App.css';
import Animals from "./components/Animals/Animals";
import Appointments from "./components/Appointments/Appointments";
import { Header } from "./components/Header/Header";
import Login from "./components/Login/Login";

function App() {
  const isAuthUser = useSelector(state => state.auth.isAuthUser);

  return (
    <div className="App">
      <Router>
      <Header />
        <Switch>
        <Route path='/animals'>
        {isAuthUser 
        ? <Animals />
        : <Login />}
        </Route>
        <Route path='/today'>
        {isAuthUser 
        ? <Appointments />
        : <Login />}
        </Route>
        <Route path="/">
        {isAuthUser 
        ? <Appointments />
        : <Login />}
        </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
