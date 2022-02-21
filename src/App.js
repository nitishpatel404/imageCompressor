import React from "react";
import "./App.css";

import MainPage from "./Component/Mainpage";
const App = () => {
  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div className="App">
      <header>
        <span  onClick={refreshPage}style={{color:'white'}}>Image Compressor</span>
      </header>
      

      <MainPage />
    </div>
  );
};

export default App;
