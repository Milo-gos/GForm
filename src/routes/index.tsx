import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import {
    AddNewSurveyPage,
    EmailVerificationResultPage,
    ForgotPasswordPage,
    HomePage,
    ResetPasswordPage,
    ResponseSurveyPage,
    SignInPage,
    SignUpPage,
    SubmitFormPage,
    SubmitSuccessPage,
} from '../pages';
import { AuthLayout, MainLayout, SubmitLayout, SurveyLayout } from '../layouts';

const pages = [
    // Home
    {
        path: '/',
        page: HomePage,
        layout: MainLayout,
    },

    // AUTH UI
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

    // SURVEY UI
    {
        path: '/surveys/:id/edit',
        page: AddNewSurveyPage,
        layout: SurveyLayout,
    },
    {
        path: '/surveys/:id/viewform',
        page: SubmitFormPage,
        layout: SubmitLayout,
    },
    {
        path: '/surveys/:id/response',
        page: ResponseSurveyPage,
        layout: SurveyLayout,
    },
    {
        path: '/surveys/:id/submitSuccess',
        page: SubmitSuccessPage,
        layout: SubmitLayout,
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
