import React, { createContext, useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { MyLoansScreen } from './components/MyLoans'
import { ApplyLoanScreen } from './screens/ApplyLoan'
import { Home } from './screens/Home'
import { LeandingLoansScreen } from './screens/LendingLoans'
import { LoanRequestsScreen } from './screens/LoanRequests'
import { ProfileUpdateScreen } from './screens/ProfileUpdate'
import { ROUTES } from './utils/routes'
export const StateContext = createContext({
    setuserDetails: () => {},
    saveUsertoLocal: () => {},
    userDetails: {},
})
export const App = () => {
    const [userDetails, setuserDetails] = useState({
        username: '',
        email: '',
        isProfileCompleted: false,
    })
    const navigate = useNavigate()
    const saveUsertoLocal = () => {
        localStorage.setItem('userDetails', JSON.stringify(userDetails))
    }
    useEffect(() => {
        let user
        try {
            user = JSON.parse(localStorage.getItem('userDetails'))
        } catch (err) {}
        if (!user) navigate(ROUTES.HOME)
        else if (!user.isProfileCompleted) {
            navigate(ROUTES.PROFILE_UPDATE)
            setuserDetails(user)
        } else {
            setuserDetails(user)
        }
        //eslint-disable-next-line
    }, [])

    return (
        <StateContext.Provider
            value={{ saveUsertoLocal, setuserDetails, userDetails }}
        >
            <Routes>
                <Route path='/' element={<Home />} />
                <Route
                    path={ROUTES.LOAN_REQUESTS}
                    element={LoanRequestsScreen}
                />
                <Route path={ROUTES.MY_LOANS} element={MyLoansScreen} />
                <Route path={ROUTES.APPLY_LOANS} element={ApplyLoanScreen} />
                <Route path={ROUTES.LEADINGS} element={LeandingLoansScreen} />
                <Route
                    path={ROUTES.PROFILE_UPDATE}
                    element={<ProfileUpdateScreen />}
                />
            </Routes>
        </StateContext.Provider>
    )
}
