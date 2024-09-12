import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setApiData } from '@/state/apiData';
import { setProductPrices } from '@/state/productPrices';
import { setboxPrices } from '@/state/boxPrices';
import { initializeSocket } from '@/services/scoket';
import useLogout from "@/hooks/useLogout"
import { useRouter } from 'next/navigation';

const useSocket = (connect) => {
    const dispatch = useDispatch();
    const { push } = useRouter();

    useEffect(() => {
        if (!connect) {
            return;
        }
        const socket = initializeSocket();

        if (!socket) {
            useLogout(push);
            return;
        }

        socket.on('apiData', (data) => {
            if (data != null && data.length > 0) {
                dispatch(setApiData(data));
            }
        });

        socket.on('productPrices', (data) => {
            if (data != null && data.length > 0)
                dispatch(setProductPrices(data));
        });

        socket.on('boxPrices', (data) => {
            if (data != null && data.length > 0)
                dispatch(setboxPrices(data));
        });

        return () => {
            socket.disconnect();
        };
    }, [dispatch, push, connect]);

    return null;
};

export default useSocket;
