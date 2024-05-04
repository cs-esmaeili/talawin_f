import Input from '@/components/dashboard/Input';
import { useEffect, useState } from 'react';
import { FaArrowRightToBracket } from "react-icons/fa6";
import { logInStepOne as RlogInStepOne } from '@/services/Authorization';

const StepOne = ({ goToNextStep, setTimer , setUserName , userName}) => {


    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const checkForm = () => {
        const iranianPhoneNumberRegex = /^09\d{9}$/;
        let check = iranianPhoneNumberRegex.test(userName);
        let erros = [];
        if (!check) {
            erros.push(<div className='text-center'>فرمت شماره تماس صحیح نمی باشد</div>);
        }
        setErrorMessage(erros);
        return check;
    }
    const logInStepOne = async () => {
        try {
            const checkform = checkForm();
            if (!checkform) {
                return;
            }
            setLoading(true);
            let response = await RlogInStepOne({ userName });
            let { data } = response;
            setTimer(data.expireTime);
            setLoading(false);
            goToNextStep();
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

    useEffect(() => {
        setErrorMessage(null);
    }, [userName]);

    return (
        <div className='flex flex-col w-full gap-4'>
            <div className='w-full'>
                <Input bgColor={"bg-secondary"} placeholder={"شماره همراه"} cssClass={"text-center p-3"} maxLength={11}
                    onChange={(e) => setUserName(e.target.value)}
                    value={userName}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            logInStepOne();
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
                        logInStepOne();
                    }}
                    >
                        <span>ادامه</span>
                        <FaArrowRightToBracket className='text-lg' />
                    </div>
                }
            </div>
        </div>
    );
};

export default StepOne;