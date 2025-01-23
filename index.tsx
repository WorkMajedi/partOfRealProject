import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { PersistGate } from 'redux-persist/integration/react';
import * as Sentry from '@sentry/react';
import { persistor, store } from './redux/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import './i18n';

// Create a query client instance
const queryClient = new QueryClient();

// Initialize Sentry for error tracking
const ENVIRONMENT = process.env.REACT_APP_ENVIRONMENT || 'develop';
const BaseUrl = process.env.REACT_APP_ROOT_BASE_DOMAIN || '';
// Filter out errors from localhost
const beforeSend = (event: any, hint: any) => {
    const request = event.request || {};
    if (request.url && request.url.includes('localhost')) {
        return null; // Ignore localhost errors
    }
    return event;
};

Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN, // Set the Sentry DSN from environment variables
    integrations: [Sentry.browserTracingIntegration()],
    tracePropagationTargets: ['localhost'],
    tracesSampleRate: 1.0, // Sampling rate for performance tracing
    replaysSessionSampleRate: 0.1, // Session Replay sampling rate
    replaysOnErrorSampleRate: 1.0, // Always capture Replay on errors
    environment: ENVIRONMENT, // Set the current environment
    // beforeSend, // Apply the beforeSend filter to exclude specific errors
});

// Get the root element
const container = document.getElementById('root');

// @ts-ignore
const root = createRoot(container);

// Render the app
root.render(
    <QueryClientProvider client={queryClient}>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
                {process.env.NODE_ENV === 'development' && (
                    <ReactQueryDevtools initialIsOpen={false} />
                )}
            </PersistGate>
        </Provider>
    </QueryClientProvider>,
);

// Report web vitals
reportWebVitals();

// Register the service worker
serviceWorkerRegistration.register();
