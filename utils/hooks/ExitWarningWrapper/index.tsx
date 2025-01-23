import React, { useEffect, useRef, useState } from 'react';
import {
    useNavigate,
    useBlocker,
    unstable_usePrompt as usePrompt,
} from 'react-router-dom';
import ConfirmModal from '../../../component/common/ConfirmModal';
import { useFormContext } from 'react-hook-form';
import { isEmptyObject } from '../../utils';
interface ExitWarningWrapperProps {
    children: React.ReactNode;
    iqnoreOpen?: boolean;
}

const ExitWarningWrapper: React.FC<ExitWarningWrapperProps> = ({
    children,
    iqnoreOpen,
}) => {
    const {
        formState: { dirtyFields, isDirty, isSubmitted, isSubmitting },
    } = useFormContext();
    console.log(isSubmitted, dirtyFields, '--  check step field --');
    // usePrompt({
    //     when: ({ currentLocation, nextLocation }) =>
    //         !isEmptyObject(dirtyFields) &&
    //         !!iqnoreOpen &&
    //         !isSubmitting &&
    //         currentLocation.pathname !== nextLocation.pathname,
    //     message: 'Unsaved changes will be lost. Are you sure?',
    // });

    return <>{children}</>;
};

export default ExitWarningWrapper;
