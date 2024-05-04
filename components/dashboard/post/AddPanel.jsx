import React from 'react';
import { PiRectangleBold, PiTextAaFill } from "react-icons/pi";
import { VscLayoutSidebarLeft } from "react-icons/vsc";

const AddPanel = ({ content, setContent }) => {
    return (
        <div className='border-2 border-dashed border-accent w-full h-fit flex items-center justify-center p-5'>
            <PiRectangleBold className='text-accent text-4xl mr-2' onClick={() => {
                setContent(prevItems => [...prevItems, { type: "Text", content: "" }]);
            }} />
        </div>
    );
};

export default AddPanel;