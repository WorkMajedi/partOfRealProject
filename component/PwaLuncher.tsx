/* eslint-disable react/jsx-no-useless-fragment */
import { Box, Button, IconButton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

declare global {
    interface WindowEventMap {
        beforeinstallprompt: BeforeInstallPromptEvent;
    }
}

interface BeforeInstallPromptEvent extends Event {
    prompt: () => void;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}
const PwaLuncher = () => {
    const [deferredPrompt, setDeferredPrompt] =
        useState<BeforeInstallPromptEvent | null>(null);
    const [isInstallable, setIsInstallable] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsInstallable(false);
        }, 30000);
        const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
            e.preventDefault(); // Prevent the mini-infobar from appearing
            setDeferredPrompt(e); // Save the event for later use
            setIsInstallable(true); // Mark the app as installable
        };

        window.addEventListener(
            'beforeinstallprompt',
            handleBeforeInstallPrompt,
        );

        return () => {
            window.removeEventListener(
                'beforeinstallprompt',
                handleBeforeInstallPrompt,
            );
        };
    }, [deferredPrompt, isInstallable]);

    const handleInstallClick = () => {
        if (deferredPrompt) {
            deferredPrompt.prompt(); // Show the install prompt
            deferredPrompt.userChoice.then(choiceResult => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                } else {
                    console.log('User dismissed the install prompt');
                }
                setDeferredPrompt(null); // Reset the prompt once used
            });
        }
    };
    return isInstallable ? (
        <Box
            sx={{
                zIndex: 1000000000,
                py: 2,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 1.5,
                background: t => t.palette.primary.main,
                color: t => t.palette.common.white,
                textAlign: 'center',
                position: 'fixed',
                width: '100%',
                bottom: 0,
            }}
        >
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 1.5,
                }}
            >
                <Typography>
                    Install this app on your device for quick access
                </Typography>
                <Button
                    sx={{
                        background: t => t.palette.primary.main,
                    }}
                    color="secondary"
                    variant="contained"
                    onClick={handleInstallClick}
                >
                    Install
                </Button>
            </Box>
            <IconButton
                onClick={() => {
                    setIsInstallable(false);
                }}
                sx={{
                    px: 5,
                }}
            >
                <CloseIcon color="secondary" />
            </IconButton>
        </Box>
    ) : (
        <></>
    );
};

export default PwaLuncher;
