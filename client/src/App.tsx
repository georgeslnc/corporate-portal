import { useEffect } from "react"
import { RootState, useAppDispatch, useAppSelector } from "./redux/type"
import { getEmployees } from "./redux/Thunk/employees"
import { Route, Routes } from "react-router-dom"
import Application from "./components/Application/Application"
import Handbook from "./components/Handbook/Handbook"
import FindEmployee from "./components/Handbook/FindEmployee"
import Tree from "./components/Tree/Tree"


function App() {

  const dispatch = useAppDispatch()

  useEffect(()=>{
    dispatch(getEmployees())
  },[])

  return (
    <>
      <Routes>
        <Route path="/handbook"  element={<Handbook />}/>
        <Route path="/employee/:id"  element={<FindEmployee />}/>
        <Route path="/tree"  element={<Tree />}/>
        <Route path="/applications"  element={<Application />}/>
        {/* News */}
        {/* <Route path="/info"  element={<info />}/> */}
        {/* Chat */}
      </Routes>
    </>
  )
}

export default App
