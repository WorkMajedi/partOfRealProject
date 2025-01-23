import { Box, Typography, useTheme } from '@mui/material';
import React from 'react';
import CustomCheckBox from 'component/common/CheckBox';
import CustomButton from 'component/common/Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Api from 'api/api/services';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { login, saveUser } from 'redux/slices/permissions/permissionsSlice';
import { setDefaultOptions } from 'redux/slices/configOption/options.slice';
import { toast } from 'react-toastify';
import usePermissions from 'utils/hooks/usePermissions';
import SimpleTextField from 'component/common/SimpleTextField';
import loginImage from './loginFame.jpg';
import { useNavigate } from 'react-router-dom';

type LoginData = {
    username: string;
    password: number;
};

const schema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
});
const Login = () => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginData>({
        resolver: yupResolver(schema),
    });
    const { fetchPermission } = usePermissions({});
    const navigate = useNavigate();
    const onSubmit = handleSubmit(async (data: any) => {
        await Api.loginUser(data).then(async res => {
            if (res.data.access) {
                // Redirect back to the last attempted URL or default to "/"
                const lastAttemptedUrl =
                    localStorage.getItem('lastAttemptedUrl') || '/';
                localStorage.removeItem('lastAttemptedUrl'); // Clean up
                navigate(lastAttemptedUrl, { replace: true });
                dispatch(
                    login({
                        authToken: res.data.access,
                        refreshToken: res.data.refresh,
                    }),
                );
                toast.success('Successfully Login!');
                await Api.me().then(user => {
                    dispatch(saveUser(user.data.data));
                });
                await Api.option.getConfig().then(option => {
                    dispatch(setDefaultOptions(option.data.results[0]));
                });
                if (fetchPermission) {
                    fetchPermission();
                }
            }
        });
    });
    const { t } = useTranslation();

    return (
        <Box display="flex" alignItems="center">
            <Box height="100%" flex="3" m={2}>
                <Box position="absolute" top={8} left={8}>
                    <svg
                        width="16"
                        height="24"
                        viewBox="0 0 16 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M3.12247 0.0399002C1.14031 0.387054 -0.230443 2.28009 0.0677599 4.25848C0.310631 5.86965 1.50732 7.10138 3.12247 7.40256C3.44818 7.46331 4.07412 7.46318 4.40418 7.40231C6.2135 7.06868 7.50279 5.52885 7.49889 3.70628C7.49502 1.9094 6.16171 0.335649 4.39256 0.0397639C4.07522 -0.0133046 3.42582 -0.01325 3.12247 0.0399002ZM11.5763 0.351493C9.90527 0.564585 8.56432 1.82792 8.24774 3.48741C8.18281 3.82775 8.18074 4.49443 8.24354 4.83266C8.45175 5.95386 9.11363 6.91417 10.0665 7.47752C10.6651 7.83139 11.187 7.98151 11.9046 8.00608C12.5805 8.02926 13.0811 7.93013 13.6548 7.65953C14.6399 7.19484 15.3505 6.39546 15.6907 5.36908C15.84 4.91865 15.8806 4.60577 15.8638 4.03767C15.8488 3.52984 15.814 3.33115 15.6629 2.8909C15.475 2.34295 15.1199 1.80212 14.6663 1.37313C13.9793 0.723354 13.1199 0.368483 12.1626 0.339221C11.9452 0.332567 11.6813 0.338103 11.5763 0.351493ZM6.73581 7.41183C5.6598 7.53324 4.71918 8.25421 4.33317 9.25352C4.06712 9.9422 4.07268 10.7395 4.34825 11.4155C4.70388 12.2878 5.44305 12.9213 6.38129 13.1578C6.69425 13.2367 7.45646 13.2309 7.76328 13.1473C8.79075 12.8673 9.56761 12.1133 9.85498 11.1173C10.0501 10.441 9.98803 9.70291 9.68192 9.05861C9.52836 8.73538 9.37671 8.52291 9.11088 8.25844C8.68859 7.83834 8.26811 7.60539 7.69028 7.47141C7.42376 7.40962 6.99341 7.38276 6.73581 7.41183ZM1.49019 7.91955C1.06218 8.02749 0.657648 8.35861 0.466127 8.75774C0.330239 9.041 0.288706 9.2539 0.306486 9.57623C0.351346 10.3895 0.990103 11.0191 1.81348 11.0615C2.53569 11.0988 3.18047 10.6523 3.4267 9.94458C3.50425 9.72159 3.49752 9.20598 3.41385 8.9636C3.25369 8.49946 2.8809 8.12449 2.41158 7.95541C2.20048 7.87935 1.72316 7.86078 1.49019 7.91955ZM12.7253 8.68389C11.4012 8.94699 10.512 10.1462 10.6607 11.4682C10.7259 12.0479 10.9517 12.5285 11.3553 12.9464C11.8242 13.4321 12.3684 13.686 13.0374 13.7311C14.1632 13.8072 15.2402 13.0853 15.6005 12.0133C16.0538 10.6644 15.3355 9.22436 13.9799 8.76412C13.6274 8.64445 13.095 8.61042 12.7253 8.68389ZM2.19527 11.7407C1.81654 11.8017 1.3876 11.9952 1.10445 12.2328C0.775784 12.5086 0.516033 12.9098 0.392824 13.3321C0.31254 13.6072 0.319003 14.229 0.405014 14.5037C0.701745 15.4518 1.51484 16.0591 2.48742 16.0591C2.8748 16.0591 3.11379 16.0045 3.44971 15.8394C3.89419 15.6208 4.21822 15.3016 4.43082 14.8728C4.59436 14.5431 4.6398 14.3609 4.65537 13.9729C4.66952 13.6208 4.63549 13.4028 4.52128 13.1139C4.26259 12.4595 3.72239 11.9775 3.04065 11.7928C2.87687 11.7485 2.34924 11.7159 2.19527 11.7407ZM6.00949 13.9563C5.35019 14.1812 5.04204 14.9054 5.33789 15.5347C5.43779 15.7472 5.65448 15.9588 5.88295 16.0671C6.05625 16.1492 6.08622 16.1545 6.36766 16.1542C6.64942 16.1539 6.67851 16.1486 6.84691 16.0665C7.6497 15.6751 7.71665 14.5616 6.96633 14.0803C6.69539 13.9064 6.30425 13.8558 6.00949 13.9563ZM10.99 14.3141C9.48473 14.461 8.0887 15.4417 7.4269 16.8172C7.27222 17.1387 7.11127 17.6304 7.04574 17.9817C6.96892 18.3936 6.97598 19.2404 7.05954 19.6316C7.30715 20.791 7.92641 21.7476 8.86476 22.4203C9.15639 22.6293 9.72468 22.919 10.0492 23.024C10.953 23.3165 11.9656 23.3161 12.8686 23.0229C13.2068 22.9131 13.8143 22.598 14.0988 22.3849C15.0482 21.6737 15.6756 20.6639 15.8741 19.5273C15.9513 19.0857 15.9508 18.4566 15.8729 18.0108C15.4667 15.6837 13.3531 14.0836 10.99 14.3141ZM2.58371 16.7839C1.29968 17.0395 0.324266 18.0056 0.0527066 19.2907C-0.012879 19.601 -0.0181149 20.1845 0.0418257 20.5006C0.261053 21.6563 1.0856 22.5915 2.20899 22.9586C2.36909 23.0109 2.60547 23.06 2.83013 23.0877C3.16714 23.1291 3.21756 23.129 3.54235 23.0868C4.0834 23.0164 4.52703 22.8518 4.97686 22.5546C5.20951 22.4009 5.61864 21.9993 5.78775 21.7587C6.01535 21.4348 6.22239 20.9583 6.30913 20.5588C6.36787 20.2881 6.38099 19.8895 6.34213 19.556C6.17818 18.1491 5.15101 17.0508 3.7483 16.7824C3.4814 16.7313 2.84376 16.7322 2.58371 16.7839Z"
                            fill="#1E2347"
                        />
                        <path
                            d="M0.0527066 19.2907C0.324266 18.0056 1.29968 17.0395 2.58371 16.7839C2.84376 16.7322 3.4814 16.7313 3.7483 16.7824C5.15101 17.0508 6.17818 18.1491 6.34213 19.556C6.38099 19.8895 6.36788 20.2881 6.30914 20.5587C6.22239 20.9583 6.01535 21.4348 5.78775 21.7587C5.61865 21.9993 5.20951 22.4009 4.97686 22.5546C4.52703 22.8518 4.0834 23.0164 3.54235 23.0868C3.21756 23.129 3.16714 23.1291 2.83013 23.0877C2.60547 23.06 2.36909 23.0109 2.20899 22.9586C1.0856 22.5915 0.261053 21.6563 0.0418257 20.5006C-0.0181149 20.1845 -0.012879 19.601 0.0527066 19.2907Z"
                            fill="#D91C36"
                        />
                        <path
                            d="M10.6607 11.4682C10.512 10.1462 11.4012 8.94699 12.7253 8.68389C13.095 8.61042 13.6274 8.64445 13.9799 8.76412C15.3355 9.22436 16.0538 10.6644 15.6005 12.0133C15.2403 13.0854 14.1632 13.8072 13.0374 13.7311C12.3684 13.686 11.8242 13.4321 11.3553 12.9464C10.9518 12.5285 10.726 12.0479 10.6607 11.4682Z"
                            fill="#D91C36"
                        />
                        <path
                            d="M0.0677536 4.25848C-0.230449 2.28009 1.1403 0.387054 3.12246 0.0399002C3.42582 -0.01325 4.07521 -0.0133046 4.39256 0.0397639C6.16171 0.335649 7.49501 1.9094 7.49889 3.70628C7.50279 5.52885 6.21349 7.06868 4.40417 7.40231C4.07412 7.46318 3.44818 7.46332 3.12246 7.40256C1.50731 7.10138 0.310625 5.86965 0.0677536 4.25848Z"
                            fill="#D91C36"
                        />
                    </svg>
                </Box>
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    height="100%"
                >
                    <Typography variant="h2" mb="3rem" textAlign="center">
                        {t('WELCOM_BACK')}
                    </Typography>
                    <Box
                        onSubmit={onSubmit}
                        component="form"
                        display="flex"
                        width="60%"
                        flexDirection="column"
                        gap="1rem"
                    >
                        <SimpleTextField
                            nameQuery={'username'}
                            id="Filled"
                            label="username"
                            placeholder="username"
                            inputProps={{
                                ...register('username'),
                            }}
                            error={Boolean(errors.username?.message)}
                            errorMsg={errors.username?.message || ''}
                            onKeyDown={(e: any) => {
                                if (e.key === 'Enter') {
                                    onSubmit();
                                }
                            }}
                        />
                        <SimpleTextField
                            nameQuery={'password'}
                            id="Filled"
                            label="password"
                            placeholder="password"
                            type="password"
                            inputProps={{
                                ...register('password'),
                            }}
                            error={Boolean(errors.password?.message)}
                            errorMsg={errors.password?.message || ''}
                        />
                        <CustomCheckBox label="Save me for next login." />
                        <CustomButton
                            type="submit"
                            variant="contained"
                            sx={{
                                width: '100%',
                            }}
                        >
                            {t('LOG_IN')}
                        </CustomButton>
                        <Typography
                            component="p"
                            color={theme.palette.grey[800]}
                        >
                            {t("DON'T_HAVE_AN_ACCESS?")}
                            <Box
                                component="a"
                                color={theme.palette.primary.main}
                            >
                                {' '}
                                {t('CONTACT_TO_ADMIN')}
                            </Box>
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Typography color="gray" position="absolute" bottom={4} left="7.5%">
                {t('FOOTER_POWERED_BY')}{' '}
            </Typography>
            <Box
                height="100vh"
                flex="4"
                sx={{
                    backgroundImage: `url(${loginImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
        </Box>
    );
};

export default Login;
