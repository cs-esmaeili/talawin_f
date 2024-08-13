import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { setApiData } from '@/state/apiData';
import { setProductPrices } from '@/state/productPrices';
import { setboxPrices } from '@/state/boxPrices';
import { setPermissions } from '@/state/permissions';
import { setinformation } from '@/state/information';
import { setrole } from '@/state/role';
import config from "@/config.json";
import { getCookie } from 'cookies-next';
import useLogout from "@/hooks/useLogout"
import { useRouter } from 'next/navigation';
const useSocket = () => {
    const dispatch = useDispatch();
    const token = getCookie('token');
    const { push } = useRouter();

    useEffect(() => {
        if (!token) {
            useLogout(push);
            console.error('No token available for socket connection');
            return;
        }
        const socket = io(config.api, {
            query: { token }
        });

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
    }, [dispatch, token]);

    return null;
};

export default useSocket;
