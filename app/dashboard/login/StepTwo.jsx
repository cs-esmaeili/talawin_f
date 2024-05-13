import Input from '@/components/dashboard/Input';
import { useState } from 'react';
import { FaArrowRightToBracket } from "react-icons/fa6";
import { logInStepTwo as RlogInStepTwo } from '@/services/Authorization';
import Timer from '@/components/dashboard/Timer';
import { setCookie } from 'cookies-next';

const StepTwo = ({ timer, setTimer, goToPrevious, setUserName, userName, goToDashboard }) => {

    const [code, setCode] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);



    const logInStepTwo = async () => {
        try {
            if (code.length != 4) {
                setErrorMessage(<div className='text-center'>کد 4 رقم می باشد</div>);
                return;
            }
            setLoading(true);
            let convertedCode = code.replace(/\s/g, '');
            let response = await RlogInStepTwo({ userName, code: convertedCode });
            let { data } = response;
            setCookie('token', data.token, { expires: new Date(new Date().getTime() + parseInt(data.sessionTime) * 60000) });
            setCookie('user', data.user, { expires: new Date(new Date().getTime() + parseInt(data.sessionTime) * 60000) });
            setCookie('userName', userName, { expires: new Date(new Date().getTime() + parseInt(data.sessionTime) * 60000) });
            setCookie('role', data.role, { expires: new Date(new Date().getTime() + parseInt(data.sessionTime) * 60000) });
            setLoading(false);
            goToDashboard();
        } catch (error) {
            console.log(error);
            setLoading(false);
            if (error?.response?.data?.message) {
                setErrorMessage(<div className='text-center'>{error.response.data.message}</div>);
            } else {
                setErrorMessage(<div className='text-center'>Something is wrong!</div>);
            }
        }
    }


    return (
        <div className='flex flex-col w-full gap-4'>
            <div className='w-full'>
                <Input
                    bgColor={"bg-secondary"}
                    placeholder={"کد"}
                    cssClass={"text-center p-3"}
                    maxLength={4}
                    onChange={(e) => setCode(e.target.value)}
                    value={code}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            logInStepTwo();
                        }
                    }}
                />
            </div>
            <div className={`w-full bg-red-400 rounded-md items-center justify-center p-4 hidden ${errorMessage && "!flex"}`}>
                {errorMessage}
            </div>
            <div className='flex flex-col items-center w-full'>
                {loading ?
                    <div className="relative  w-12 h-12">
                        <div className="w-full h-full rounded-full absolute  border-4 border-solid border-gray-200"></div>
                        <div className="w-full h-full rounded-full absolute animate-spin  border-4 border-solid border-green-500 border-t-transparent shadow-md"></div>
                    </div>
                    :
                    <div className='flex justify-center items-center bg-accent rounded-md p-4 w-full gap-2' onClick={() => {
                        logInStepTwo();
                    }}
                    >
                        <span>ورود</span>
                        <FaArrowRightToBracket className='text-lg' />
                    </div>
                }
            </div>
            {timer != 0 &&
                <div className='w-full flex items-center justify-center'>
                    <Timer min={timer} TimerEndListener={() => {
                        goToPrevious();
                        setCode("");
                        setTimer(0);
                    }} />
                </div>
            }
        </div>
    );
};

export default StepTwo;