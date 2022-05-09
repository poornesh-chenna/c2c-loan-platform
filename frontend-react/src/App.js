import React from "react";
import { Route, Routes } from "react-router-dom";
import { ApplyLoanScreen } from "./screens/ApplyLoan";
import { DashboardScreen } from "./screens/Dashboard";
import { MyLoansScreen } from "./components/MyLoans";
import { Home } from "./screens/Home";
import { ROUTES } from "./utils/routes";
export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path={ROUTES.DASHBOARD} element={DashboardScreen} />
        <Route path={ROUTES.APPLY_LOANS} element={ApplyLoanScreen} />
        <Route path={ROUTES.MY_LOANS} element={MyLoansScreen} />
      </Routes>
    </>
  );
};
