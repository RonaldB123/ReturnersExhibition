import { Route, Routes } from "react-router-dom"
import { HomePage } from "./pages/Home"
import { useState } from "react"
import { Menu } from "./components/Menu";

function App() {
  const [favArt, setFavArt] = useState([]);
  return (
    <>
    <Menu favArt={favArt}/>
      <Routes>
        <Route path="/" element={<HomePage setFavArt={setFavArt} favArt={favArt}/>}/>
        
      </Routes>
    </>
  )
}

export default App
