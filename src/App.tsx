import React from 'react';
import { Provider } from 'react-redux';
import { Outlet } from 'react-router-dom';
import store from './redux/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { LoadingLayout } from './layouts';

function App() {
    const client = new QueryClient();
    return (
        <QueryClientProvider client={client}>
            <Provider store={store}>
                <LoadingLayout>
                    <Outlet />
                </LoadingLayout>
            </Provider>
            <ReactQueryDevtools initialIsOpen={false} position="bottom" />
        </QueryClientProvider>
    );
}

export default App;
