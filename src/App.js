import React from "react";
import { BrowserRouter, Route, NavLink, Routes } from "react-router-dom";
import Message from "./Message";
import Tour from "./Tour";

function App() {
  return (
      <BrowserRouter>
        <div>
          <nav className={"container"}>

                <NavLink className={"btn btn-outline-primary"} to="/tour" activeClassName="active">
                  Tour
                </NavLink>

                <NavLink className={"btn btn-outline-primary"} to="/messages" activeClassName="active">
                  Messages
                </NavLink>

          </nav>

          <Routes>
            <Route path="/tour" element={<Tour />} />
            <Route path="/messages" element={<Message />} />
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;
