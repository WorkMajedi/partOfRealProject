import { Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React from 'react';

export default function UploadImageInput({
    getRootProps,
    getInputProps,
    open,
    disabled,
}: any) {
    return (
        <Box
            {...(!disabled
                ? {
                      ...getRootProps({
                          className: 'dropContainer',
                      }),
                      onClick: open,
                  }
                : {
                      className: 'dropContainer disabled',
                  })}
        >
            <>
                <input {...getInputProps()} />
                <p>
                    <i>
                        <AddIcon />
                    </i>
                    <span>
                        Drag and Drop <br />
                        or <br /> select file
                    </span>
                </p>
            </>
        </Box>
    );
}
