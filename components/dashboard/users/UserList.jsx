import { useState, useEffect } from 'react';
import { userList as RuserList } from '@/services/User';
import toast from 'react-hot-toast';
import Table from '@/components/dashboard/Table';
import Pagination from '@/components/dashboard/Pagination';
import { FaUserLock } from "react-icons/fa6";
import { BiSolidEdit } from 'react-icons/bi';
import { MdQueryStats } from "react-icons/md";
import translations from "@/translations.json";

const UserList = ({ editData, setEditData, refreshList }) => {

    const [users, setUsers] = useState(null);
    const [usersCount, setUsersCount] = useState(null);
    const [activePage, setActivePage] = useState(1);
    const [perPage, setPerPage] = useState(8);
    const { someThingIsWrong, userlist } = translations['fa'];

    const userList = async () => {
        try {
            const { data } = await RuserList({ page: activePage, perPage });
            const { usersCount, users } = data;
            
            setUsers(users);
            setUsersCount(usersCount);
        } catch (error) {
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(someThingIsWrong);
            }
        }
    }

    useEffect(() => {
        userList();
    }, [activePage, refreshList]);

    return (
        <div className='flex flex-col grow'>
            <div className='flex grow w-full overflow-x-scroll '>
                {users &&
                    <Table
                        headers={[userlist.userName, userlist.role, userlist.fullName]}
                        rowsData={[, "userName", "role_id.name", "data.fullName"]}
                        rows={users}
                        headerClasses={["", "", "", ""]}
                        rowClasses={(row, rowIndex) => {
                            return "";
                        }}
                        cellClasses={(cell, cellIndex, row, rowIndex) => {
                            return cell == "ارسال شده" && "text-green-400";
                        }}
                        columnVisibilityClasses={[
                            "",
                            "",
                            ""
                        ]}
                        actionComponent={({ rowData, rowIndex }) => {
                            return (
                                <div className="flex h-full items-center justify-center gap-2 text-nowrap">
                                    {/* <FaUserLock className='text-xl ml-4 text-red-400' onClick={() => {

                                    }} />
                                    <MdQueryStats className='text-xl ml-4 text-yellow-400' onClick={() => {

                                    }} /> */}
                                    <BiSolidEdit className='text-xl ml-4 text-blue-400' onClick={() => {
                                        setEditData(rowData);
                                    }} />
                                </div>
                            );
                        }}
                        rowCountstart={(perPage * (activePage - 1))}
                    />
                }
            </div>
            <Pagination activePage={activePage} perPage={perPage} count={usersCount} setActivePage={setActivePage} />
        </div>
    );
};

export default UserList;