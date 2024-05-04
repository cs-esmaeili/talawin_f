import { useState, useEffect } from 'react';
import { userList as RuserList } from '@/services/User';
import toast from 'react-hot-toast';
import Table from '@/components/dashboard/Table';
import Pagination from '@/components/dashboard/Pagination';
import { FaUserLock } from "react-icons/fa6";
import { BiSolidEdit } from 'react-icons/bi';
import { MdQueryStats } from "react-icons/md";

const UserList = ({ editData, setEditData, refreshList }) => {

    const [users, setUsers] = useState(null);
    const [usersCount, setUsersCount] = useState(null);
    const [activePage, setActivePage] = useState(1);
    const [perPage, setPerPage] = useState(8);


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
                toast.error('Something is wrong!');
            }
        }
    }

    useEffect(() => {
        userList();
    }, [activePage, refreshList]);

    return (
        <div className='flex flex-col grow'>
            <div className='flex grow w-full overflow-x-scroll'>
                {users &&
                    <Table
                        headers={[
                            { name: 'Id', cssClass: "hidden lg:table-cell" },
                            { name: 'userName', cssClass: "" },
                            { name: 'Role', cssClass: "" },
                            { name: 'createdAt', cssClass: "hidden sm:table-cell" },
                            { name: 'Actions', cssClass: "" },
                        ]}
                        rowData={[
                            { name: '_id', cssClass: "hidden lg:table-cell" },
                            { name: 'userName', cssClass: "" },
                            { name: 'role_id.name', cssClass: "" },
                            { name: 'createdAt', cssClass: "hidden sm:table-cell" }
                        ]}
                        rows={users}
                        rowCountstart={(perPage * (activePage - 1))}
                        selectMode={false}
                        special={(row, index) => {
                            return (
                                <td className={`h-[1px]  p-0 pb-1 `}>
                                    <div className="flex h-full items-center justify-center rounded-e-xl bg-secondary p-1 text-nowrap">
                                        <FaUserLock className='text-xl ml-4 text-red-400' onClick={() => {

                                        }} />
                                        <MdQueryStats className='text-xl ml-4 text-yellow-400' onClick={() => {

                                        }} />
                                        <BiSolidEdit className='text-xl ml-4 text-blue-400' onClick={() => {
                                            setEditData(row);
                                        }} />
                                    </div>
                                </td>
                            )
                        }}
                    />
                }
            </div>
            <Pagination activePage={activePage} perPage={perPage} count={usersCount} setActivePage={setActivePage} />
        </div>
    );
};

export default UserList;