/* eslint-disable no-nested-ternary */
import { Box } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { LabelWrapper } from './GridLabel.styles';

dayjs.extend(customParseFormat);

export default function GridLabelDate({
    inputProps,
    value,
    row,
    updateRow,
    saveGridRows,
    type,
    ...restProps
}: any) {
    const isValidDate =
        dayjs(value).isValid() &&
        dayjs(value, ['MM-DD-YY H:mm:ss Z', 'YYYY-MM-DD']).isValid();
    const formattedDate = isValidDate
        ? dayjs(value).format(
              value.length === 10 ? 'MM-DD-YYYY' : 'MM-DD-YYYY - h:mm A',
          )
        : null;

    return (
        <Box width="100%" height="100%" display="flex" alignItems="center">
            <LabelWrapper p={2}>{formattedDate ?? value}</LabelWrapper>
        </Box>
    );
}
