<<<<<<< HEAD
import React from "react";
import { Route, Routes } from "react-router-dom";
import { ApplyLoan } from "./components/ApplyLoan";
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
        <Route path={ROUTES.APPLY_LOANS} element={<ApplyLoan />} />
      </Routes>
    </Header>
  );
};
=======
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { headerWrapper } from './components/Header'
import { ApplyLoanScreen } from './screens/ApplyLoan'
import { DashboardScreen } from './screens/Dashboard'
import { Home } from './screens/Home'
// import Header from './components/Header'
import { ROUTES } from './utils/routes'
export const App = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path={ROUTES.DASHBOARD} element={DashboardScreen} />
                <Route path={ROUTES.APPLY_LOANS} element={ApplyLoanScreen} />
            </Routes>
        </>
    )
}
>>>>>>> a5169ef73ed5903f37ccc36ad2a6833a9651de63
