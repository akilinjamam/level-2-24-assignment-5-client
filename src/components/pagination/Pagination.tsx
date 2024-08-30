import { useState } from "react";
import { leftAngle, rightAngle } from "../../icons/icons";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Pagination = ({allData, setPage}: {allData:any, setPage: any}) => {
    console.log(allData?.totalPage)
    const [count, setCount] = useState(1);
    
    const increaseDecrease = (value: 'increase' | 'decrease') => {
        const devidePageNo = Math.ceil(allData?.totalPage/5)

        if(value === 'increase'){
            if(count < devidePageNo){
                setCount(count + 1)
            }else{
                setCount(count + 0)
            }
        }
        if(value === 'decrease'){
            if(count > 1){
                setCount(count - 1)
            }else{
                setCount(1)
            }
        }
    }


    
    const pagination =  Array.from({length: allData?.totalPage}, (_, index) => {
        return {id: index+1}
    } );

    console.log(pagination)
    return (
        <div className="w-[270px] h-[50px]  flex items-center justify-between">
            <div onClick={() => increaseDecrease('decrease')} className="cursor-pointer">{leftAngle}</div>
            <div className="w-[200px] h-50px flex items-center">
                    {
                        pagination?.slice(((count * 5) - 5), (count * 5))?.map(box => {
                            return (
                                <div onClick={() => setPage(box.id)} className="w-[30px] h-[30px] bg-orange-400 flex items-center justify-center cursor-pointer mx-2">
                                    <p  className="text-white">{box.id}</p>
                                </div>
                            )
                        })
                    }
            </div>
            <div  onClick={() => increaseDecrease('increase')} className="cursor-pointer">{rightAngle}</div>
        </div>
    );
};

export default Pagination;