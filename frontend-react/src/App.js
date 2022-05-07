import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import MyLoans from "./components/MyLoans";
import { ROUTES } from "./utils/routes";
export const App = () => {
  return (
    <Header>
      <Routes>
        <Route path="/" element={<div>Hello world</div>} />
        <Route path={ROUTES.DASHBOARD} element={<div>Hello dash</div>} />
        <Route path={ROUTES.MY_LOANS} element={<MyLoans />} />
      </Routes>
    </Header>
  );
};
