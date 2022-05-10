import AddCardIcon from '@mui/icons-material/AddCard'
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload'
import ArticleIcon from '@mui/icons-material/Article'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import { ROUTES } from './routes'
export const menuItems = [
    {
        menuName: 'Apply Loan',
        route: ROUTES.APPLY_LOANS,
        icon: <AddCardIcon />,
    },
    {
        menuName: 'Loan Requests',
        route: ROUTES.LOAN_REQUESTS,
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
        icon: <AssuredWorkloadIcon />,
    },
]
