import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import {  lessonsData, role } from "@/lib/data";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Class, Lesson, Prisma, Subject, Teacher } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

const columns = [
    {
        headers: "Subject Name", accessor: "subject"
    },
    {
        headers: "Class", accessor: "class", className: "hidden md:table-cell"
    },
    {
        headers: "Teacher", accessor: "teacher", className: "hidden md:table-cell"
    },
    {
        headers: "Actions", accessor: "action"
    },
]

type LessonsListType = Lesson & {subject:Subject} & {teacher:Teacher} & {class:Class}
const renderRow = (item: LessonsListType) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
        <td className="flex items-center gap-4 p-4">
            <div className="flex flex-col">
                <h3 className="font-semibold">{item.subject.name}</h3>
            </div>
        </td>
        <td className="">{item.class.name}</td>
        <td className="hidden md:table-cell">{item.teacher.name}</td>
        <td>
            <div className="flex  items-center gap-2">
            {role === "admin" && (
                    <>
                    <FormModal table={"lesson"} type={"update"} data={item}/>
                    <FormModal table={"lesson"} type={"delete"} id={item.id}/>
                    </>
                )}

            </div>
        </td>
    </tr>
)

export default async function LessonsList({ searchParams, }:  { searchParams: Promise<{ [key:string]:string| undefined}>  }) {

    const { page,...queryParams} = await searchParams
    const p = page ? parseInt(page) : 1;

    // URL Params Condition

    const query:Prisma.LessonWhereInput = {}

    if(queryParams){
        for(const [key,value] of Object.entries(queryParams)){
            if(value !== undefined){
                switch(key){
                    case "classId":
                        query.classId = parseInt(value); 
                        break;
                    case "teacherId":
                        query.teacherId = value; 
                        break;
                    case "search":
                        query.OR = [
                            {subject:{name:{contains:value,mode:"insensitive"}}},
                            {teacher:{name:{contains:value,mode:"insensitive"}}}
                        ] 
                        break;
                    default:
                        break;
                    
                }
            }
        }
    }

    const [data,count] =  await prisma.$transaction([

        prisma.lesson.findMany({
            where:query,
            include:{
                subject:{select:{name:true}},
                teacher:{select:{name:true}},
                class:{select:{name:true}},
            },
            take:ITEM_PER_PAGE,
            skip:ITEM_PER_PAGE * (p-1)
        }),

        prisma.lesson.count({where:query})

    ])

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            {/* TOP */}
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold hidden md:block">All Lessons</h1>
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
                        
                        <FormModal table={"lesson"} type={"create"} />
                        
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
