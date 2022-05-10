import { Fragment, useContext, useState } from 'react'
import PropTypes from 'prop-types'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItemText from '@mui/material/ListItemText'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { menuItems } from '../utils/menuItems'
import Logo from '../images/logo.svg'
import {
    Avatar,
    ListItemButton,
    Menu,
    MenuItem,
    Tooltip,
    ListItemIcon,
} from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { ROUTES } from '../utils/routes'
import { StateContext } from '../App'

const drawerWidth = 240
const Profile = () => {
    const navigate = useNavigate()
    const { userDetails } = useContext(StateContext)
    console.log(userDetails)
    const [anchorElUser, setAnchorElUser] = useState(null)
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget)
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }
    const logoutHandler = () => {
        localStorage.removeItem('jwtKey')
        localStorage.removeItem('userDetails')
        navigate(ROUTES.HOME)
    }
    const settings = [{ menuName: 'Logout', cb: logoutHandler }]
    return (
        <>
            <Tooltip title='Open settings'>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={userDetails.username} src='/' />
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: '45px' }}
                id='menu-appbar'
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                <Typography sx={{ mx: '1rem' }}>
                    Hey! {userDetails.username}
                </Typography>
                {settings.map((setting, index) => (
                    <MenuItem
                        sx={{ px: '2rem' }}
                        key={index}
                        onClick={() => {
                            handleCloseUserMenu()
                            setting.cb()
                        }}
                    >
                        <Typography textAlign='center'>
                            {setting.menuName}
                        </Typography>
                    </MenuItem>
                ))}
            </Menu>
        </>
    )
}
function Header(props) {
    const { window } = props
    const [mobileOpen, setMobileOpen] = useState(false)
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                {menuItems.map((item, index) => {
                    const isSelected = pathname === item.route
                    return (
                        <Fragment key={index}>
                            <ListItemButton
                                onClick={() => {
                                    handleDrawerToggle()
                                    navigate(item.route)
                                }}
                                selected={isSelected}
                                key={index}
                            >
                                <ListItemIcon>
                                    {(() => item.icon)()}
                                </ListItemIcon>
                                <ListItemText primary={item.menuName} />
                            </ListItemButton>
                            <Divider />
                        </Fragment>
                    )
                })}
            </List>
        </div>
    )

    const container =
        window !== undefined ? () => window().document.body : undefined

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position='fixed'
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <Box
                        sx={{
                            display: 'flex',
                            width: '100%',
                            justifyContent: 'space-between',
                        }}
                    >
                        <IconButton
                            color='inherit'
                            aria-label='open drawer'
                            edge='start'
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
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

                        <Profile />
                    </Box>
                </Toolbar>
            </AppBar>
            <Box
                component='nav'
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label='mailbox folders'
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant='temporary'
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant='permanent'
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                        },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component='main'
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                }}
            >
                <Toolbar />
                {props.children}
            </Box>
        </Box>
    )
}

Header.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
}
export const headerWrapper = (Component) => {
    return <Header>{Component}</Header>
}

// export default Header
