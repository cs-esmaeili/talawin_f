import Head from 'next/head';

const page = () => {
    return (
        <div className="min-h-screen bg-primary flex flex-col items-center justify-center px-4">
            <Head>
                <title>به زودی!</title>
                <meta name="description" content="وبسایت ما به زودی راه اندازی می شود!" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className='text-4xl font-bold text-black rtl mb-10'>
                <span className='text-accent text-7xl'>طلا</span>
                <span className=' text-7xl' style={{ color: "#cccccc" }}>وین</span>
            </div>

            <h1 className="text-4xl font-bold text-black rtl" style={{ color: "#cccccc" }}>
                به زودی می رسیم!
            </h1>

            <div className="mt-8">
                <div className="bg-secondary hover:bg-opacity-75  font-bold py-2 px-4 rounded-full rtl justify-center text-center items-center flex" style={{ color: "#cccccc" }}>
                    وبسایت ما در حال ساخت است. برای راه اندازی آن با ما همراه باشید!
                </div>
            </div>
            <a
                className="bg-secondary hover:bg-opacity-75  font-bold py-2 px-4 rounded-full rtl mt-5 text-center text-nowrap" style={{ color: "#ffffcc" }}
                href={`https://www.google.com/maps/place/Qeysarie+Bazaar/@32.6613733,51.6755814,21z/data=!4m6!3m5!1s0x3fbc35f24c761cf1:0xaad23e0d912d0e8e!8m2!3d32.6613952!4d51.6757381!16s%2Fg%2F11fy7dc0yr?entry=ttu`}>
                آدرس ما
            </a>
        </div>
    );
};

export default page;