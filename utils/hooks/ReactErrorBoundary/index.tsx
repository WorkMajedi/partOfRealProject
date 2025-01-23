import React, { ReactNode } from 'react';
import * as Sentry from '@sentry/react';

interface ErrorBoundaryProps {
    children: ReactNode;
}

function ErrorBoundary({ children }: ErrorBoundaryProps): JSX.Element {
    const FallbackComponent = (): JSX.Element => (
        <div>
            <h1>Unfortunately, something went wrong.</h1>
            <button onClick={() => Sentry.showReportDialog()}>
                Report Error
            </button>
        </div>
    );

    return (
        <Sentry.ErrorBoundary fallback={FallbackComponent}>
            {children}
        </Sentry.ErrorBoundary>
    );
}

export default ErrorBoundary;
