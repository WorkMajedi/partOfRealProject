import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeScreenPopup } from 'redux/slices/screenPopup/screenPopupSlice';
import { ScreenDataContext } from 'utils/hooks/ScreenDataProvider';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { instance } from 'api/config';
import DetailPageWrapper from 'component/PagesComponents/DetailPageWrapper';
import normalizedDataList from 'utils/normalizedDataList';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogPage() {
    const { screenData } = useContext(ScreenDataContext);
    const screenPopup = useSelector((state: any) => state?.ScreenPopup);
    const dispatch = useDispatch();

    const [normalizeKey, setNormalizeKey] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false);
    const [info, setInfo] = useState<{
        [key: string]: unknown;
        label: string;
        fields: [];
    }>({
        label: '',
        fields: [],
    });
    const [defaultValues, setDefaultValues] = useState<{
        [key: string]: unknown;
    } | null>({});

    const handleClose = () => {
        setOpen(false);
        dispatch(closeScreenPopup());
    };

    useEffect(() => {
        if (
            screenPopup?.openedScreenToggle &&
            !!screenPopup?.target?.related_screen
        ) {
            const relatedScreen = screenPopup.target.related_screen.split('.');
            setNormalizeKey(relatedScreen[1]);
            if (screenData) {
                // @ts-ignore
                setInfo(screenData[relatedScreen[0]].screens[relatedScreen[1]]);
            }
            setOpen(true);
        }
        return () => {
            dispatch(closeScreenPopup());
        };
    }, [
        dispatch,
        screenData,
        screenPopup?.openedScreenToggle,
        screenPopup?.target?.related_screen,
    ]);

    const { isFetching, isError, error } = useQuery<
        { data: { [key: string]: any } },
        AxiosError
    >({
        queryKey: ['dialog'],
        queryFn: () =>
            instance.get(
                `${screenPopup?.target?.url}${screenPopup?.target?.row?.[
                screenPopup?.target?.id_source
                ] ?? screenPopup?.target?.id
                }/`,
            ),
        enabled: !!screenPopup?.target?.id || !!screenPopup?.target?.id_source,
        refetchInterval: false,
        refetchOnWindowFocus: false,
        cacheTime: 0,
        onSuccess: ({ data }) => {
            const normalizer: { [key: string]: (data: any) => any } =
                normalizedDataList;

            if (normalizer[normalizeKey]) {
                const newData = normalizer[normalizeKey](data);
                setDefaultValues({ ...newData });
            } else {
                setDefaultValues({
                    ...data,
                });
            }
        },
    });
    return (
        <div>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar
                    sx={{
                        position: 'relative',
                        backgroundColor: 'rgb(0, 25, 36)',
                    }}
                >
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography
                            sx={{ ml: 2, flex: 1 }}
                            variant="h6"
                            component="div"
                        >
                            {info?.label}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <DetailPageWrapper
                    modalFields={info?.modals}
                    screenFields={info?.fields}
                    isLoading={isFetching}
                    isError={isError}
                    error={error}
                    listData={defaultValues}
                    inDialog
                />
            </Dialog>
        </div>
    );
}
