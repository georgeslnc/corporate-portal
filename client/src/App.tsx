import { useEffect } from "react"
import { RootState, useAppDispatch, useAppSelector } from "./redux/type"
import { getEmployees } from "./redux/Thunk/employees"


function App() {

  const dispatch = useAppDispatch()
  const employees = useAppSelector( (state: RootState)=> state.employeesSlice.employees)
  console.log(employees);
  

  useEffect(()=>{
    dispatch(getEmployees())
  },[])

  return (
    <>

    </>
  )
}

export default App
