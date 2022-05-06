import React from 'react'
import { Route, Routes } from 'react-router-dom'
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
            </Routes>
        </Header>
    )
}
