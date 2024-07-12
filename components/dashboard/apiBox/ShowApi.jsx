import SyntaxHighlighter from 'react-syntax-highlighter';
import { tomorrowNightEighties } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useSelector } from 'react-redux';

const ShowApi = () => {

    const apiData = useSelector((state) => state.apiData.value);


    return (
        <div className='flex flex-col  w-full relative overflow-x-auto h-full justify-center'>
            <SyntaxHighlighter language="javascript" style={tomorrowNightEighties} wrapLongLines>
                {JSON.stringify(apiData, null, 2)}
            </SyntaxHighlighter>
        </div>
    );
};

export default ShowApi;