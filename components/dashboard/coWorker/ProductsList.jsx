import Table from '../Table';
import { addCommas } from '@/utils/main';

const ProductsList = ({ products }) => {
    return (
        <div className='flex flex-col'>
            {products != null &&
                <Table
                    headers={["قیمت", "تعداد", "وزن", "نام"]}
                    rowsData={["price", "count", "weight", "product_id.name"]}
                    rows={products}
                    headerClasses={["", "", "", ""]}
                    dataModifier={(cellData, cellIndex, rowIndex) => {
                        if (cellIndex == 0) {
                            return (<div className='rtl'> {addCommas(cellData) + " " + "ریال"} </div>);
                        }
                        if (cellIndex == 2) {
                            return (<div className='rtl'> {(!cellData ? "-" : cellData + " " + "گرم")} </div>);
                        }
                        return cellData;
                    }}
                />
            }
        </div>
    );
};

export default ProductsList;