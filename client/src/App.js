import React from 'react'
import { BrowserRouter } from "react-router-dom";
import AppRoutes from './util/appRoutes';

function App() {
  return (
    <div>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  )
}

export default App