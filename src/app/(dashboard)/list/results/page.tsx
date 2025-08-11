import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { resultsData, role } from "@/lib/data";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

const columns = [
    {
        headers: "Title", accessor: "title",
    },
    {
        headers: "Student", accessor: "student", 
    },
    {
        headers: "Score", accessor: "score",  className: "hidden md:table-cell"
    },
    {
        headers: "Teacher", accessor: "teacher", className: "hidden md:table-cell"
    },
    {
        headers: "Class", accessor: "class",  className: "hidden md:table-cell"
    },
    {
        headers: "Date", accessor: "Date", className: "hidden md:table-cell"
    },
    {
        headers: "Actions", accessor: "action"
    },
]

type ResultsListType = {
    id:number,
    title:string,
    studentName :string,
    teacherName:string,
    score:number,
    className:string,
    startTime: Date
}

const renderRow = (item: ResultsListType) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
        <td className="flex items-center gap-4 p-4">
            {item.title}
        </td>
        <td >{item.studentName}</td>
        <td className="hidden md:table-cell">{item.score}</td>
        <td className="hidden md:table-cell">{item.teacherName}</td>
        <td className="hidden md:table-cell">{item.className}</td>
        <td className="hidden md:table-cell">{new Intl.DateTimeFormat("en-US").format(item.startTime)}</td>
        <td>
            <div className="flex  items-center gap-2">
            {role === "admin" && (
                    <>
                    <FormModal table={"result"} type={"update"} data={item}/>
                    <FormModal table={"result"} type={"delete"} id={item.id}/>
                    </>
                )}

            </div>
        </td>
    </tr>
)
export default async function ResultsList({ searchParams, }: { searchParams?: { [key:string] : string | undefined } }) {

    const { page,...queryParams} = searchParams || {}
    const p = page ? parseInt(Array.isArray(page) ? page[0] : page) : 1;

    // URL Params Condition

    const query:Prisma.ResultWhereInput = {}

    if(queryParams){
        for(const [key,value] of Object.entries(queryParams)){
            if(value !== undefined){
                switch(key){
                    case "studentId":
                        query.studentId = value
                        break;
                    case "search":
                        query.OR = [
                            {exam:{title:{contains:value,mode:"insensitive"}}},
                            {student:{name:{contains:value,mode:"insensitive"}}},
                        ];
                        break;
                    default:
                        break;
                    
                }
            }
        }
    }

    const [dataRes,count] =  await prisma.$transaction([

        prisma.result.findMany({
            where:query,
            include:{
                student:{select:{name:true}},
                exam:{
                    include:{
                        lesson:{
                            select:{
                                class:{select:{name:true}},
                                teacher:{select:{name:true}},
                            }
                        }
                    }
                },
                assignment:{
                    include:{
                        lesson:{
                            select:{
                                class:{select:{name:true}},
                                teacher:{select:{name:true}},
                            }
                        }
                    }
                }
            },
            take:ITEM_PER_PAGE,
            skip:ITEM_PER_PAGE * (p-1)
        }),

        prisma.result.count({where:query})

    ])

    const data = dataRes.map(item=>{
        const assessment = item.exam || item.assignment

        if(!assessment) return null

        const isExam = "startTime" in assessment

        return {
            id:item.id,
            title:assessment.title,
            studentName :item.student.name,
            teacherName:assessment.lesson.teacher.name,
            score:item.score,
            className:assessment.lesson.class.name,
            startTime: isExam ? assessment.startTime : assessment.startDate

        }
})

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            {/* TOP */}
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold hidden md:block">All Results</h1>
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
                        
                        <FormModal table={"result"} type={"create"} />
                        
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
