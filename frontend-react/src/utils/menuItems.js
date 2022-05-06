import DashboardIcon from '@mui/icons-material/Dashboard'
import AddCardIcon from '@mui/icons-material/AddCard'
import CommentBankIcon from '@mui/icons-material/CommentBank'
import ArticleIcon from '@mui/icons-material/Article'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import { ROUTES } from './routes'
export const menuItems = [
    {
        menuName: 'Dashboard',
        route: ROUTES.DASHBOARD,
        icon: <DashboardIcon />,
    },
    {
        menuName: 'Apply Loan',
        route: ROUTES.APPLY_LOANS,
        icon: <AddCardIcon />,
    },
    {
        menuName: 'Loan Request',
        route: ROUTES.LOAN_REQUEST,
        icon: <ArticleIcon />,
    },
    {
        menuName: 'My Loans',
        route: ROUTES.MY_LOANS,
        icon: <AccountBalanceWalletIcon />,
    },
    {
        menuName: 'Lendings',
        route: ROUTES.LEADINGS,
        icon: <CommentBankIcon />,
    },
]
