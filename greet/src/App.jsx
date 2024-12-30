import React from "react";
import Email from "./pages/email";
import Templates from "./pages/Templates";
import { Route, Routes } from "react-router-dom";
import Recipients from "./pages/Recipients";


const App = () => (
  <div > 
   
    {/* <TextEditor /> */}
    {/* <EmailEditor/> */}
{/* <Email/> */}

      <Routes>
        <Route path="/" element={<Templates />} />
        <Route path="/emails" element={<Email />} />
        <Route path="/Recipients" element={<Recipients/>} />
      </Routes>
 

  </div>
);

export default App;
