import { useEffect, useState, useRef } from 'react';
import { getToken } from 'api/config/instance';

const baseUrl = process.env.REACT_APP_SOCKET_BASE_URL;

type IProps = {
    type?: string;
    id: number;
    location: any;
    onBlocking?: () => void;
    disBlocking?: () => void;
};

const useSocketBlock: ({
    type,
    id,
    location,
    disBlocking,
    ignoreBlockDynamic,
}: {
    type: any;
    id: any;
    location: any;
    onBlocking?: () => void;
    disBlocking: any;
    ignoreBlockDynamic?: string[];
}) => {
    isBlock: boolean;
    closeConnectionSocket: () => Promise<void>;
    type: string | undefined;
} = ({ type, id, location, disBlocking, ignoreBlockDynamic }) => {
    const [isBlock, setIsBlock] = useState<boolean>(false);
    const [status, setStatus] = useState<string>('');
    const [configSocket, setConfigSocket] = useState<WebSocket | null>(null);
    const accessToken = getToken();
    const { pathname } = location;
    const socketRef = useRef<WebSocket | null>(null);
    const ignore =
        ignoreBlockDynamic &&
        ignoreBlockDynamic?.length > 0 &&
        !!ignoreBlockDynamic.filter((e: string) => pathname.includes(e))?.[0];

    useEffect(() => {
        if (id && type && !socketRef.current && !ignore) {
            try {
                const socket = new WebSocket(
                    `${baseUrl}/${type}/${id}/?Authorization=JWT ${accessToken}`,
                );
                socketRef.current = socket;
                setConfigSocket(socket);
                openConnection(socket);
            } catch (error) {
                console.error('WebSocket connection failed:', error);
                setIsBlock(true);
            }
        }

        return () => {
            if (socketRef.current && id) {
                closeConnection(socketRef.current);
            }
        };
    }, [id, pathname]);

    async function closeConnection(socketObj: WebSocket | any) {
        const socket = socketObj || configSocket;
        if (socket) {
            try {
                await socket.close();
                socket.onclose = () => {};
                setIsBlock(false);
            } catch (error) {
                console.error('Error closing WebSocket:', error);
            }
        }
    }

    function closeConnectionWithPromise(socketObj: WebSocket | null) {
        return new Promise<void>(resolve => {
            try {
                closeConnection(socketObj);
                resolve();
            } catch (error) {
                console.error('Error closing WebSocket with promise:', error);
                resolve();
            }
        });
    }

    function openConnection(socket: WebSocket) {
        socket.onmessage = function (event: any) {
            try {
                const data = JSON.parse(event.data);

                if (data.code === 400 || data.status == 'fail') {
                    alert(`${data.message}`);
                    setStatus(data.status);
                    if (disBlocking) {
                        disBlocking();
                    }
                    setIsBlock(true);
                } else if (data.status === 'success') {
                    setStatus(data.status);
                    setIsBlock(false);
                }
            } catch (error) {
                console.error('Error parsing WebSocket message:', error);
            }
        };

        socket.onerror = function (error) {
            console.error('WebSocket error:', error);
            setIsBlock(true);
        };
    }

    useEffect(() => {
        return () => {
            if (socketRef.current) closeConnection(socketRef.current);
        };
    }, []);

    return {
        type,
        isBlock,
        closeConnectionSocket: () =>
            closeConnectionWithPromise(socketRef.current),
    } as const;
};

export default useSocketBlock;
