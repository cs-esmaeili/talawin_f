import { useEffect, useRef, useState } from 'react';

function InputDatePicker({ icon, value, onChange, reset, length = 3 }) {
    let inputRefs = useRef(Array.from({ length }, () => useRef(null)));

    const [defaultTime, setDefaultTime] = useState(value ? value.split("-") : ["", "", ""]);

    const focusNextInput = (index) => {
        const nextIndex = index + 1;
        if (nextIndex < length) {
            inputRefs.current[nextIndex].current.focus();
        }
    };

    const focusPrevInput = (index) => {
        const prevIndex = index - 1;
        if (prevIndex >= 0) {
            inputRefs.current[prevIndex].current.focus();
        }
    };

    const onChangedDates = () => {
        let time = inputRefs.current.map((element) => element.current.value).join("-");
        onChange(time);
    };

    useEffect(() => {
        if (reset == null) {
            inputRefs.current.forEach((element) => {
                element.current.value = "";
            });
        }
    }, [reset]);

    useEffect(() => {
        setDefaultTime(value ? value.split("-") : ["", "", ""]);
        console.log(value ? value.split("-") : "");
    }, [value]);

    return (
        <div className='flex items-center gap-1 bg-primary rounded-md min-w-0'>
            <div className='flex h-full items-center ml-1'>{icon}</div>
            <input
                className='bg-transparent p-1 outline-none text-center min-w-0'
                ref={inputRefs.current[0]}
                placeholder='1379'
                value={defaultTime[0]}
                onChange={onChangedDates}
                onKeyDown={(e) => {
                    if (e.key === 'Backspace' && e.currentTarget.value === '') {
                        focusNextInput(0);
                    } else if (e.key >= '0' && e.key <= '9' && e.currentTarget.value.length === 4) {
                        focusPrevInput(0);
                    }
                }}
                maxLength={4}
            />
            <span> / </span>
            <input
                className='bg-transparent p-1 outline-none text-center min-w-0'
                ref={inputRefs.current[1]}
                value={defaultTime[1]}
                placeholder='01'
                onChange={onChangedDates}
                onKeyDown={(e) => {
                    if (e.key === 'Backspace' && e.currentTarget.value === '') {
                        focusNextInput(1);
                    } else if (e.key >= '0' && e.key <= '9' && e.currentTarget.value.length === 2) {
                        focusPrevInput(1);
                    }
                }}
                maxLength={2}
            />
            <span> / </span>
            <input
                className='bg-transparent p-1 outline-none text-center min-w-0'
                ref={inputRefs.current[2]}
                value={defaultTime[2]}
                placeholder='11'
                onChange={onChangedDates}
                onKeyDown={(e) => {
                    if (e.key === 'Backspace' && e.currentTarget.value === '') {
                        focusNextInput(2);
                    } else if (e.key >= '0' && e.key <= '9' && e.currentTarget.value.length === 2) {
                        focusPrevInput(2);
                    }
                }}
                maxLength={2}
            />
        </div>
    );
}

export default InputDatePicker;