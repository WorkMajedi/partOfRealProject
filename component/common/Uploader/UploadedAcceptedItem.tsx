import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Box, ButtonBase, Divider, ListItem, Typography } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ReplayIcon from '@mui/icons-material/Replay';
import { instance } from 'api/config';
import { CancelToken } from 'api/api/services';
import { toast } from 'react-toastify';
import LinearProgressWithLabel from './LinearProgressWithLabel';
import CircularProgressWithLabel from './CircularProgressWithLabel';
import { FileType } from './index';

const uploadFiles = (apiUrl: string, data: any, options: any) => {
    return instance
        .post(apiUrl, data, {
            baseURL: process.env.REACT_APP_BASE_URL,
            headers: {
                'Content-Type': 'multipart/form-data',
                Accept: 'application/json',
            },
            ...options,
        })
        .then(res => res);
};

export default function UploadedAcceptedItem({
    inputType,
    file,
    files,
    uploadApi,
    setFilesId,
    setFiles,
    setDisabled,
}: any) {
    const [fileLoaded, setFileLoaded] = useState<number | null>();
    const [statusUpload, setStatusUpload] = useState<number>(201);
    const cancelFileUpload = useRef(null);

    const handleDelete = () => {
        const newFiles = files.filter((item: FileType) => item.id !== file.id);
        setFiles(newFiles);
        setFilesId((prevState: any) => {
            return prevState.filter((item: FileType) => item !== file.id);
        });
        setDisabled(false);
        if (cancelFileUpload.current) {
            // @ts-ignore
            cancelFileUpload.current('User has canceled the file upload.');
        }
    };

    const onFileUpload = useCallback(async () => {
        if (inputType === 'image' && file.type.split('/')[0] !== 'image') {
            return toast.error(`Please upload only Image Format`);
        }

        const formData = new FormData();
        formData.append(`file`, file);

        const fileOption = {
            onUploadProgress: (progressEvent: any) => {
                const { loaded, total } = progressEvent;
                const percentage = Math.floor(
                    ((loaded / 1000) * 100) / (total / 1000),
                );
                setFileLoaded(percentage);
            },
            cancelToken: new CancelToken(
                (cancel: any) => (cancelFileUpload.current = cancel),
            ),
        };
        setDisabled(true);
        await uploadFiles(`/api/file_management/`, formData, fileOption)
            .then(res => {
                if (!!setFilesId) {
                    setFilesId((prevState: []) => [
                        ...prevState,
                        res?.data?.id,
                    ]);
                }
                setStatusUpload(res?.status);
                setFileLoaded(null);
                setDisabled(false);
                const copy = [...files];
                const index = copy.findIndex(
                    (item: FileType) => item.id === file.id,
                );
                copy[index].uploaded = true;
                setFiles(copy);
            })
            .catch(err => {
                setStatusUpload(err?.response?.data?.status);
                setFileLoaded(null);
                setDisabled(false);
            });
    }, [file, setDisabled, uploadApi]);

    const handleReUpload = () => {
        onFileUpload();
    };

    useEffect(() => {
        if (!file?.uploaded) onFileUpload();
    }, [onFileUpload]);

    return (
        <>
            {inputType === 'image' ? (
                <ListItem className="thumb" key={file.name}>
                    {!!fileLoaded ? (
                        <CircularProgressWithLabel value={fileLoaded} />
                    ) : (
                        <>
                            <img
                                src={
                                    file?.preview
                                        ? URL.createObjectURL(file)
                                        : process.env.REACT_APP_BASE_URL +
                                          file.path
                                }
                                className="image"
                                alt="uploaded"
                            />
                            <Box className="actionWrapper">
                                <ButtonBase onClick={() => handleDelete()}>
                                    <DeleteForeverIcon />
                                </ButtonBase>
                                {/* <ButtonBase>
                                    <CheckIcon />
                                </ButtonBase> */}
                            </Box>
                        </>
                    )}
                </ListItem>
            ) : (
                <ListItem
                    className={`fileItemWrapper ${
                        statusUpload !== 201 ? 'error' : ''
                    }`}
                    key={file.id}
                >
                    <Box className="fileItem">
                        <Box className="fileName">
                            <Typography>
                                {file.name} -{' '}
                                {file?.preview
                                    ? `${(file.size / (1024 * 1024)).toFixed(
                                          2,
                                      )} MB`
                                    : file.size}
                            </Typography>
                            {statusUpload !== 201 ? (
                                <>
                                    <ButtonBase
                                        onClick={() => handleReUpload()}
                                    >
                                        <ReplayIcon fontSize="small" />
                                    </ButtonBase>
                                    <Divider orientation="vertical" flexItem />
                                    <ButtonBase onClick={() => handleDelete()}>
                                        <DeleteForeverIcon />
                                    </ButtonBase>
                                </>
                            ) : (
                                <ButtonBase onClick={() => handleDelete()}>
                                    <DeleteForeverIcon fontSize="small" />
                                </ButtonBase>
                            )}
                        </Box>
                        {!!fileLoaded ? (
                            <LinearProgressWithLabel value={fileLoaded} />
                        ) : (
                            ''
                        )}
                    </Box>
                    {statusUpload !== 201 ? (
                        <Typography className="errorMsg">
                            Something wrong! Try again.
                        </Typography>
                    ) : (
                        ''
                    )}
                </ListItem>
            )}
        </>
    );
}
