import React from 'react';
import { Provider } from 'react-redux';
import { Outlet } from 'react-router-dom';
import store from './redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { LoadingLayout } from './layouts';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
    const client = new QueryClient();
    return (
        <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID!}>
            <QueryClientProvider client={client}>
                <Provider store={store}>
                    <LoadingLayout>
                        <Outlet />
                    </LoadingLayout>
                </Provider>
                <ReactQueryDevtools initialIsOpen={false} position="bottom" />
            </QueryClientProvider>
        </GoogleOAuthProvider>
    );
}

export default App;
