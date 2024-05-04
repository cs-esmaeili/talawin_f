import React from 'react';
import { BsImageFill } from 'react-icons/bs';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useModalContext } from '@/components/dashboard/Modal';
import Filemanager from '@/app/dashboard/(main)/filemanager/page';
import Input from '@/components/dashboard/Input';
import InputDatePicker from '@/components/dashboard/InputDatePicker';
import Roles from '@/components/dashboard/role/Roles';
import { registerPure, updateRegisterPure } from '@/services/User';
import toast from 'react-hot-toast';
import { MdSubtitles } from "react-icons/md";
import { FaMobile } from "react-icons/fa6";
import { FaIdCardAlt } from "react-icons/fa";
import { MdCreditCard } from "react-icons/md";

const CreateUser = ({ editData, setEditData, setRefreshList }) => {

    const [role, setRole] = useState(null);
    const [image, setImage] = useState(null);
    const [userName, setUserName] = useState("");
    const [fullName, setFullName] = useState("");
    const [birthday, setBirthday] = useState(null);
    const [nationalCode, setNationalCode] = useState("");
    const [shebaNumber, setShebaNumber] = useState("");

    const [createStatus, setCreateStatus] = useState(false);


    const { openModal, closeModal } = useModalContext();

    const resetForm = () => {
        setRole(null);
        setImage(null);
        setUserName("");
        setFullName("");
        setBirthday(null);
        setNationalCode("");
        setShebaNumber("");
    }


    const createUser = async () => {
        try {
            let dataToSend = {
                userName,
                role_id: role._id,
                data: {
                    image,
                    fullName,
                    nationalCode,
                    birthday,
                    shebaNumber
                }
            }
            let response = null;
            if (editData) {
                dataToSend.user_id = editData._id
                response = await updateRegisterPure(dataToSend);
            } else {
                response = await registerPure(dataToSend);
            }
            let { data } = response;
            const { message } = data;
            toast.success(message);
            resetForm();
            setRefreshList();
        } catch (error) {
            console.log(error);
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Something is wrong!');
            }
        }
    }

    const pickImage = () => {
        openModal(<Filemanager fileType={"image"} fileSelectListener={(selectedFile) => {
            const { baseUrl, file } = selectedFile;
            setImage({ url: baseUrl + file.name, blurHash: file.blurHash });
            closeModal();
        }} />);
    }

    useEffect(() => {
        if (role != null && userName != "") {
            setCreateStatus(true);
        } else {
            setCreateStatus(false);
        }
    }, [role, image, userName, fullName, birthday, nationalCode, shebaNumber]);

    useEffect(() => {
        if (editData != null) {
            const { name, _id } = editData.role_id;
            setUserName(editData.userName);
            setRole({ name, _id });
            if (editData.data != null) {
                const { image = null, fullName = "", birthday = "", nationalCode = "", shebaNumber = "" } = editData.data;
                setImage(image);
                setFullName(fullName);
                setBirthday(birthday);
                setNationalCode(nationalCode);
                setShebaNumber(shebaNumber);
            }
        }
    }, [editData]);

    return (
        <>
            <div className='flex flex-col grow  gap-2 w-2/3 max-w-2/3'>
                <Input onChange={(e) => setFullName(e.target.value)} value={fullName} icon={<MdSubtitles />} placeholder={"Fullname"} color={"bg-primary"} />
                <Input onChange={(e) => setUserName(e.target.value)} value={userName} icon={<FaMobile />} placeholder={"Username"} color={"bg-primary"} />
                <Input onChange={(e) => setNationalCode(e.target.value)} value={nationalCode} icon={<FaIdCardAlt />} placeholder={"National_code"} color={"bg-primary"} />
                <Input onChange={(e) => setShebaNumber(e.target.value)} value={shebaNumber} icon={<MdCreditCard />} placeholder={"sheba_Number"} color={"bg-primary"} />
                <div className='flex justify-between gap-2'>
                    <InputDatePicker icon={<BsImageFill className='' />} value={birthday} reset={birthday} onChange={(time) => setBirthday(time)} />
                    <button className='bg-accent grow text-nowrap p-1 pl-3 pr-3 rounded-md' onClick={() => {
                        openModal(<Roles selectMode listener={(role) => {
                            const { name, _id } = role;
                            setRole({ name, _id });
                            closeModal();
                        }} />);
                    }}>{role ? role.name : "Select Role"}</button>
                </div>
                <div className='flex grow gap-2'>
                    {editData &&
                        <button className={`bg-red-500 grow text-nowrap p-1 pl-3 pr-3 rounded-md ${!createStatus && "opacity-50"}`}
                            onClick={() => {
                                setEditData(null);
                                resetForm();
                            }}
                        >
                            Cancel Update
                        </button>
                    }
                    <button className={`bg-green-500 grow text-nowrap p-1 pl-3 pr-3 rounded-md ${!createStatus && "opacity-50"}`}
                        onClick={() => {
                            if (createStatus) {
                                createUser();
                            }
                        }}
                    >
                        {(editData) ? "Update User" : "Create User"}
                    </button>
                </div>
            </div>

            <div className='flex flex-col grow md:grow-0  w-1/3 justify-start bg-primary rounded-md p-2'>
                <div className='w-fit'>User Image:</div>
                <div className='flex grow relative justify-center text-center mt-3'>
                    {image &&
                        <Image
                            src={image.url}
                            alt="Picture of the author"
                            fill
                            objectFit="cover"
                            placeholder="blur"
                            blurDataURL={image.blurHash}
                            onClick={(e) => {
                                pickImage();
                            }}
                        />
                    }
                    <BsImageFill className='text-green-400 text-8xl m-10' onClick={() => {
                        pickImage();
                    }} />
                </div>
            </div>
        </>
    );
};

export default CreateUser;