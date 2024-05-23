import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import {
    AddNewSurveyPage,
    AddNewSurveyQuestionPage,
    EmailVerificationResultPage,
    ForgotPasswordPage,
    ResetPasswordPage,
    ResponseSurveyPage,
    SignInPage,
    SignUpPage,
} from '../pages';
import { AuthLayout, SurveyLayout } from '../layouts';

const pages = [
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
        page: AddNewSurveyQuestionPage,
        layout: SurveyLayout,
    },
    {
        path: '/surveys/:id/response',
        page: ResponseSurveyPage,
        layout: SurveyLayout,
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
