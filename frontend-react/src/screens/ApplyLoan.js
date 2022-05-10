import {
    Alert,
    Box,
    Button,
    Checkbox,
    CircularProgress,
    Grid,
    TextField,
    Typography,
} from '@mui/material'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Axios } from '../utils/Axios.js'
import { API_ROUTES } from '../utils/routes.js'
import { headerWrapper } from '../components/Header.js'
export const ApplyLoan = () => {
    const [isLoading, setisLoading] = useState(false)
    const [alertMsg, setalertMsg] = useState({
        message: '',
        open: false,
        severity: '',
    })
    const formik = useFormik({
        initialValues: {
            amount: '',
            tenure: '',
            interest_rate: '',
            terms_accepted: false,
        },
        validationSchema: Yup.object().shape({
            terms_accepted: Yup.bool().oneOf(
                [true],
                'You must accepts terms and conditions.'
            ),
            amount: Yup.number()
                .typeError('Amount must be number.')
                .min(500, 'Minimum loan amount is 500')
                .max(10000000, 'Maximum loan amount is 10000000')
                .required('Loan amount is required.'),
            tenure: Yup.number()
                .typeError('Tenure must in number')
                .min(1, 'Minimum tenure is 1 month.')
                .required('Tenure is required.'),
            interest_rate: Yup.number()
                .typeError('Interest rate must be in number.')
                .required('Interest rate is required'),
        }),
        onSubmit: async (values) => {
            setisLoading(true)
            try {
                await Axios.post(API_ROUTES.APPLY_LOAN, {
                    amount: values.amount,
                    Tenure: values.tenure,
                    Interest_Rate: values.interest_rate,
                })
                console.log('applied')
                setalertMsg({
                    message:
                        'Loan applied! Receipt sent to mail ( Check spam incase )',
                    open: true,
                    severity: 'success',
                })
                formik.resetForm()
                setTimeout(() => setalertMsg({ open: false }), 10000)
            } catch (err) {
                setalertMsg({
                    message: 'Something went wrong. Try again!',
                    severity: 'error',
                    open: true,
                })
                setTimeout(() => setalertMsg({ open: false }), 10000)
            }
            setisLoading(false)
        },
    })
    console.log(alertMsg)
    return (
        <Box>
            <Typography variant='h4' mt={'1rem'}>
                Apply Loan
            </Typography>
            {alertMsg.open && (
                <Alert sx={{ marginTop: '1rem' }} severity={alertMsg.severity}>
                    {alertMsg.message}
                </Alert>
            )}

            <Box sx={{ padding: '2rem' }}>
                <Grid container rowGap={'1rem'} columnGap={'1rem'}>
                    <Grid wrap='wrap' item md={5} xs={12}>
                        <TextField
                            value={formik.values.amount}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            id='outlined-basic'
                            fullWidth
                            name='amount'
                            label='Amount'
                            variant='outlined'
                            helperText={
                                formik.touched.amount && formik.errors.amount
                            }
                        />
                    </Grid>
                    <Grid item md={5} xs={12}>
                        <TextField
                            value={formik.values.tenure}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            id='outlined-basic'
                            fullWidth
                            name='tenure'
                            label='Tenure'
                            variant='outlined'
                            helperText={
                                formik.touched.tenure && formik.errors.tenure
                            }
                        />
                    </Grid>
                    <Grid item md={5} xs={12}>
                        <TextField
                            value={formik.values.interest_rate}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            id='outlined-basic'
                            fullWidth
                            name='interest_rate'
                            label='Interest Rate'
                            variant='outlined'
                            helperText={
                                formik.touched.interest_rate &&
                                formik.errors.interest_rate
                            }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Checkbox
                                onChange={(e) =>
                                    formik.setFieldValue(
                                        'terms_accepted',
                                        e.target.checked
                                    )
                                }
                                checked={formik.values.terms_accepted}
                            />
                            <Typography>
                                I accept terms and conditions.
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Button
                            type='submit'
                            onClick={() => formik.handleSubmit()}
                            fullWidth
                            variant='contained'
                        >
                            {isLoading ? (
                                <CircularProgress
                                    size={'1.5rem'}
                                    sx={{ color: 'white' }}
                                />
                            ) : (
                                'Apply for loan'
                            )}
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export const ApplyLoanScreen = headerWrapper(<ApplyLoan />)
