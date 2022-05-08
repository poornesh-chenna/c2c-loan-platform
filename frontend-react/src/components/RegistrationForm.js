import {
    Alert,
    Box,
    Button,
    Card,
    CircularProgress,
    TextField,
    Typography,
} from '@mui/material'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Axios } from '../utils/Axios'
import { API_ROUTES, ROUTES } from '../utils/routes'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
export const RegistrationForm = ({ alreadyRegistered }) => {
    const [btnLoading, setbtnLoading] = useState(false)
    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object().shape({
            email: Yup.string()
                .email('Invalid email')
                .required('Email required'),
            username: Yup.string().required('Username required'),
            password: Yup.string()
                .required('Password required')
                .min(8, 'Password too short -  should be atleast 8 characters'),
        }),
        onSubmit: async (values) => {
            setbtnLoading(true)
            try {
                const res = await Axios.post(API_ROUTES.SIGN_UP, {
                    email: values.email,
                    username: values.username,
                    password: values.password,
                })
                setbtnLoading(false)
                alreadyRegistered()
            } catch (err) {
                setbtnLoading(false)
            }
        },
    })
    return (
        <div>
            <Card
                sx={{
                    padding: '2rem',
                    display: 'flex',
                    width: '20rem',
                    flexDirection: 'column',
                    rowGap: '1rem',
                }}
            >
                <Typography variant='h5' sx={{ alignSelf: 'center' }}>
                    Registration Form
                </Typography>
                <TextField
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name='username'
                    type='text'
                    value={formik.values.username}
                    label='Username'
                    helperText={
                        formik.touched.username && formik.errors.username
                    }
                />
                <TextField
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name='email'
                    type='text'
                    value={formik.values.email}
                    label='Email'
                    helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                    label='Password'
                    type='password'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name='password'
                    helperText={
                        formik.touched.password && formik.errors.password
                    }
                    autoComplete='current-password'
                />

                <Button
                    onClick={() => formik.handleSubmit()}
                    variant='contained'
                >
                    {btnLoading ? (
                        <CircularProgress sx={{ color: 'white' }} />
                    ) : (
                        'Sign Up'
                    )}
                </Button>
                <Typography
                    sx={{ cursor: 'pointer', alignSelf: 'center' }}
                    onClick={alreadyRegistered}
                    variant='subtitle1'
                >
                    Already registered?
                </Typography>
            </Card>
        </div>
    )
}

export const SignIn = ({ notRegistered }) => {
    const navigate = useNavigate()
    const [btnLoading, setbtnLoading] = useState(false)
    const [alertMsg, setalertMsg] = useState(null)
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object().shape({
            email: Yup.string()
                .email('Invalid email')
                .required('Email required'),
            password: Yup.string().required('Password required'),
        }),
        onSubmit: async (values) => {
            setbtnLoading(true)
            try {
                const res = await Axios.post(API_ROUTES.SIGN_IN, {
                    email: values.email,
                    password: values.password,
                })
                localStorage.setItem('jwtKey', res.data.jwtToken)
                formik.resetForm()
                setbtnLoading(false)
                navigate(ROUTES.DASHBOARD)
            } catch (err) {
                setbtnLoading(false)
                setTimeout(() => {
                    setalertMsg(null)
                }, 5000)
                setalertMsg(err.response.data.message)
            }
        },
    })
    return (
        <div>
            <Card
                sx={{
                    padding: '2rem',
                    display: 'flex',
                    width: '20rem',
                    flexDirection: 'column',
                    rowGap: '1rem',
                }}
            >
                <Typography variant='h5' sx={{ alignSelf: 'center' }}>
                    Sign In
                </Typography>

                <TextField
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name='email'
                    type='text'
                    value={formik.values.email}
                    label='Email'
                    helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                    label='Password'
                    type='password'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name='password'
                    helperText={
                        formik.touched.password && formik.errors.password
                    }
                    autoComplete='current-password'
                />

                <Button
                    onClick={() => formik.handleSubmit()}
                    variant='contained'
                >
                    {btnLoading ? (
                        <CircularProgress
                            sx={{
                                color: 'white',
                            }}
                        />
                    ) : (
                        'Sign In'
                    )}
                </Button>
                {alertMsg && <Alert severity='error'>{alertMsg}</Alert>}

                <Typography
                    variant='subtitle1'
                    sx={{ alignSelf: 'center', cursor: 'pointer' }}
                    onClick={notRegistered}
                >
                    New user? Register here
                </Typography>
            </Card>
        </div>
    )
}
