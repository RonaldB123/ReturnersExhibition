import { Route, Routes } from "react-router-dom"
import { HomePage } from "./pages/Home"
import { useEffect, useState } from "react"
import { Menu } from "./components/Menu";
import { FavouritesPage } from "./pages/Favourites";
import { PaintingsPage } from "./pages/Paintings";
import { Sculptures } from "./pages/Sculptures";

function App() {
  const [favArt, setFavArt] = useState([]);

  useEffect(()=> {
    if(JSON.parse(localStorage.getItem('FavouritedArt')).length === 0){
      localStorage.setItem('FavouritedArt', JSON.stringify(favArt));
    }else{
      setFavArt(JSON.parse(localStorage.getItem('FavouritedArt')));
    }
  },[])

  useEffect(()=> {
    localStorage.setItem('FavouritedArt', JSON.stringify(favArt));
  },[favArt])

  return (
    <>
    <Menu favArt={favArt}/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/Favourites" element={<FavouritesPage setFavArt={setFavArt} favArt={favArt}/>}/>
        <Route path="/Paintings" element={<PaintingsPage setFavArt={setFavArt} favArt={favArt}/>} />
        <Route path="/Sculptures" element={<Sculptures/>}/>
      </Routes>
    </>
  )
}

export default App
