import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { eventsData, role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

const columns = [
    {
        headers: "Title", accessor: "title",
    },
    {
        headers: "Class", accessor: "class",  
    },
    {
        headers: "Date", accessor: "date", className: "hidden md:table-cell"
    },
    {
        headers: "Start Time", accessor: "startTime", className: "hidden md:table-cell"
    },
    {
        headers: "End Time", accessor: "endTime", className: "hidden md:table-cell"
    },
    {
        headers: "Actions", accessor: "action"
    },
]

type Events = {
   id: number;
    title: string;
    class: string;
    date: string;
    startTime: string;
    endTime: string;
}

export default function EventsList() {

    const renderRow = (item: Events) => (
        <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
            <td className="flex items-center gap-4 p-4">
                <div className="flex flex-col">
                    <h3 className="font-semibold">{item.title}</h3>
                </div>
            </td>
            <td >{item.class}</td>
            <td className="hidden md:table-cell">{item.date}</td>
            <td className="hidden md:table-cell">{item.startTime}</td>
            <td className="hidden md:table-cell">{item.endTime}</td>
            <td>
                <div className="flex  items-center gap-2">
                {role === "admin" && (
                        <>
                        <FormModal table={"event"} type={"update"} data={item}/>
                        <FormModal table={"event"} type={"delete"} id={item.id}/>
                        </>
                    )}

                </div>
            </td>
        </tr>
    )

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            {/* TOP */}
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold hidden md:block">All Events</h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <TableSearch />
                    <div className="flex items-center gap-4 self-end ">
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                            <Image src={"/filter.png"} alt={""} height={14} width={14} />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                            <Image src={"/sort.png"} alt={""} height={14} width={14} />
                        </button>
                        {role === "admin" && (
                        
                        <FormModal table={"event"} type={"create"} />
                        
                    )}
                    </div>
                </div>
            </div>
            {/* List */}
            <Table columns={columns} renderRow={renderRow} data={eventsData} />
            {/* Pagination */}
            <Pagination />
        </div>
    )
}
