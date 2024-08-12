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
            dispatch(setApiData(data));
        });

        socket.on('productPrices', (data) => {
            dispatch(setProductPrices(data));
        });

        socket.on('boxPrices', (data) => {
            dispatch(setboxPrices(data));
        });

        socket.on('information', (data) => {
            dispatch(setPermissions(data.permissions));
            dispatch(setinformation(data.information));
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
