import { useEffect } from "react"
import { RootState, useAppDispatch, useAppSelector } from "./redux/type"
import { getEmployees } from "./redux/Thunk/employees"
import { Route, Routes } from "react-router-dom"
import Application from "./components/Application/Application"


function App() {

  const dispatch = useAppDispatch()

  useEffect(()=>{
    dispatch(getEmployees())
  },[])

  return (
    <>
      <Routes>
        {/* <Route path="/handbook"  element={<HandBook />}/> */}
        {/* <Route path="/tree"  element={<tree />}/> */}
        <Route path="/applications"  element={<Application />}/>
        {/* News */}
        {/* <Route path="/info"  element={<info />}/> */}
        {/* Chat */}
      </Routes>
    </>
  )
}

export default App
