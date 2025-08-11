import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { eventsData, role } from "@/lib/data";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Class, Event, Prisma } from "@prisma/client";
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

type EventsListType = Event & {class:Class}
const renderRow = (item: EventsListType) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
        <td className="flex items-center gap-4 p-4">
            <div className="flex flex-col">
                <h3 className="font-semibold">{item.title}</h3>
            </div>
        </td>
        <td >{item.class.name}</td>
        <td className="hidden md:table-cell">{new Intl.DateTimeFormat("en-US").format(item.startTime)}</td>
        <td className="hidden md:table-cell">{item.startTime.toLocaleTimeString("en-US",{
            hour:"2-digit",
            minute:"2-digit",
            hour12:false
        })}</td>
        <td className="hidden md:table-cell">{item.endTime.toLocaleTimeString("en-US",{
            hour:"2-digit",
            minute:"2-digit",
            hour12:false
        })}</td>
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

export default async function EventsList({ searchParams, }: { searchParams?: { [key:string] : string | undefined } }) {

    // const searchParams = useSearchParams()  This is easy but we can't use it in server component
    // const page = page ? parseInt(page) : 1;
    // const page = searchParams.page ? parseInt(searchParams.page) : 1;
    const { page,...queryParams} = searchParams || {}
    const p = page ? parseInt(Array.isArray(page) ? page[0] : page) : 1;

    // URL Params Condition

    const query:Prisma.EventWhereInput = {}

    if(queryParams){
        for(const [key,value] of Object.entries(queryParams)){
            if(value !== undefined){
                switch(key){
                    case "search":
                        query.title = {contains:value,mode:"insensitive"};
                        break;
                    default:
                        break; 
                    
                }
            }
        }
    }

    const [data,count] =  await prisma.$transaction([

        prisma.event.findMany({
            where:query,
            include:{
                class:true,
            },
            take:ITEM_PER_PAGE,
            skip:ITEM_PER_PAGE * (p-1)
        }),

        prisma.event.count({where:query})

    ])


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
            <Table columns={columns} renderRow={renderRow} data={data} />
            {/* Pagination */}
            <Pagination page={p} count={count} />
        </div>
    )
}
