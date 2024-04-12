import { Route, Routes } from "react-router-dom"
import { HomePage } from "./pages/Home"
import { useEffect, useState } from "react"
import { Menu } from "./components/Menu";
import { FavouritesPage } from "./pages/Favourites";
import { SculpturesPage } from "./pages/Sculptures";
import { PaintingsPage } from "./pages/Paintings";

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
        <Route path="/" element={<HomePage setFavArt={setFavArt} favArt={favArt}/>}/>
        <Route path="/favourites" element={<FavouritesPage setFavArt={setFavArt} favArt={favArt}/>}/>
        <Route path="/sculptures" element={<SculpturesPage/>}/>
        <Route path="/paintings" element={<PaintingsPage/>}/>
      </Routes>
    </>
  )
}

export default App
