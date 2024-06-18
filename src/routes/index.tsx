import { createBrowserRouter } from 'react-router-dom';
import { Fragment } from 'react';
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
    PageNotFound,
    Home,
    ClosedForm,
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
        path: '/',
        page: Home,
        layout: null,
    },
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
        path: '/surveys/:id/closedForm',
        page: ClosedForm,
        layout: NormalLayout,
    },
    {
        path: '/surveys/:id/submitSuccess',
        page: SubmitSuccess,
        layout: NormalLayout,
    },

    {
        path: '/page404',
        page: PageNotFound,
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
                const Layout = page.layout ?? Fragment;
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
                    const Layout = page.layout ?? Fragment;
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
                    const Layout = page.layout ?? Fragment;
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
