import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { StyledRadio } from 'component/common/RadioButton/styles';

const rows = [
    { id: 1, firstName: 'Hamed', lastName: 'xxxxxxxxx' },
    { id: 2, firstName: 'Mehdi', lastName: 'xxxxxxxxx' },
    { id: 3, firstName: 'Ali', lastName: 'xxxxxxxxx' },
    { id: 4, firstName: 'Hossein', lastName: 'xxxxxxxxx' },
];
let radioChecked = [rows[0].id];
const columns = [
    {
        field: 'radiobutton',
        headerName: '',
        width: 100,
        sortable: false,
        renderCell: (params: any) => (
            <StyledRadio
                checked={radioChecked[0] === params.id}
                value={params.id}
            />
        ),
    },
    {
        field: 'id',
        headerName: 'ID',
    },
    {
        field: 'firstName',
        headerName: 'First Name',
        width: 150,
    },
    {
        field: 'lastName',
        headerName: 'Last Name',
        width: 150,
    },
];
export default function TestPage() {
    const [selectionModel, setSelectionModel] = useState(radioChecked);
    radioChecked = selectionModel;

    return (
        <Box>
            <DataGrid
                rows={rows}
                columns={columns}
                autoHeight
                rowSelectionModel={selectionModel}
                onRowSelectionModelChange={(newSelectionModel: any) => {
                    setSelectionModel(newSelectionModel);
                }}
            />
        </Box>
    );
}
