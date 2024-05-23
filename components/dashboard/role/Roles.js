import { useState, useEffect } from 'react';
import { IoMdTrash } from 'react-icons/io';
import { roleList as RroleList, deleteRole as RdeleteRole } from '@/services/Role'
import { ImCancelCircle } from "react-icons/im";
import Add from './Add';
import toast from 'react-hot-toast';
import translations from "@/translations.json";

export default function Roles({ setCurrentRole, setAllpermissions, updateList, selectMode, listener }) {

    const [roles, setRoles] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [deleteMode, setDeleteMode] = useState(-1);
    const { someThingIsWrong, rolesT } = translations['fa'];

    const roleList = async (selectLastActiveRole) => {
        try {
            const { data } = await RroleList();
            setRoles(data.roles);
            if (!selectMode) {
                setAllpermissions(data.permissions);
                if (currentIndex != -1 && selectLastActiveRole) {
                    setCurrentRole(data.roles[currentIndex]);
                }
            }
        } catch (error) {
            console.log(error);
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(someThingIsWrong);
            }
        }
    }

    const deleteRole = async (role_id, newRole_id) => {
        try {
            const { data } = await RdeleteRole({ role_id, newRole_id });
            const { message } = data;
            toast.success(message);
            resetAllData();
            roleList();
        } catch (error) {
            console.log(error);
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(someThingIsWrong);
            }
        }
    }

    const resetAllData = () => {
        if (!selectMode) {
            setCurrentRole(null);
            setAllpermissions(null);
        }
        setRoles(null);
        setCurrentIndex(-1);
        setDeleteMode(-1);
    }

    useEffect(() => {
        roleList(true);
    }, [updateList]);

    const toggleButtons = (index) => {
        if (deleteMode != -1 && index == deleteMode) {
            return (<ImCancelCircle className='text-white' onClick={() => {
                setDeleteMode(-1);
            }} />)
        }
        if (deleteMode == -1) {
            return (
                <div className='bg-secondary rounded-full p-2'>
                    <IoMdTrash className='text-red-400' onClick={() => {
                        setDeleteMode(index);
                    }} />
                </div>
            )
        }
    }
    return (
        <div className='flex flex-col grow'>
            <div className='flex w-full justify-center p-2'>
                <div>{rolesT.roleListTitle}</div>
            </div>
            <div className='flex flex-col pr-3 pl-3 w-full gap-2'>
                {(roles != null) &&
                    roles.map((role, index) => {
                        return (
                            <div className={`flex items-center justify-center  p-2 rounded-md bg-secondary hover:bg-opacity-50
                            ${(index === currentIndex && deleteMode == -1) ? "!bg-accent" : ""} 
                            ${(deleteMode != -1) ? (index === deleteMode) ? "!bg-red-400" : "!bg-green-500" : ""}
                            `}>
                                <button
                                    className="grow"
                                    key={index}
                                    onClick={() => {
                                        if (deleteMode == -1) {
                                            setCurrentIndex(index);
                                            if (!selectMode) {
                                                setCurrentRole(roles[index]);
                                            } else {
                                                listener(role);
                                            }
                                        } else if (index != deleteMode) {
                                            deleteRole(roles[deleteMode]._id, role._id);
                                        }
                                    }}> {role.name}
                                </button>
                                {toggleButtons(index)}
                            </div>
                        )
                    })}
                {deleteMode == -1 &&
                    <Add resetAllData={resetAllData} roleList={roleList} />
                }
            </div>
        </div>
    )
}
