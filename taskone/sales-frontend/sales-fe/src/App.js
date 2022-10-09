import NavBar from './components/NavBar';
import AddSales from './screens/AddSales';
import Top5Sales from './screens/Top5Sales';
import TotalRevenue from './screens/TotalRevenue';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './screens/Login';
import AddUser from './screens/AddUser';
import { useSelector } from 'react-redux'

function App() {

  const user = useSelector(state=> state.user)

  return (
    <Router>
      <div>
        <NavBar></NavBar>
        <Routes>
        <Route exact path='/' element={<Login />}></Route>
          <Route exact path='/login' element={<Login />}></Route>
          <Route exact path='/addUser' element={<AddUser />}></Route>
          {user.user.firstName ?<Route exact path='/addSales' element={<AddSales />}></Route> : ''}
          {user.user.firstName ?<Route exact path='/top5Sales' element={<Top5Sales />}></Route> : ''}
          {user.user.firstName ?<Route exact path='/totalRevenue' element={<TotalRevenue />}></Route> : ''}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
