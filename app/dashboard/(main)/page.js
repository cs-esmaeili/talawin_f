'use client'

import Chart from "@/components/dashboard/Chart"
import ProductCard from "@/components/dashboard/ProductCard";

export default function Dashboard() {

    return (
        <div className='flex flex-col  grow h-full overflow-y-auto  gap-1 p-3 overflow-x-hidden'>
            <div className="min-h-[280px] h-[280px] md:min-h-[305px] lg:min-h-[350px] xl:min-h-[360px] w-full" >
                <Chart />
            </div>
            <div className="grow">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-6">
                    <ProductCard title={"شمش 18 عیار"} disc={""} price={100000} />
                    <ProductCard title={"امامی بانکی 86"} disc={"تمام سکه"} price={100000} />
                    <ProductCard title={"امامی بانکی تاریخ پایین"} disc={"تمام سکه"} price={100000} />
                    <ProductCard title={"بهار بانکی"} disc={"تمام سکه"} price={100000} />
                    <ProductCard title={"بانکی 86"} disc={"نیم سکه"} price={100000} />
                    <ProductCard title={"بانکی سال پایین"} disc={"نیم سکه"} price={100000} />
                    <ProductCard title={"بانکی 86"} disc={"ربع سکه"} price={100000} />
                    <ProductCard title={"بانکی سال پایین"} disc={"ربع سکه"} price={100000} />
                    <ProductCard title={"سکه گرمی بانکی"} disc={""} price={100000} />
                    <ProductCard title={"پارسیان"} disc={"0.050"} price={100000} />
                    <ProductCard title={"پارسیان"} disc={"0.100"} price={100000} />
                    <ProductCard title={"پارسیان"} disc={"0.150"} price={100000} />
                    <ProductCard title={"پارسیان"} disc={"0.250"} price={100000} />
                    <ProductCard title={"پارسیان"} disc={"0.300"} price={100000} />
                    <ProductCard title={"پارسیان"} disc={"0.400"} price={100000} />
                    <ProductCard title={"پارسیان"} disc={"0.600"} price={100000} />
                    <ProductCard title={"پارسیان"} disc={"0.700"} price={100000} />
                    <ProductCard title={"پارسیان"} disc={"0.800"} price={100000} />
                    <ProductCard title={"پارسیان"} disc={"0.900"} price={100000} />
                    <ProductCard title={"پارسیان"} disc={"1 گرم"} price={100000} />
                    <ProductCard title={"پارسیان"} disc={"1.200 گرم"} price={100000} />
                    <ProductCard title={"پارسیان"} disc={"2 گرم"} price={100000} />
                    <ProductCard title={"پارسیان"} disc={"1.5 گرم"} price={100000} />
                </div>
            </div>
        </div>
    )
}
