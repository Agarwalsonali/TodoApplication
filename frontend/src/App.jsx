import { BrowserRouter ,Route,Routes} from 'react-router-dom'

import './App.css'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import DashBoard from './pages/DashBoard'
import EditTodo from './pages/EditTodo'
function App() {
  return (
   <>
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/dashboard' element={<DashBoard/>} />
        <Route path='/edit/:id' element={<EditTodo/>}/>
      </Routes>
    </BrowserRouter>
   </>
  
  );
}

export default App;



