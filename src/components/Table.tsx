export default function Table({
    columns,
    renderRow,
    data
}:{
    columns:{headers:string, accessor:string, className?:string}[];
    renderRow:(item:any) => React.ReactNode;
    data:any[];
}){
    return (
        <table className="w-full mt-4">
            <thead>
                <tr className="text-left text-sm text-gray-500">
                    {columns.map(col=>(
                        <th key={col.accessor} className={col.className}>{col.headers}</th>
                    ))}
                </tr>
            </thead>
            <tbody>{data.map((item)=>renderRow(item))}</tbody>
        </table>
    )
}