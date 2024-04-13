import { Navigate, useNavigate } from "react-router-dom"

export const PageLoader = ({setPageLoad}) => {

    const navigate = useNavigate();
    const handleClick = () => navigate('/');

    return (
    <>
    <div className="overflow-hidden translate-y-1/2">
<div className="cube-loader mr-auto ml-auto mt-16">
  <div className="cube-top"></div>
  <div className="cube-wrapper">
    <span className="cube-span" style={{"--i":0}}></span>
    <span className="cube-span" style={{"--i":1}}></span>
    <span className="cube-span" style={{"--i":2}}></span>
    <span className="cube-span" style={{"--i": 3}}></span>
  </div>
</div>
<div className="animation text-2xl sm:text-7xl max-w-fit w-full">Welcome to exhibition curator</div>
<button className="button sm:m-56 max-w-xs w-full ml-auto mr-auto" 
onClick={()=>setTimeout(()=> {
    handleClick();
    setPageLoad(false);
}, 500)}>
  <span className="text">Continue</span>
  <span className="arrow"></span>
</button>

</div>
    </>
    )
}