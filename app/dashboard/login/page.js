'use client'

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import { FaArrowLeft } from "react-icons/fa6";
import config from "../../../config.json";
import translations from "@/translations.json";

const LogIn = () => {

    const [step, setStep] = useState(false);
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(0);
    const [userName, setUserName] = useState("09137378601");

    const { push } = useRouter();

    const goToDashboard = () => {
        setLoading(true);
        push('/dashboard');
    }

    const text = translations['fa'].logIn;

    return (
        <div className='bg-primary flex h-screen w-full max-w-full overflow-hidden justify-center items-center'>
            <Toaster position="top-center" />
            <div className='flex flex-col rounded-lg items-center max-w-[500px] w-full sm:w-1/2 p-2 gap-3'>
                {loading ?
                    <div className="relative  w-12 h-12">
                        <div className="w-full h-full rounded-full absolute  border-4 border-solid border-gray-200"></div>
                        <div className="w-full h-full rounded-full absolute animate-spin  border-4 border-solid border-yellow-500 border-t-transparent shadow-md"></div>
                    </div>
                    :
                    <>
                        <div className='flex flex-row-reverse justify-between w-full'>
                            <div className='relative max-w-full w-[140px] h-[140px] rounded-md overflow-hidden '>
                                <Image
                                    src={config.api + config.logo_url}
                                    alt="Picture of the author"
                                    fill
                                    style={{ objectFit: "cover" }}
                                />
                            </div>
                            <div className='flex flex-col '>
                                <div className={`items-center gap-1 hidden ${step && "!flex"}`} onClick={() => {
                                    setStep(false);
                                }}>
                                    <FaArrowLeft />
                                    <span>{text.back}</span>
                                </div>
                                <div className='flex grow items-center'>
                                    <span className='text-3xl'>{text.logInRegister}</span>
                                </div>
                            </div>
                        </div>
                        {!step ?
                            <StepOne goToNextStep={() => setStep(true)} setTimer={setTimer} setUserName={setUserName} userName={userName} />
                            :
                            <StepTwo timer={timer} setTimer={setTimer} goToPrevious={() => setStep(false)} setUserName={setUserName} userName={userName} goToDashboard={goToDashboard} />
                        }
                    </>
                }
            </div>
        </div>
    );
};

export default LogIn;