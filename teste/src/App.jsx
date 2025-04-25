import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DataList from "./components/DataList";
import UserDetails from "./components/UserDetails";
import UserEdit from "./components/UserEdit";
import React from "react";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:id" element={<UserDetails />} />
        <Route path="/edit" element={<UserEdit />} />
      </Routes>
    </Router>
  );
}

function Home() {
  return (
    <div className="container">
      <DataList />
    </div>
  );
}