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
