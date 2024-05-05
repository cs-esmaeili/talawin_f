'use client'

import Chart from "@/components/dashboard/Chart"

export default function Dashboard() {

    return (
        <div className='flex flex-col  grow overflow-y-auto  gap-3 overflow-x-hidden'>
            <div className="h-1/2 w-full">
                <Chart />
            </div>
        </div>
    )
}
