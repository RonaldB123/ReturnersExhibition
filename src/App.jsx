import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import { HomePage } from "./pages/Home"
import { useEffect, useState } from "react"
import { Menu } from "./components/Menu";
import { FavouritesPage } from "./pages/Favourites";
import { SculpturesPage } from "./pages/Sculptures";
import { PaintingsPage } from "./pages/Paintings";

function App() {
  const [favArt, setFavArt] = useState([]);

  useEffect(()=> {
    if(JSON.parse(localStorage.getItem('FavouritedArt')) !== null){
      if(JSON.parse(localStorage.getItem('FavouritedArt')).length === 0){
        localStorage.setItem('FavouritedArt', JSON.stringify(favArt));
      }else{
        setFavArt(JSON.parse(localStorage.getItem('FavouritedArt')));
      }
    }
  },[])

  useEffect(()=> {
    localStorage.setItem('FavouritedArt', JSON.stringify(favArt));
  },[favArt])
  
  const {pathname} = useLocation();
  useEffect(()=> {
    window.scrollTo(0,0)
  },[pathname])

  return (
    <>
    <Menu favArt={favArt}/>
      <Routes>
        <Route path="*" element={<Navigate to="/"/>}/>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/favourites" element={<FavouritesPage setFavArt={setFavArt} favArt={favArt}/>}/>
        <Route path="/sculptures" element={<SculpturesPage favArt={favArt} setFavArt={setFavArt}/>}/>
        <Route path="/paintings" element={<PaintingsPage setFavArt={setFavArt} favArt={favArt}/>}/>
      </Routes>    
    </>
  )
}

export default App
