import { togglePermission as RtogglePermission } from '@/services/Permission';
import toast from 'react-hot-toast';
import translations from "@/translations.json";

export default function Permissions({ allPermissions, currentRole, setUpdateList }) {

    const { someThingIsWrong, permissions } = translations['fa'];

    const togglePermission = async (role_id, permission_id) => {
        try {
            const { data } = await RtogglePermission({ role_id, permission_id });
            const { message } = data;
            toast.success(message);
            setUpdateList();
        } catch (error) {
            console.log(error);
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(someThingIsWrong);
            }
        }
    }

    return (
        <>
            {(allPermissions != null && currentRole != null) ?
                allPermissions.map((permission, index) => {
                    let active = false;
                    const { permissions } = currentRole;
                    for (let i = 0; i < permissions.length; i++) {
                        if (allPermissions[index]._id == permissions[i]._id) {
                            active = true;
                            break;
                        }
                    }
                    return (
                        <div className='flex flex-col grow bg-secondary justify-center rounded-md p-3' key={index} onClick={() => {
                            togglePermission(currentRole._id, permission._id);
                        }}>
                            <div className='flex flex-row justify-between'>
                                <div>
                                    <div>
                                        {permission.name}
                                    </div>
                                    <div>
                                        {permission.route}
                                    </div>
                                    <div >
                                        {permission.disc}
                                    </div>
                                </div>
                                <div className='flex items-center justify-center mr-3 '>
                                    <div className={`rounded-full bg-primary w-10 h-10 ${(active) && "!bg-accent"}`} />
                                </div>
                            </div>
                        </div>
                    )
                })
                :
                <div className='flex grow justify-center items-center'>
                    {permissions.selecRole}
                </div>
            }
        </>
    )
}
