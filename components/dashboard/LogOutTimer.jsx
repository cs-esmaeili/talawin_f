import { MdAvTimer } from "react-icons/md";
import { useSelector } from 'react-redux';
import { getCookie } from 'cookies-next';
import { useEffect, useState } from "react";
import useLogout from "@/hooks/useLogout";
import { useRouter } from 'next/navigation';

const LogOutTimer = () => {
    const logOutTime = useSelector((state) => state.logOutTime.value);
    const sessionTime = parseInt(getCookie('sessionTime'));
    const { push } = useRouter();
    const [time, setTime] = useState(null);

    useEffect(() => {
        let timer;

        if (logOutTime != null) {
            // Convert sessionTime to seconds
            const sessionDuration = sessionTime * 60;
            // Calculate the end time based on logOutTime
            const endTime = Date.now() + sessionDuration * 1000;

            // Function to update the time
            const updateTime = () => {
                const now = Date.now();
                const timeRemaining = Math.max(0, endTime - now);

                // Format time as MM:SS
                const minutes = Math.floor(timeRemaining / 60000);
                const seconds = Math.floor((timeRemaining % 60000) / 1000);
                setTime(`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);

                if (timeRemaining <= 0) {
                    clearInterval(timer);
                    useLogout(push);
                }
            };

            updateTime(); // Initial call to set time immediately
            timer = setInterval(updateTime, 1000); // Update every second

            // Cleanup interval on component unmount or when logOutTime changes
            return () => clearInterval(timer);
        }
    }, [logOutTime, sessionTime]); // Dependency array

    return (
        <>
            <MdAvTimer className="text-2xl text-accent" />
            <span className="text-md">{time || '00:00'}</span>
        </>
    );
};

export default LogOutTimer;
