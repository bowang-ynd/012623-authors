import React from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import CreateAuthor from "./components/CreateAuthor";
import NavBar from "./components/NavBar";
import Authors from "./components/Authors";
import AllAuthors from "./components/AllAuthors";
import UpdateAuthor from "./components/UpdateAuthor";

const App = () => {
    return (
        <div>
            <NavBar />
            <div className="container">
              <Routes>
                  <Route path="/" element={<Navigate to="/authors" />} />
                  <Route path="/authors" element={<Authors />}>
                    <Route index element={<AllAuthors />} />
                    <Route path='new' element={<CreateAuthor />} />
                    <Route path=':id/edit' element={<UpdateAuthor />} />
                  </Route>
              </Routes>
            </div>
        </div>
    );
};

export default App;
