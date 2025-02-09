
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Dashboard";
import "./styles/global.scss";
import EmptyPage from "./pages/EmptyPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="*" element={<EmptyPage />} /> 
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
