import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { headerWrapper } from './components/Header'
import MyLoans, { MyLoansScreen } from './components/MyLoans'
import { ApplyLoanScreen } from './screens/ApplyLoan'
import { DashboardScreen } from './screens/Dashboard'
import { Home } from './screens/Home'
import { LeandingLoansScreen } from './screens/LendingLoans'
import { LoanRequestsScreen } from './screens/LoanRequests'
// import Header from './components/Header'
import { ROUTES } from './utils/routes'
export const App = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path={ROUTES.DASHBOARD} element={DashboardScreen} />
                <Route
                    path={ROUTES.LOAN_REQUESTS}
                    element={LoanRequestsScreen}
                />
                <Route path={ROUTES.MY_LOANS} element={MyLoansScreen} />
                <Route path={ROUTES.APPLY_LOANS} element={ApplyLoanScreen} />
                <Route path={ROUTES.LEADINGS} element={LeandingLoansScreen} />
            </Routes>
        </>
    )
}
