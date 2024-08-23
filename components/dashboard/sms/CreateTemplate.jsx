import Input from '@/components/dashboard/Input';
import { useState } from 'react';
import { createSmsTemplate as RcreateSmsTemplate } from '@/services/smsTemplate';
import toast from 'react-hot-toast';
import translations from "@/translations.json";

const CreateTemplate = ({ updateList }) => {

    const [name, setName] = useState("");
    const [text, setText] = useState("");
    const [code, setCode] = useState("");
    const { someThingIsWrong } = translations['fa'];

    const createSmsTemplate = async () => {
        try {
            const { data } = await RcreateSmsTemplate({ code, name, text });
            const { message } = data;
            toast.success(message);
            updateList();
        } catch (error) {
            console.log(error);

            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(someThingIsWrong);
            }
        }
    }

    return (
        <div className='flex flex-col bg-secondary  rounded-lg  h-fit w-full p-3 gap-3 '>
            <div className='flex justify-center items-center rtl gap-5 '>
                <Input placeholder={"نام قالب"} inputCssClass={"text-center"} value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className='flex justify-center items-center rtl gap-5 '>
                <Input placeholder={"کد"} inputCssClass={"text-center"} value={code} onChange={(e) => setCode(e.target.value)} />
            </div>
            <hr />
            <div className='flex rtl  flex-wrap overflow-y-auto p-1 h-fit'>
                <Input placeholder={"متن"} divCssClass={"h-full"} multiline
                    value={text} onChange={(e) => setText(e.target.value)} />
            </div>
            <button className='bg-green-600 rounded-lg p-2' onClick={() => {
                createSmsTemplate();
            }}>ساخت</button>
        </div>
    );
};

export default CreateTemplate;