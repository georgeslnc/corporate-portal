import { useEffect } from "react"
import { RootState, useAppDispatch, useAppSelector } from "./redux/type"
import { getEmployees } from "./redux/Thunk/employees"
import { Route, Routes } from "react-router-dom"
import Handbook from "./components/Handbook/Handbook"


function App() {

  const dispatch = useAppDispatch()
  const employees = useAppSelector( (state: RootState)=> state.employeesSlice.employees)
  console.log(employees);
  

  useEffect(()=>{
    dispatch(getEmployees())
  },[])

  return (
    <>
      <Routes>
        <Route path="/handbook"  element={<Handbook />}/>
        {/* <Route path="/tree"  element={<tree />}/> */}
        {/* <Route path="/applications"  element={<applications />}/> */}
        {/* News */}
        {/* <Route path="/info"  element={<info />}/> */}
        {/* Chat */}
      </Routes>
    </>
  )
}

export default App
