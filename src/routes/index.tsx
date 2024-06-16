import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import {
    EmailVerificationResult,
    ForgotPassword,
    UserSurveyManagement,
    Profile,
    ResetPassword,
    MySurvey,
    SignIn,
    SignUp,
    FillSubmit,
    SubmitSuccess,
} from '../pages';
import { AuthLayout, NormalLayout, UnitSurveyLayout, UserSurveyManagementLayout } from '../layouts';
import AuthRoutes from './AuthRoutes';
import ProtectedRoutes from './ProtectedRoutes';

const authPages = [
    {
        path: '/signin',
        page: SignIn,
        layout: AuthLayout,
    },
    {
        path: '/signup',
        page: SignUp,
        layout: AuthLayout,
    },
];

const publicPages = [
    {
        path: '/email-verification-result/:tokenLink',
        page: EmailVerificationResult,
        layout: AuthLayout,
    },
    {
        path: '/forgot-password',
        page: ForgotPassword,
        layout: AuthLayout,
    },

    {
        path: '/reset-password/:tokenLinkResetPassword',
        page: ResetPassword,
        layout: AuthLayout,
    },
    {
        path: '/surveys/:id/viewform',
        page: FillSubmit,
        layout: NormalLayout,
    },
    {
        path: '/surveys/:id/submitSuccess',
        page: SubmitSuccess,
        layout: NormalLayout,
    },
];
const protectedPages = [
    {
        path: '/user-survey-management',
        page: UserSurveyManagement,
        layout: UserSurveyManagementLayout,
    },
    {
        path: '/surveys/:id/edit',
        page: MySurvey,
        layout: UnitSurveyLayout,
    },

    {
        path: '/my-profile',
        page: Profile,
        layout: NormalLayout,
    },
];

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            ...publicPages.map((page) => {
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
            {
                element: <AuthRoutes />,
                children: authPages.map((page) => {
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
            {
                element: <ProtectedRoutes />,
                children: protectedPages.map((page) => {
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
        ],
    },
]);
export default router;
