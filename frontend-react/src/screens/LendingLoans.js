import { Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { headerWrapper } from '../components/Header'
import { Axios } from '../utils/Axios'
import { API_ROUTES } from '../utils/routes'

const LendingLoans = () => {
    const [isLoading, setisLoading] = useState(false)
    const [leadings, setleadings] = useState([])
    const fetchLendings = async () => {
        setisLoading(true)
        try {
            const res = await Axios.get(API_ROUTES.LENDING_LOANS)
            console.log(res.data)
            setisLoading(false)
        } catch (err) {
            console.log(err.response.data.message)
            setisLoading(false)
        }
    }
    useEffect(() => {
        fetchLendings()
    }, [])

    return (
        <>
            <Typography variant='h4'>My Lendings</Typography>
        </>
    )
}

export const LeandingLoansScreen = headerWrapper(<LendingLoans />)
