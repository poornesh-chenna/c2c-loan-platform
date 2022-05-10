import {
    Box,
    Card,
    Grid,
    TextField,
    Typography,
    Button,
    CircularProgress,
    Alert,
} from '@mui/material'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Axios } from '../utils/Axios'
import { API_ROUTES, ROUTES } from '../utils/routes'
import { StateContext } from '../App'
export const ProfileUpdateScreen = () => {
    const [isLoading, setisLoading] = useState(false)
    const [alertMsg, setalertMsg] = useState({
        message: '',
        open: false,
        severity: '',
    })
    const navigate = useNavigate()
    const { setuserDetails, userDetails } = useContext(StateContext)
    const [formState, setformState] = useState({
        salary: '',
        bankAccNo: '',
        bankName: '',
        AccHolderName: '',
        aadharFile: { url: '', file: null },
        panFile: { url: '', file: null },
        profilePic: { url: '', file: null },
    })
    const fileSelect = (file, key) => {
        if (!file) return
        setformState((state) => ({
            ...state,
            [key]: {
                file,
                url: URL.createObjectURL(file),
            },
        }))
    }
    const textUpdate = (value, field) => {
        setformState((state) => ({ ...state, [field]: value }))
    }
    const submitHandler = async () => {
        let isNotValid = false
        if (
            !formState.AccHolderName ||
            !formState.salary ||
            !formState.bankAccNo ||
            !formState.bankName
        ) {
            isNotValid = true
        }
        if (
            !formState.aadharFile.file ||
            !formState.profilePic.file ||
            !formState.panFile.file
        ) {
            isNotValid = true
        }
        if (isNotValid) {
            setalertMsg({
                message: 'Please fill up complete details. Try again!',
                severity: 'error',
                open: true,
            })
            return
        }
        setisLoading(true)
        try {
            const formData = new FormData()
            formData.append('aadhar', formState.aadharFile.file)
            formData.append('profile', formState.profilePic.file)
            formData.append('pan', formState.panFile.file)
            formData.append('salary', formState.salary)
            formData.append('bankName', formState.bankName)
            formData.append('accountNo', formState.bankAccNo)
            formData.append('customer_name', formState.AccHolderName)
            await Axios.patch(API_ROUTES.PROFILE_UPLOAD, formData, {})
            setalertMsg({
                message: 'Profile Updated',
                open: true,
                severity: 'success',
            })
            setisLoading(false)
            setuserDetails((state) => ({ ...state, isProfileCompleted: true }))
            localStorage.setItem(
                'userDetails',
                JSON.stringify({
                    ...userDetails,
                    isProfileCompleted: true,
                })
            )
            navigate(ROUTES.APPLY_LOANS)
        } catch (err) {
            setisLoading(false)
            setalertMsg({
                message: 'Something went wrong. Try again!',
                severity: 'error',
                open: true,
            })
            console.err(err.response)
        }
    }
    return (
        <>
            <Box sx={{ paddingX: '4rem' }}>
                <Card
                    sx={{
                        p: '2rem',
                        m: '4rem',
                        marginX: 'auto',
                        maxWidth: '50rem',
                    }}
                >
                    <Typography mb={'2rem'} variant='h4'>
                        Fill Details to Continue
                    </Typography>
                    {alertMsg.open && (
                        <Alert
                            onClose={() =>
                                setalertMsg((state) => ({ open: false }))
                            }
                            sx={{ marginTop: '1rem' }}
                            severity={alertMsg.severity}
                        >
                            {alertMsg.message}
                        </Alert>
                    )}
                    <Typography mb='1rem' variant='h5'>
                        Financial Details
                    </Typography>
                    <Grid container rowSpacing={'1rem'} columnSpacing={'1rem'}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                onChange={(e) =>
                                    textUpdate(e.target.value, 'salary')
                                }
                                value={formState.salary}
                                fullWidth
                                variant='outlined'
                                label='Salary'
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                onChange={(e) =>
                                    textUpdate(e.target.value, 'bankAccNo')
                                }
                                value={formState.bankAccNo}
                                fullWidth
                                variant='outlined'
                                label='Bank Account No.'
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                onChange={(e) =>
                                    textUpdate(e.target.value, 'bankName')
                                }
                                value={formState.bankName}
                                fullWidth
                                variant='outlined'
                                label='Bank Name'
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                onChange={(e) =>
                                    textUpdate(e.target.value, 'AccHolderName')
                                }
                                value={formState.AccHolderName}
                                fullWidth
                                variant='outlined'
                                label='Account Holder Name'
                            />
                        </Grid>
                    </Grid>
                    <Typography my='1rem' variant='h5'>
                        Document Uploads
                    </Typography>
                    <Box
                        sx={{
                            height: '100px',
                            mb: '1rem',
                            border: '1px solid gray',
                            borderRadius: '10px',
                            p: '0.5rem',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'start',
                        }}
                    >
                        <Box>
                            <Typography variant='button'>
                                Profile Pic :{' '}
                            </Typography>
                            <Button
                                variant='outlined'
                                sx={{ minWidth: '5rem' }}
                            >
                                <input
                                    type='file'
                                    onChange={(e) =>
                                        fileSelect(
                                            e.target.files[0],
                                            'profilePic'
                                        )
                                    }
                                />
                            </Button>
                        </Box>
                        {formState.profilePic.url && (
                            <img
                                style={{ objectFit: 'cover' }}
                                width={'100px'}
                                height={'100px'}
                                src={formState.profilePic.url}
                                alt='aadhar'
                            />
                        )}
                    </Box>
                    <Box
                        sx={{
                            mb: '1rem',
                            height: '100px',
                            border: '1px solid gray',
                            borderRadius: '10px',
                            p: '0.5rem',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'start',
                        }}
                    >
                        <Box>
                            <Typography variant='button'>
                                Pan Card :{' '}
                            </Typography>
                            <Button
                                variant='outlined'
                                sx={{ minWidth: '5rem' }}
                            >
                                <input
                                    type='file'
                                    onChange={(e) =>
                                        fileSelect(e.target.files[0], 'panFile')
                                    }
                                />
                            </Button>
                        </Box>
                        {formState.panFile.url && (
                            <img
                                style={{ objectFit: 'cover' }}
                                width={'100px'}
                                height={'100px'}
                                src={formState.panFile.url}
                                alt='pan'
                            />
                        )}
                    </Box>
                    <Box
                        sx={{
                            height: '100px',
                            mb: '1rem',
                            border: '1px solid gray',
                            borderRadius: '10px',
                            p: '0.5rem',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'start',
                        }}
                    >
                        <Box>
                            <Typography variant='button'>Aadhar : </Typography>
                            <Button
                                variant='outlined'
                                sx={{ minWidth: '5rem' }}
                            >
                                <input
                                    type='file'
                                    onChange={(e) =>
                                        fileSelect(
                                            e.target.files[0],
                                            'aadharFile'
                                        )
                                    }
                                />
                            </Button>
                        </Box>
                        {formState.aadharFile.url && (
                            <img
                                style={{ objectFit: 'cover' }}
                                width={'100px'}
                                height={'100px'}
                                src={formState.aadharFile.url}
                                alt='aadhar'
                            />
                        )}
                    </Box>
                    <Button onClick={submitHandler} variant='contained'>
                        {isLoading ? (
                            <CircularProgress
                                sx={{ color: 'white' }}
                                size={'1.5rem'}
                            />
                        ) : (
                            'SUBMIT AND CONTINUE'
                        )}
                    </Button>
                </Card>
            </Box>
        </>
    )
}
