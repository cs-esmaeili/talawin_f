'use client'

import Chart from "@/components/dashboard/Chart"
import ProductCard from "@/components/site/ProductCard";
import Image from 'next/image';

export default function Dashboard() {

    return (
        <div className='flex flex-col  grow h-full overflow-y-auto  gap-1 p-3 overflow-x-hidden'>
            <div className="min-h-[280px] h-[280px] md:min-h-[305px] lg:min-h-[350px] xl:min-h-[360px] w-full" >
                <Chart />
            </div>
            <div className="grow">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-6">
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                </div>
            </div>
        </div>
    )
}
