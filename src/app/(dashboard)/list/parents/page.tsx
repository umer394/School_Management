import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { parentsData, role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

const columns = [
    {
        headers: "Info", accessor: "info"
    },
    {
        headers: "Student Name", accessor: "students", className: "hidden md:table-cell"
    },
    {
        headers: "Phone", accessor: "phone", className: "hidden md:table-cell"
    },
    {
        headers: "Address", accessor: "adress", className: "hidden md:table-cell"
    },
    {
        headers: "Actions", accessor: "action"
    },
]

type Parent = {
    id: number;
    name: string;
    students: string[];
    email?: string;
    phone: string;
    address: string;
}

export default function ParentsList() {

    const renderRow = (item: Parent) => (
        <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
            <td className="flex items-center gap-4 p-4">
                <div className="flex flex-col">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-xs text-gray-500">{item?.email}</p>
                </div>
            </td>
            <td className="hidden md:table-cell">{item.students.join(",")}</td>
            <td className="hidden md:table-cell">{item.phone}</td>
            <td className="hidden md:table-cell">{item.address}</td>
            <td>
                <div className="flex  items-center gap-2">
                    
                    {role === "admin" && (
                        <>
                        
                        <FormModal table={"parent"} type={"update"} data={item}/>
                        <FormModal table={"parent"} type={"delete"} id={item.id}/>
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
                <h1 className="text-lg font-semibold hidden md:block">All Parents</h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <TableSearch />
                    <div className="flex items-center gap-4 self-end ">
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                            <Image src={"/filter.png"} alt={""} height={14} width={14} />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                            <Image src={"/sort.png"} alt={""} height={14} width={14} />
                        </button>
                        {role === "admin" &&
                             <FormModal table={"parent"} type={"create"} />
                        }
                    </div>
                </div>
            </div>
            {/* List */}
            <Table columns={columns} renderRow={renderRow} data={parentsData} />
            {/* Pagination */}
            <Pagination />
        </div>
    )
}
