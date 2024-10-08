import Input from '@/components/dashboard/Input';
import { useState, useEffect } from 'react';
import { FaArrowRightToBracket } from "react-icons/fa6";
import { logInStepTwo as RlogInStepTwo } from '@/services/Authorization';
import Timer from '@/components/dashboard/Timer';
import { setCookie } from 'cookies-next';
import translations from "@/translations.json";
import { useDispatch } from 'react-redux';
import { setlogOutTime } from '@/state/logOutTime';
import axios from "axios";

const StepTwo = ({ timer, setTimer, userName, goToPrevious, goToDashboard }) => {

    const [code, setCode] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const { stepTwo, someThingIsWrong } = translations['fa'];
    const dispatch = useDispatch();

    const logInStepTwo = async (codeI) => {
        try {
            setLoading(true);
            let convertedCode = null;
            if (codeI != null) {
                convertedCode = codeI.replace(/\s/g, '');
            } else {
                convertedCode = code.replace(/\s/g, '');
            }

            let response = await RlogInStepTwo({ userName, code: convertedCode });
            let { token, sessionTime } = response.data;
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            let expObj = { expires: new Date(new Date().getTime() + parseInt(sessionTime) * 60000) };

            
            setCookie('token', token, expObj);
            setCookie('userName', userName, expObj);
            setCookie('sessionTime', sessionTime, expObj);
            dispatch(setlogOutTime(new Date()));
            setLoading(false);
            goToDashboard();
        } catch (error) {
            console.error(error);
            const errorMessage = error?.response?.data?.message ? error.response.data.message : someThingIsWrong;
            setErrorMessage(<div className='text-center'>{errorMessage}</div>);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setErrorMessage(null);
    }, [userName]);

    return (
        <div className='flex flex-col w-full gap-4'>
            <div className='w-full'>
                <Input
                    inputCssClass={"bg-secondary !ltr text-center"}
                    placeholder={stepTwo.placeHolderCode}
                    divCssClass={"p-3"}
                    maxLength={4}
                    onChange={(e) => setCode(e.target.value)}
                    value={code}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && e.target.value.length === 4) {
                            logInStepTwo(e.target.value);
                        }
                    }}
                    onPaste={(e) => {
                        setTimeout(() => {
                            if (e.target.value.length === 4) {
                                logInStepTwo(e.target.value);
                            }
                        }, 0);
                    }}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    onKeyPress={(e) => {
                        const charCode = e.charCode ? e.charCode : e.keyCode;
                        if (charCode < 48 || charCode > 57) {
                            e.preventDefault();
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
                        <div className="w-full h-full rounded-full absolute animate-spin  border-4 border-solid border-accent border-t-transparent shadow-md"></div>
                    </div>
                    :
                    <div className='flex justify-center items-center bg-accent rounded-md p-4 w-full gap-2 cursor-pointer' onClick={() => {
                        if (code.length != 4) {
                            setErrorMessage(<div className='text-center'>{stepTwo.codeFormatIsWrong}</div>);
                            return;
                        } else {
                            logInStepTwo();
                        }
                    }}
                    >
                        <span>{stepTwo.buttonTitle}</span>
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