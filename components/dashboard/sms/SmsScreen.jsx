import { useState, useEffect } from 'react';
import Input from '@/components/dashboard/Input';
import { sendSmsToUser as RsendSmsToUser } from '@/services/smsTemplate';
import toast from 'react-hot-toast';
import translations from "@/translations.json";


import DatePicker, { DateObject } from "react-multi-date-picker"
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import "react-multi-date-picker/styles/backgrounds/bg-dark.css"
import "react-multi-date-picker/styles/colors/yellow.css"

const SmsScreen = ({ selectedTemplate, selectedUser, setSelectedTemplate, setSelectedUser }) => {

  const [userName, setUserName] = useState(null);
  const [templateCode, setTemplateCode] = useState(null);
  const [templateName, setTemplateName] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState(null);
  const [time, setTime] = useState(new DateObject());
  const [isChecked, setIsChecked] = useState(false);

  const [inputValues, setInputValues] = useState([]);
  const { someThingIsWrong } = translations['fa'];


  useEffect(() => {
    if (selectedTemplate && selectedTemplate.text) {
      setTemplateCode(selectedTemplate.code)
      setText(selectedTemplate.text)
      setTemplateName(selectedTemplate.name)
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
      const { data } = await RsendSmsToUser({ templateName, text: generateFinalPureText(), phoneNumber, templateCode, params: inputValues, time: (isChecked) ? time.format() : false });
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

              <div className={`border-2 border-accent p-3  flex items-center rounded-md justify-evenly opacity-50 ${isChecked && "!opacity-100"}`}>
                <DatePicker
                  format="YYYY/MM/DD HH:mm:ss"
                  plugins={[
                    <TimePicker position="bottom" />
                  ]}
                  calendar={persian}
                  locale={persian_fa}
                  calendarPosition="bottom-right"
                  style={{ backgroundColor: "transparent", textAlign: "center", borderWidth: "0" }}
                  className="bg-dark yellow"
                  value={time}
                  onChange={(value) => {
                    setTime(value);
                  }}
                />

                <div className='rtl flex gap-2 items-center justify-center'>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <label className="ml-2">
                    ارسال زمانبدی شده
                  </label>
                </div>
              </div>

            </div>
          )}
          {phoneNumber && selectedTemplate &&
            <div className='flex flex-col gap-3'>
              <div className='flex bg-primary rounded-md justify-between border-2 border-green-400 p-3'>
                <span>{phoneNumber}</span>
                <span>{userName}</span>
              </div>
              <button className={`p-3 bg-blue-400 rounded-md w-full ${isChecked && "!bg-accent"}`} onClick={() => {
                sendSmsToUser();
              }}>
                {isChecked ? "ارسال زمانبدی شده" : "ارسال"}
              </button>
            </div>
          }
        </>}
    </div>
  );
};
export default SmsScreen;
