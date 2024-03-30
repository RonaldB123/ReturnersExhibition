import { Route, Routes } from "react-router-dom"
import { HomePage } from "./pages/Home"
import { useState } from "react"

function App() {
  const [favArt, setFavArt] = useState([]);
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage setFavArt={setFavArt} favArt={favArt}/>}/>
        
      </Routes>
    </>
  )
}

export default App
