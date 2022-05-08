<<<<<<< HEAD
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ApplyLoan } from './components/ApplyLoan'
import Header from './components/Header'
import { ROUTES } from './utils/routes'
export const App = () => {
    return (
        <Header>
            <Routes>
                <Route path='/' element={<div>Hello world</div>} />
                <Route
                    path={ROUTES.DASHBOARD}
                    element={<div>Hello dash</div>}
                />
                <Route path={ROUTES.APPLY_LOANS} element={<ApplyLoan />} />
            </Routes>
        </Header>
    )
}
=======
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
>>>>>>> 5ed7decd41ad2206c58fba171788dca3ecdda26e
