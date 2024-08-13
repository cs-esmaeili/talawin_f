import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setApiData } from '@/state/apiData';
import { setProductPrices } from '@/state/productPrices';
import { setboxPrices } from '@/state/boxPrices';
import { setPermissions } from '@/state/permissions';
import { setinformation } from '@/state/information';
import { setrole } from '@/state/role';
import { initializeSocket, getSocket } from '@/services/scoket';
import useLogout from "@/hooks/useLogout"
import { useRouter } from 'next/navigation';

const useSocket = () => {
    const dispatch = useDispatch();
    const { push } = useRouter();

    useEffect(() => {
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

        socket.on('information', (data) => {
            if (data.permissions != null && data.permissions.length > 0)
                dispatch(setPermissions(data.permissions));

            if (data.information != null)
                dispatch(setinformation(data.information));

            if (data.information.role_id != null)
                dispatch(setrole(data.information.role_id));
        });

        socket.on("disconnect", () => {
            useLogout(push);
            dispatch(setApiData(null));
            dispatch(setProductPrices(null));
            dispatch(setboxPrices(null));
        });

        return () => {
            socket.disconnect();
        };
    }, [dispatch, push]);

    return null;
};

export default useSocket;
