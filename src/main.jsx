import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ErrorBoundary } from "react-error-boundary";
import { MehOutlined } from '@ant-design/icons';

function fallbackRender({error, resetErrorBoundary }){
  setTimeout(()=> {
    resetErrorBoundary();
  },3000)
  return (<>
 <div className="text-center text-5xl mt-40">
        <h1 className="mb-5"> Oops! <MehOutlined /></h1>
    <h1 className="mb-5">An Error has occured!</h1>
    <h1>Sorry!</h1>
    </div>
  </>)
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary fallbackRender={fallbackRender} >
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
)
