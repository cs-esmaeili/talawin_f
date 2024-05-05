import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const Chart = () => {
    const chartContainer = useRef(null);

    useEffect(() => {
        // Initialize ECharts instance
        const myChart = echarts.init(chartContainer.current);

        // Specify chart configuration and data
        const option = {
            // Your ECharts configuration options
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['شنبه', 'یک شنبه', 'دوشنبه', 'سه شنبه', 'چهار شنبه', 'پنجشنبه', 'جمعه' , 'صشیش'],
                axisLabel: {
                    color: 'white' // Set the color of xAxis labels to white
                }
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    color: 'white' // Set the color of xAxis labels to white
                }
            },
            series: [
                {
                    data: [820, 932, 901, 934, 1290, 1330, 1320 , 1325],
                    type: 'line',
                    areaStyle: {
                        color: 'rgba(255, 255, 0, 0.3)' // Set the color of the area under the line to light yellow
                    },
                    symbolSize: 10, // Adjust the size of the symbols (dots)
                    lineStyle: {
                        color: 'yellow' // Set the color of the line to yellow
                    },
                    itemStyle: {
                        color: 'yellow', // Set the color of the symbols (dots) to yellow
                        borderColor: 'white', // Set the color of the border to white
                        borderWidth: 2 // Adjust the width of the border
                    },
                    symbol: 'circle' // Specify the symbol shape as a circle
                }
            ],
        };

        // Set the configuration to the ECharts instance
        myChart.setOption(option);
        // Clean up function to remove the chart instance when the component unmounts
        return () => {
            myChart.dispose();
        };
    }, []);

    return <div className='flex grow w-full h-full' style={{ margin: 0, padding: 0 }} ref={chartContainer} />;
};

export default Chart;