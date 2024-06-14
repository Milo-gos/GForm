import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import {
    AddNewSurveyPage,
    EmailVerificationResultPage,
    ForgotPasswordPage,
    HomePage,
    ProfilePage,
    ResetPasswordPage,
    ResponseSurveyPage,
    SharedSurveyPage,
    SignInPage,
    SignUpPage,
    SubmitFormPage,
    SubmitSuccessPage,
} from '../pages';
import { AuthLayout, HomeLayout, NormalLayout, SurveyLayout } from '../layouts';
import AuthRoutes from './AuthRoutes';
import ProtectedRoutes from './ProtectedRoutes';

const authPages = [
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
];

const publicPages = [
    {
        path: '/email-verification-result/:tokenLink',
        page: EmailVerificationResultPage,
        layout: AuthLayout,
    },
    {
        path: '/forgot-password',
        page: ForgotPasswordPage,
        layout: AuthLayout,
    },

    {
        path: '/reset-password/:tokenLinkResetPassword',
        page: ResetPasswordPage,
        layout: AuthLayout,
    },
    {
        path: '/surveys/:id/viewform',
        page: SubmitFormPage,
        layout: NormalLayout,
    },
    {
        path: '/surveys/:id/submitSuccess',
        page: SubmitSuccessPage,
        layout: NormalLayout,
    },
];
const protectedPages = [
    {
        path: '/',
        page: HomePage,
        layout: HomeLayout,
    },
    {
        path: '/shared-survey',
        page: SharedSurveyPage,
        layout: HomeLayout,
    },
    {
        path: '/surveys/:id/edit',
        page: AddNewSurveyPage,
        layout: SurveyLayout,
    },

    {
        path: '/surveys/:id/response',
        page: ResponseSurveyPage,
        layout: SurveyLayout,
    },

    {
        path: '/surveys/:id/response',
        page: ResponseSurveyPage,
        layout: SurveyLayout,
    },

    {
        path: '/my-profile',
        page: ProfilePage,
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
