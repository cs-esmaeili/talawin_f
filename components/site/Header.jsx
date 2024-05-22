import Image from 'next/image';
import { IoMenu } from "react-icons/io5";
import config from "../../config.json";
import Link from "next/link";
import config from "../../config.json";

const Header = ({ open, setOpen, categorys }) => {

    return (
        <div className="flex fixed top-0  z-30  min-h-[80px] lg:max-w-[1140px] h-fit p-2 w-screen items-center overflow-hidden px-5 gap-3">
            <div className='relative w-[50px] h-[50px] min-w-[50px] rounded-md overflow-hidden'>
                <Image
                    src={config.api + config.logo_url}
                    alt="Picture of the author"
                    fill
                    style={{ objectFit: "cover" }}
                />
            </div>
            <div className='hidden md:flex grow gap-4 '>
                <Link href={'/'}>
                    <div>
                        Home
                    </div>
                </Link>
                {categorys && categorys.map((item, index) => {
                    const { name, url = `/category/${name}/1` } = item;
                    if (index <= 5) {
                        return (
                            <Link href={url} key={index}>
                                <div>
                                    {name}
                                </div>
                            </Link>
                        )
                    }
                })}
                <Link href={`/categoryList`}>
                    <div>
                        categoryList
                    </div>
                </Link>
            </div>
            <div className=' md:hidden'>
                {config.app_name}
            </div>
            <div className='hidden md:flex'>
                {/* search */}
            </div>
            <div className='flex md:hidden ml-auto' onClick={() => setOpen(true)}>
                <IoMenu className='text-3xl' />
            </div>
        </div>
    );
};

export default Header;