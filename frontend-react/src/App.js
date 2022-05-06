import React from 'react'
import { Route, Routes } from 'react-router-dom'

export const App = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<div>Hello world</div>} />
            </Routes>
        </div>
    )
}
