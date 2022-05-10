import {
    Alert,
    AlertTitle,
    Box,
    Button,
    Card,
    CircularProgress,
    Dialog,
    Grid,
    TextField,
    Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { headerWrapper } from '../components/Header'
import { Axios } from '../utils/Axios'
import { API_ROUTES } from '../utils/routes'
const dialogInitialState = {
    open: false,
    loanId: '',
    tenure: '',
    interest_rate: '',
}
const LoanRequests = () => {
    const [loanRequests, setloanRequests] = useState([])
    const [alertMsg, setalertMsg] = useState({
        message: '',
        open: false,
        severity: '',
    })
    const [dialogState, setdialogState] = useState(dialogInitialState)
    const fetchLoanRequests = async () => {
        try {
            const res = await Axios.get(API_ROUTES.LOAN_REQUESTS)
            setloanRequests(res.data)
        } catch (err) {
            console.log(err.response.data.message)
        }
    }
    const removeLoanState = (loanId) => {
        setloanRequests((state) => {
            const newState = state.filter((loan) => loan._id !== loanId)
            return newState
        })
    }
    console.log(loanRequests)
    const modifyHandler = async () => {
        try {
            await Axios.patch(API_ROUTES.MODIFY_LOAN, {
                loanId: dialogState.loanId,
                Interest_Rate: dialogState.interest_rate,
                Tenure: dialogState.tenure,
            })
            setalertMsg({
                message: 'Loan Modified!',
                open: true,
                severity: 'success',
            })
            setdialogState(dialogInitialState)
        } catch (err) {
            setalertMsg({
                message: 'Something went wrong! Unable to modify the loan.',
                open: true,
                severity: 'error',
            })
            setdialogState(dialogInitialState)
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
                if (loadingState.btnName === btnName) {
                    return (
                        <CircularProgress
                            sx={{ color: 'white' }}
                            size='1.5rem'
                        />
                    )
                }
                return btnName
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
        const showErrorAlert = (message) => {
            setalertMsg({
                message,
                open: true,
                severity: 'error',
            })
        }
        const acceptHandler = async (loanId) => {
            loadingOn('Accept')
            try {
                await Axios.post(API_ROUTES.ACCEPT_LOAN, {
                    loanId,
                })
                setalertMsg({
                    message:
                        'Loan sanctioned! Check Lendings Tab to see your loans.',
                    open: true,
                    severity: 'success',
                })
                loadingOff()
                removeLoanState(loanId)
            } catch (err) {
                console.log(err.response.data.message)
                loadingOff()
            }
        }
        const rejectHandler = async (loanId) => {
            loadingOn('Reject')
            try {
                await Axios.post(API_ROUTES.REJECT_LOAN, {
                    loanId,
                })
                setalertMsg({
                    message: 'Loan Rejected!',
                    open: true,
                    severity: 'info',
                })
                loadingOff()
                removeLoanState(loanId)
            } catch (err) {
                showErrorAlert(err.response.data.message)
                loadingOff()
            }
        }

        return (
            <>
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
                                <Typography>
                                    Loan Id : {loanRequest._id}
                                </Typography>
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
                                    CIBIL :{' '}
                                    {loanRequest.cibil || 'No mentioned'}
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
                                        onClick={() =>
                                            setdialogState({
                                                open: true,
                                                loanId: loanRequest._id,
                                            })
                                        }
                                    >
                                        {Loading('Modify')}
                                    </Button>
                                    <Button
                                        onClick={() =>
                                            rejectHandler(loanRequest._id)
                                        }
                                        variant='contained'
                                        color='error'
                                    >
                                        {Loading('Reject')}
                                    </Button>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Card>
            </>
        )
    }

    return (
        <Box>
            <Dialog open={dialogState.open}>
                <Box sx={{ padding: '2rem' }}>
                    <Typography variant='h5' marginBottom={'1rem'}>
                        Modification Details
                    </Typography>
                    <TextField
                        fullWidth
                        sx={{ mb: '0.5rem' }}
                        value={dialogState.tenure}
                        onChange={(e) =>
                            setdialogState((state) => ({
                                ...state,
                                tenure: e.target.value,
                            }))
                        }
                        variant='outlined'
                        label='Tenure'
                    />
                    <TextField
                        fullWidth
                        value={dialogState.interest_rate}
                        onChange={(e) =>
                            setdialogState((state) => ({
                                ...state,
                                interest_rate: e.target.value,
                            }))
                        }
                        variant='outlined'
                        label='Interest Rate'
                    />
                    <Box
                        sx={{
                            marginTop: '1rem',
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Button
                            onClick={() => setdialogState(dialogInitialState)}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={() => modifyHandler()}
                            variant='outlined'
                        >
                            Modify
                        </Button>
                    </Box>
                </Box>
            </Dialog>
            <Typography variant='h4' marginBottom={'1.5rem'}>
                Loan Requests
            </Typography>

            {alertMsg.open && (
                <Alert
                    sx={{ my: '1rem' }}
                    onClose={() =>
                        setalertMsg({ message: '', open: false, severity: '' })
                    }
                    severity={alertMsg.severity}
                >
                    {alertMsg.message}
                </Alert>
            )}
            {loanRequests.length === 0 ? (
                <div>
                    <Box sx={{ m: '2rem' }}>
                        <Alert severity='info'>
                            <AlertTitle>Info</AlertTitle>
                            <strong>
                                There are no loan requests at present .
                            </strong>
                            <p>Stay Tuned!</p>
                        </Alert>
                    </Box>
                </div>
            ) : (
                loanRequests.map((loanRequest, index) => {
                    return <LoanCard key={index} loanRequest={loanRequest} />
                })
            )}
        </Box>
    )
}

export const LoanRequestsScreen = headerWrapper(<LoanRequests />)
