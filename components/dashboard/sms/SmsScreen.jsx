import { useState, useEffect } from 'react';
import Input from '@/components/dashboard/Input';
import { sendSmsToUser as RsendSmsToUser } from '@/services/smsTemplate';
import toast from 'react-hot-toast';
import translations from "@/translations.json";

const SmsScreen = ({ selectedTemplate, selectedUser, setSelectedTemplate, setSelectedUser }) => {

  const [userName, setUserName] = useState(null);
  const [code, setCode] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState(null);
  const [name, setName] = useState(null);

  const [inputValues, setInputValues] = useState([]);
  const { someThingIsWrong } = translations['fa'];

  useEffect(() => {
    if (selectedTemplate && selectedTemplate.text) {
      setCode(selectedTemplate.code)
      setText(selectedTemplate.text)
      setName(selectedTemplate.name)
      const placeholders = selectedTemplate.text.match(/#\w+#/g) || [];
      const initialValues = placeholders.map((placeholder) => ({
        name: placeholder.replace(/#/g, ''),
        value: '',
      }));
      setInputValues(initialValues);
    }
  }, [selectedTemplate]);

  useEffect(() => {
    if (selectedUser != null) {
      setPhoneNumber(selectedUser.userName);
      if (selectedUser.data != null) {
        setUserName(selectedUser.data.fullName);
      }
    }
  }, [selectedUser]);

  const handleInputChange = (name, value) => {
    setInputValues((prevValues) =>
      prevValues.map((input) =>
        input.name === name ? { ...input, value } : input
      )
    );
  };

  const generateFinalPureText = () => {
    let finalText = selectedTemplate.text;
    inputValues.forEach(({ name, value }) => {
      const placeholder = `#${name}#`;
      finalText = finalText.replace(new RegExp(placeholder, 'g'), value || placeholder);
    });
    return finalText;
  };
  const generateFinalText = () => {
    let finalText = selectedTemplate.text;
    inputValues.forEach(({ name, value }) => {
      const placeholder = `#${name}#`;
      const replacement = value
        ? `<span class="text-blue-400 font-bold">${value}</span>`
        : placeholder;
      finalText = finalText.replace(new RegExp(placeholder, 'g'), replacement);
    });
    return finalText;
  };

  const sendSmsToUser = async () => {
    try {
      setLoading(true);
      const { data } = await RsendSmsToUser({ name, text: generateFinalPureText(), phoneNumber, code, params: inputValues });
      const { message } = data;
      toast.success(message);
      setLoading(false);
      setSelectedTemplate(null);
      setSelectedUser(null);
    } catch (error) {
      console.log(error);
      setLoading(false);
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(someThingIsWrong);
      }
    }
  }

  return (
    <div className="flex w-full h-full flex-col rounded-lg p-3 bg-secondary justify-between overflow-y-auto">
      {loading ?
        <div className="relative flex flex-col gap-5 justify-center items-center h-full w-full">
          <div className="w-32 h-32 rounded-full border-8 border-solid border-accent border-t-transparent animate-spin"></div>
        </div>
        :
        <>
          {selectedTemplate && (
            <div>
              <div className="space-y-4">
                {inputValues.map((input, index) => (
                  <div key={index} className="flex flex-col">
                    <Input type="text"
                      value={input.value}
                      onChange={(e) =>
                        handleInputChange(input.name, e.target.value)
                      }
                      placeholder={input.name} />
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4  rounded-md shadow-md rtl">
                <h2 className="text-lg font-semibold mb-2">متن نهایی :</h2>
                <p className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: generateFinalText() }} />
              </div>
            </div>
          )}
          {phoneNumber && selectedTemplate &&
            <div className='flex flex-col gap-3'>
              <div className='flex bg-primary rounded-md justify-between border-2 border-green-400 p-3'>
                <span>{phoneNumber}</span>
                <span>{userName}</span>
              </div>
              <button className='p-3 bg-blue-400 rounded-md w-full' onClick={() => {
                sendSmsToUser();
              }}>ارسال</button>
            </div>
          }
        </>}
    </div>
  );
};
export default SmsScreen;
