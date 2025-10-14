import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CategoryBar from './components/categoryBar'
import LoanComponent from './components/loanComponent'
import FdComponent from './components/fdComponent'
import RdComponent from './components/rdComponent'


function App() {
  const [count, setCount] = useState(0)

  return (
   <div style={{ width:"50%", alignItems:'center', marginLeft:'24%', display:'flex', flexDirection:'column',  }}>
        <CategoryBar />
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<LoanComponent />} />
            <Route path='/rd' element={<RdComponent />} />
            <Route path='/fd' element={<FdComponent />} />
          </Routes>
        </BrowserRouter>
      
   </div> 
     
  )
}

export default App
