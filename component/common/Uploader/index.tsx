import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { generateRandomId } from 'utils/utils';
import { UploaderContainer } from './Uploader.styles';
import UploadImageInput from './UploadImageInput';
import UploadFileInput from './UploadFileInput';
import UploadFileContainer from './UploadFileContainer';

export interface FileType extends File {
    id: string | number;
    default: boolean;
}

// eslint-disable-next-line react/prop-types
export default function Uploader({
    inputType,
    uploadApi,
    setFilesId,
    accept,
    multi,
    defaultFile,
}: any) {
    const [files, setFiles] = useState<FileType[]>(() => {
        return defaultFile.map((file: any) => ({
            ...file,
            uploaded: true,
        }));
    });
    const [disabled, setDisabled] = useState<boolean>(false);

    const onDrop = useCallback(
        async (acceptedFiles: File[]) => {
            setFiles((prevState: FileType[]) => {
                const newImage = acceptedFiles.map((file: any) =>
                    Object.assign(file, {
                        id: generateRandomId(),
                        preview: URL.createObjectURL(file),
                        default: false,
                        uploaded: false,
                    }),
                );
                return [...(multi ? [...prevState] : []), ...newImage];
            });
        },
        [multi],
    );

    const { getRootProps, getInputProps, open } = useDropzone({
        onDrop,
        multiple: false,
        ...(accept.includes('image')
            ? {
                  accept: { 'image/*': ['.jpeg', '.png'] },
              }
            : {}),
    });

    return (
        <UploaderContainer>
            {inputType === 'image' ? (
                <UploadImageInput
                    getRootProps={getRootProps}
                    getInputProps={getInputProps}
                    open={open}
                    disabled={disabled}
                />
            ) : (
                <UploadFileInput
                    getRootProps={getRootProps}
                    getInputProps={getInputProps}
                    open={open}
                    disabled={disabled}
                />
            )}

            <UploadFileContainer
                inputType={inputType}
                files={files}
                setFiles={setFiles}
                uploadApi={uploadApi}
                setFilesId={setFilesId}
                setDisabled={setDisabled}
            />
        </UploaderContainer>
    );
}
