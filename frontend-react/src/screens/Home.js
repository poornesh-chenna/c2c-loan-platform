import { Box } from '@mui/material'
import React, { useState } from 'react'
import { RegistrationForm, SignIn } from '../components/RegistrationForm'
const formScreens = {
    signIn: 'signIn',
    signUp: 'signUp',
}
export const Home = () => {
    const [formScreen, setformScreen] = useState(formScreens.signUp)
    return (
        <Box
            sx={{
                backgroundColor: 'gray',
                height: '100vh',
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
            }}
        >
            <Box sx={{ marginRight: '3rem' }}>
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
        </Box>
    )
}
