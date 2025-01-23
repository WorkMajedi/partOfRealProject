/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-use-before-define */
const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
    window.location.hostname === '[::1]' ||
    /^127(?:\.\d{1,3}){3}$/.test(window.location.hostname)
);

function log(message) {
    console.log(`[Service Worker] ${message}`);
}

function isProduction() {
    return process.env.NODE_ENV === 'production';
}

export function register(config) {
    if (!isProduction() || !('serviceWorker' in navigator)) {
        return;
    }

    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
        return;
    }

    window.addEventListener('load', () => {
        const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

        if (isLocalhost) {
            checkValidServiceWorker(swUrl, config);
        } else {
            registerValidSW(swUrl, config);
        }
    });
}

function registerValidSW(swUrl, config) {
    navigator.serviceWorker
        .register(swUrl)
        .then(registration => {
            registration.onupdatefound = () => {
                const installingWorker = registration.installing;
                if (installingWorker) {
                    installingWorker.onstatechange = () => {
                        if (installingWorker.state === 'installed') {
                            if (navigator.serviceWorker.controller) {
                                log('New content is available.');
                                if (config?.onUpdate) config.onUpdate(registration);
                            } else {
                                log('Content is cached for offline use.');
                                if (config?.onSuccess) config.onSuccess(registration);
                            }
                        }
                    };
                }
            };
        })
        .catch(error => {
            log(`Error during service worker registration: ${error}`);
        });
}

function checkValidServiceWorker(swUrl, config) {
    fetch(swUrl, { headers: { 'Service-Worker': 'script' } })
        .then(response => {
            if (
                response.status === 404 ||
                !response.headers.get('content-type')?.includes('javascript')
            ) {
                navigator.serviceWorker.ready.then(registration => {
                    registration.unregister().then(() => window.location.reload());
                });
            } else {
                registerValidSW(swUrl, config);
            }
        })
        .catch(() => {
            log('No internet connection found. App is running in offline mode.');
        });
}

export function unregister() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready
            .then(registration => registration.unregister())
            .catch(error =>
                log(`Error during service worker unregistration: ${error}`)
            );
    }
}
