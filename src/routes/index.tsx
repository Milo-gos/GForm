import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { ForgotPasswordPage, SignInPage, SignUpPage } from '../pages';
import { AuthLayout, MainLayout } from '../layouts';

const pages = [
    {
        path: '/signin',
        page: SignInPage,
        layout: AuthLayout,
    },
    {
        path: '/signup',
        page: SignUpPage,
        layout: AuthLayout,
    },
    {
        path: '/forgot-password',
        page: ForgotPasswordPage,
        layout: AuthLayout,
    },
];

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: pages.map((page) => {
            const Layout = page.layout;
            const Page = page.page;
            return {
                path: page.path,
                element: (
                    <Layout>
                        <Page />
                    </Layout>
                ),
            };
        }),
    },
]);
export default router;
