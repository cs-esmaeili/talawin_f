// src/hooks/useSocket.js
import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { setApiData } from '@/state/apiData';
import { setProductPrices } from '@/state/productPrices';
import { setboxPrices } from '@/state/boxPrices';
import config from "@/config.json";

const useSocket = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const socket = io(config.api);

        socket.on('apiData', (data) => {
            dispatch(setApiData(data));
        });
        
        socket.on('productPrices', (data) => {
            dispatch(setProductPrices(data));
        });

        socket.on('boxPrices', (data) => {
            dispatch(setboxPrices(data));
        });

        socket.on("disconnect", () => {
            dispatch(setApiData(null));
            dispatch(setProductPrices(null));
            dispatch(setboxPrices(null));
        });

        return () => {
            socket.disconnect();
        };
    }, [dispatch]);

    return null;
};

export default useSocket;
