import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { examsData, role } from "@/lib/data";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Class, Exam, Lesson, Prisma, Subject, Teacher } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

const columns = [
    {
        headers: "Subject", accessor: "subject",
    },
    {
        headers: "Class", accessor: "class",  
    },
    {
        headers: "Teacher", accessor: "teacher", className: "hidden md:table-cell"
    },
    {
        headers: "Date", accessor: "date", className: "hidden md:table-cell"
    },
    {
        headers: "Actions", accessor: "action"
    },
]

type ExamsListType = Exam & {lesson:{
    subject:Subject;
    class:Class;
    teacher:Teacher;
}}
const renderRow = (item: ExamsListType) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
        <td className="flex items-center gap-4 p-4">
            <div className="flex flex-col">
                <h3 className="font-semibold">{item.lesson.subject.name}</h3>
            </div>
        </td>
        <td >{item.lesson.class.name}</td>
        <td className="hidden md:table-cell">{item.lesson.teacher.name}</td>
        <td className="hidden md:table-cell">{new Intl.DateTimeFormat("en-US").format(item.startTime)}</td>
        <td>
            <div className="flex  items-center gap-2">
            {role === "admin" && (
                    <>
                    <FormModal table={"exam"} type={"update"} data={item}/>
                    <FormModal table={"exam"} type={"delete"} id={item.id}/>
                    </>
                )}

            </div>
        </td>
    </tr>
)

export default async function ExamList({ searchParams, }: { searchParams?: { [key:string] : string | undefined } }) {

    const { page,...queryParams} = searchParams || {}
    const p = page ? parseInt(Array.isArray(page) ? page[0] : page) : 1;

    // URL Params Condition

    const query:Prisma.ExamWhereInput = {}

    if(queryParams){
        for(const [key,value] of Object.entries(queryParams)){
            if(value !== undefined){
                switch(key){
                    case "classId":
                        query.lesson = {classId : parseInt(value)}; 
                        break;
                    case "teacherId":
                        query.lesson= {
                            teacherId:value
                        }; 
                        break;
                    case "search":
                        query.lesson = {
                            subject:{name:{contains:value,mode:"insensitive"}},
                        };
                        break;
                    default:
                        break;
                    
                }
            }
        }
    }

    const [data,count] =  await prisma.$transaction([

        prisma.exam.findMany({
            where:query,
            include:{
                lesson:{
                    select:{
                        subject:{select:{name:true}},
                        teacher:{select:{name:true}},
                        class:{select:{name:true}},
                    }
                }
            },
            take:ITEM_PER_PAGE,
            skip:ITEM_PER_PAGE * (p-1)
        }),

        prisma.exam.count({where:query})

    ])
    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            {/* TOP */}
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold hidden md:block">All Exam</h1>
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
                        
                        <FormModal table={"exam"} type={"create"} />
                        
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
