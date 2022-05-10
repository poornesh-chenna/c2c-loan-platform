import { Box, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import BgImage from '../images/loan-bg.jpg'
import Logo from '../images/logo.svg'
import C2C from '../images/c2c.webp'
import { RegistrationForm, SignIn } from '../components/RegistrationForm'
const formScreens = {
    signIn: 'signIn',
    signUp: 'signUp',
}
export const Home = () => {
    const [formScreen, setformScreen] = useState(formScreens.signUp)
    const Header = () => {
        return (
            <Box sx={{ padding: '0.5rem' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                        component='img'
                        sx={{ width: '5rem', pr: '0.5rem' }}
                        src={Logo}
                        alt='logo'
                    />
                    <Typography variant='h5' color='white'>
                        C2C Loan Platform
                    </Typography>
                </Box>
            </Box>
        )
    }
    const Forms = () => {
        return (
            <Box sx={{ mt: '3rem' }}>
                {formScreen === formScreens.signUp ? (
                    <RegistrationForm
                        alreadyRegistered={() =>
                            setformScreen(formScreens.signIn)
                        }
                    />
                ) : (
                    <SignIn
                        notRegistered={() => setformScreen(formScreens.signUp)}
                    />
                )}
            </Box>
        )
    }
    const IntroText = () => {
        return (
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}
            >
                <Box
                    sx={{ width: '10rem' }}
                    component={'img'}
                    alt='c2cloan'
                    src={C2C}
                />
                <Typography variant='h4' color='white'>
                    Customer to Customer Loans
                </Typography>
                <Typography variant='h6' color='white'>
                    Apply Here at our website
                </Typography>
            </Box>
        )
    }
    return (
        <Box
            sx={{
                backgroundImage: `url(${BgImage})`,
                // objectPosition: '50% 50%',
                backgroundPositionX: 'center',
                backgroundPositionY: 'center',
                backgroundSize: 'cover',
                minHeight: '100vh',
            }}
        >
            <Header />
            <Grid
                justifyContent={'space-between'}
                alignItems='center'
                container
                sx={{
                    marginTop: '5rem',
                    // marginX: '2rem',
                    px: '2rem',
                }}
            >
                <Grid item md={6} xs={12}>
                    <IntroText />
                </Grid>
                <Grid sx={{ mb: '4rem' }} item md={6} xs={12}>
                    <Forms />
                </Grid>
            </Grid>
        </Box>
    )
}
