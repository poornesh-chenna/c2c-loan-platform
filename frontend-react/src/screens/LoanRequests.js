import {
    Box,
    Button,
    Card,
    CircularProgress,
    Grid,
    Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { headerWrapper } from '../components/Header'
import { Axios } from '../utils/Axios'
import { API_ROUTES } from '../utils/routes'

const LoanRequests = () => {
    const [loanRequests, setloanRequests] = useState([])

    const fetchLoanRequests = async () => {
        try {
            const res = await Axios.get(API_ROUTES.LOAN_REQUESTS)
            setloanRequests(res.data)
        } catch (err) {
            console.log(err.response.data.message)
        }
    }
    useEffect(() => {
        fetchLoanRequests()
    }, [])
    const LoanCard = ({ loanRequest }) => {
        const [loadingState, setloadingState] = useState({
            btnName: '',
            loading: false,
        })
        const Loading = (btnName) => {
            if (loadingState.loading) {
                return (
                    <CircularProgress sx={{ color: 'white' }} size='1.5rem' />
                )
            }
            return btnName
        }
        const loadingOn = (btnName) => {
            setloadingState({
                btnName,
                loading: true,
            })
        }
        const loadingOff = () => {
            setloadingState({
                btnName: '',
                loading: false,
            })
        }
        const acceptHandler = async (loanId) => {
            loadingOn()
            try {
                const res = await Axios.post(API_ROUTES.ACCEPT_LOAN, {
                    loanId,
                })
                console.log(res.data)
                loadingOff()
            } catch (err) {
                console.log(err.response.data.message)
                loadingOff()
            }
        }
        return (
            <Card
                sx={{
                    p: '1rem',
                    mb: '2rem',
                    backgroundColor: '#ebebeb',
                }}
            >
                <Grid container rowGap={'1.5rem'}>
                    {/* Loan Details */}
                    <Grid item md={4} xs={12}>
                        <Box>
                            <Typography>Loan Id : {loanRequest._id}</Typography>
                            <Typography paddingY={'0.5rem'} variant='h5'>
                                Loan Amount :
                                {Number(loanRequest.Amount).toLocaleString(
                                    'en-IN',
                                    {
                                        style: 'currency',
                                        currency: 'INR',
                                    }
                                )}
                            </Typography>
                            <Typography variant='h6'>
                                Tenure : {loanRequest.Tenure}
                            </Typography>
                            <Typography variant='h6'>
                                Interest Rate : {loanRequest.Interest_Rate}
                            </Typography>
                        </Box>
                    </Grid>
                    {/* Borrower details */}
                    <Grid item md={4} xs={12}>
                        <Box>
                            <Typography
                                textAlign={'center'}
                                variant='h5'
                                sx={{ textDecorationLine: 'underline' }}
                            >
                                User Details
                            </Typography>
                            <Typography variant='h6'>
                                Username : {loanRequest.user_id.username}
                            </Typography>
                            <Typography variant='h6'>
                                Contact mail : {loanRequest.user_id.email}
                            </Typography>
                            <Typography variant='h6'>
                                CIBIL : {loanRequest.cibil || 'No mentioned'}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                height: '100%',
                            }}
                        >
                            <Box
                                sx={{
                                    width: '8rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '100%',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Button
                                    onClick={() =>
                                        acceptHandler(loanRequest._id)
                                    }
                                    variant='contained'
                                    color='success'
                                >
                                    {Loading('Accept')}
                                </Button>
                                <Button
                                    sx={{ marginY: '0.5rem' }}
                                    variant='outlined'
                                    color='warning'
                                >
                                    {Loading('Modify')}
                                </Button>
                                <Button variant='contained' color='error'>
                                    {Loading('Reject')}
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Card>
        )
    }
    return (
        <Box>
            <Typography variant='h4' marginBottom={'1.5rem'}>
                Loan Requests
            </Typography>
            {loanRequests.map((loanRequest, index) => {
                return <LoanCard key={index} loanRequest={loanRequest} />
            })}
        </Box>
    )
}

export const LoanRequestsScreen = headerWrapper(<LoanRequests />)
