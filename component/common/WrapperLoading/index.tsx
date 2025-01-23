import React, { FunctionComponent } from 'react';
import { CircularProgress } from '@mui/material';
import { LoadingWrapper } from './wrapperLoading.style';
import Loader from '../Loader';

interface OwnProps {
    children: React.ReactNode;
    isLoading: boolean;
    isError?: React.ReactNode | boolean;
    type?: 'circular' | 'page';
}

type Props = OwnProps;

const WrapperLoading: FunctionComponent<Props> = ({
    children,
    isError,
    isLoading,
    type = 'circular',
}) => {
    if (!isLoading && !isError) {
        return <>{children}</>;
    }
    return (
        <LoadingWrapper className="loading-container">
            <div className="loading-body">{children}</div>
            <>
                {isError ? (
                    <div className="loading-Icon-error">{isError}</div>
                ) : (
                    <>
                        {type === 'circular' ? (
                            <div className="loading-Icon">
                                <CircularProgress size={60} />
                            </div>
                        ) : (
                            <Loader />
                        )}
                    </>
                )}
            </>
        </LoadingWrapper>
    );
};

export default WrapperLoading;
