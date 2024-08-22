import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { smsTemplateList as RsmsTemplateList } from '@/services/smsTemplate';
import translations from "@/translations.json";
import DeleteTemplate from './DeleteTemplate';
import CreateTemplate from './CreateTemplate';

const SmsTemplates = ({ selectedTemplate, setSelectedTemplate }) => {

    const [templates, setTemplates] = useState(null);
    const [templatesCount, setTemplatesCount] = useState(null);
    const [activePage, setActivePage] = useState(1);
    const [perPage, setPerPage] = useState(6);
    const [editData, setEditData] = useState(null);
    const { someThingIsWrong } = translations['fa'];

    const smsTemplateList = async () => {
        try {
            const { data } = await RsmsTemplateList({ page: activePage, perPage });
            const { templatesCount, templates } = data;
            setTemplates(templates);
            setTemplatesCount(templatesCount);
        } catch (error) {
            console.log(error);

            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(someThingIsWrong);
            }
        }
    }
    useEffect(() => {
        smsTemplateList();
    }, [activePage]);

    return (
        <>
            {templates && templates.length > 0 &&
                <>
                    <CreateTemplate updateList={() => smsTemplateList()} />
                    {templates.map((value, index) => {
                        const { code, name, text, _id } = value;

                        return (
                            <div className={`flex flex-col bg-secondary  rounded-lg  h-fit  w-full  p-3 gap-3 ${(selectedTemplate != null && _id == selectedTemplate._id) && "border-2 border-green-400"}`}
                                key={index} onClick={() => {
                                    setSelectedTemplate({ code, name, text, _id });
                                }}>
                                <div className='flex justify-between items-center rtl gap-5'>
                                    <DeleteTemplate _id={_id} updateList={() => smsTemplateList()} />
                                    <span>
                                        {name}
                                    </span>
                                    <span>
                                        {code}
                                    </span>
                                </div>
                                <hr />
                                <div className='flex rtl items-center flex-wrap overflow-y-auto p-1'>
                                    {text}
                                </div>
                            </div>
                        )
                    })}
                </>
            }
        </>
    );
};

export default SmsTemplates;