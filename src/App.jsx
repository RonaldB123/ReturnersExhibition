import { Route, Routes } from "react-router-dom"
import { HomePage } from "./pages/Home"
import { useEffect, useState } from "react"
import { Menu } from "./components/Menu";
import { FavouritesPage } from "./pages/Favourites";
import { SculpturesPage } from "./pages/Sculptures";
import { PaintingsPage } from "./pages/Paintings";
import { PageLoader } from "./components/PageLoader";

function App() {
  const [favArt, setFavArt] = useState([]);
  const [pageLoad, setPageLoad] = useState(true);

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

  return (
    <>
    {pageLoad ? <PageLoader setPageLoad={setPageLoad}/> :
    <div>
    <Menu pageLoad={pageLoad} favArt={favArt}/>
      <Routes>
        <Route path="/" element={<HomePage setFavArt={setFavArt} favArt={favArt} setPageLoad={setPageLoad}/>}/>
        <Route path="/favourites" element={<FavouritesPage setFavArt={setFavArt} favArt={favArt}/>}/>
        <Route path="/sculptures" element={<SculpturesPage favArt={favArt} setFavArt={setFavArt}/>}/>
        <Route path="/paintings" element={<PaintingsPage/>}/>
      </Routes>
      </div>
}
    </>
  )
}

export default App
