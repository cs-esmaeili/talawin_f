'use client'

import Input from '@/components/dashboard/Input';
import { useState, useEffect } from 'react';
import { searchUser as RsearchUser } from '@/services/User';
import toast from 'react-hot-toast';
import translations from "@/translations.json";

const UserSearch = ({ selectedUser, setSelectedUser }) => {

    const [searchValue, setSearchValue] = useState("جواد");
    const [users, setUsers] = useState(null);
    const { someThingIsWrong } = translations['fa'];

    const searchUser = async () => {
        try {
            const { data } = await RsearchUser({ phoneNumber: searchValue, name: searchValue });
            setUsers(data);
        } catch (error) {
            if (error?.response?.data?.message) {
                setUsers(null);
                toast.error(error.response.data.message);
            } else {
                toast.error(someThingIsWrong);
            }
        }
    }


    return (
        <>
            <div className='bg-primary w-full rounded-md p-3 flex justify-center' ><span>انتخاب کاربر</span></div>
            <Input placeholder={"جستجو بر اساس نام یا شماره تلفن"} inputCssClass={"text-center ltr"}
                onChange={(e) => setSearchValue(e.target.value)} value={searchValue}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        searchUser();
                    }
                }} />
            <div className='flex flex-col gap-3 grow w-full overflow-y-auto'>
                {users && users.length > 0 &&
                    users.map((user) => {
                        return (
                            <div className='bg-primary flex w-full h-fit gap-2 p-3 rounded-md justify-between' onClick={() => {
                                setSelectedUser(user);
                            }}>
                                <div>{user.userName}</div>
                                <div>{user.data.fullName}</div>
                            </div>
                        )
                    })
                }
            </div>
            {selectedUser &&
                <div className='bg-primary flex w-full p-3 rounded-md justify-between border-green-400 border-2' onClick={() => {
                    setSelectedUser(null);
                }}>
                    <div>{selectedUser.userName}</div>
                    <div>{selectedUser.data.fullName}</div>
                </div>
            }
        </>
    );
};

export default UserSearch;