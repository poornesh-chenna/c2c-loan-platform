import { Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { headerWrapper } from '../components/Header'
import { Axios } from '../utils/Axios'
import { API_ROUTES } from '../utils/routes'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

const LendingLoans = () => {
    const [, setisLoading] = useState(false)
    const [lendings, setlendings] = useState([])
    const fetchLendings = async () => {
        setisLoading(true)
        try {
            const res = await Axios.get(API_ROUTES.LENDING_LOANS)
            console.log(res.data)
            setlendings(res.data)
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
            {lendings.length === 0 ? (
                <div>No lendings</div>
            ) : (
                lendings.map((lending, index) => {
                    return (
                        <Card
                            sx={{
                                minWidth: 275,
                                mb: '1rem',
                                backgroundColor: '#F5F5F5',
                            }}
                        >
                            <CardContent>
                                <Typography
                                    sx={{ fontSize: 14 }}
                                    color='text.secondary'
                                    gutterBottom
                                >
                                    {'Loan id : ' + lending.loan_id._id}
                                </Typography>
                                <Typography variant='body' component='div'>
                                    {'Borrower name : ' +
                                        lending.borrower_id.username}
                                </Typography>
                                <Typography
                                    variant='body'
                                    component='div'
                                    gutterBottom
                                >
                                    {'Borrower email : ' +
                                        lending.borrower_id.email}
                                </Typography>
                                <Box
                                    sx={{
                                        display: 'inline-flex',
                                        flexWrap: 'wrap',
                                    }}
                                >
                                    <Box sx={{ width: 300 }}>
                                        <Typography variant='h5'>
                                            Amount :{' '}
                                            <span>
                                                {Number(
                                                    lending.loan_id.Amount
                                                ).toLocaleString('en-US', {
                                                    style: 'currency',
                                                    currency: 'INR',
                                                })}
                                            </span>
                                        </Typography>
                                    </Box>
                                    <Box sx={{ width: 300 }}>
                                        <Typography variant='h5'>
                                            {'Period : ' +
                                                lending.loan_id.Tenure}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ width: 300 }}>
                                        <Typography variant='h5'>
                                            {'Interest Rate : ' +
                                                lending.loan_id.Interest_Rate}
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    )
                })
            )}
        </>
    )
}

export const LeandingLoansScreen = headerWrapper(<LendingLoans />)
