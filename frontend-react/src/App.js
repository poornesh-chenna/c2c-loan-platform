<<<<<<< HEAD
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { headerWrapper } from './components/Header'
import MyLoans from './components/MyLoans'
import { ApplyLoanScreen } from './screens/ApplyLoan'
import { DashboardScreen } from './screens/Dashboard'
import { Home } from './screens/Home'
import { LeandingLoansScreen } from './screens/LendingLoans'
// import Header from './components/Header'
import { ROUTES } from './utils/routes'
export const App = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path={ROUTES.DASHBOARD} element={DashboardScreen} />
                <Route
                    path={ROUTES.MY_LOANS}
                    element={headerWrapper(<MyLoans />)}
                />
                <Route path={ROUTES.APPLY_LOANS} element={ApplyLoanScreen} />
                <Route path={ROUTES.LEADINGS} element={LeandingLoansScreen} />
            </Routes>
        </>
    )
}
=======
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
>>>>>>> 256ab0f7270ffb342c968aa16d9ae7641d62877c
