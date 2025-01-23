import { List } from '@mui/material';
import { UploadWrapper } from './Uploader.styles';
import UploadedAcceptedItem from './UploadedAcceptedItem';

export default function UploadFileContainer({
    inputType,
    files,
    uploadApi,
    setFilesId,
    setFiles,
    setDisabled,
}: any) {
    return (
        <UploadWrapper>
            {!!files.length ? (
                <List>
                    {files.map((file: any) => {
                        return (
                            <UploadedAcceptedItem
                                inputType={inputType}
                                uploadApi={uploadApi}
                                setFilesId={setFilesId}
                                file={file}
                                files={files}
                                setFiles={setFiles}
                                setDisabled={setDisabled}
                            />
                        );
                    })}
                </List>
            ) : (
                ''
            )}
        </UploadWrapper>
    );
}
