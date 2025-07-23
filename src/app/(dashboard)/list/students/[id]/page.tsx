import Announcements from "@/components/Announcements";
import BigCalendar from "@/components/BigCalendar";
import Image from "next/image";
import Link from "next/link";
import Performance from "@/components/Performance";


export default function SingleStudentsPage() {
  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
     {/* {Left} */}
     <div className="w-full xl:w-2/3">
     {/* Top */}
     <div className="flex flex-col lg:flex-row gap-4">
        {/* User Info Card */}
        <div className="bg-lamaSky py-3 px-2 rounded-md flex-1 flex gap-4">
            <div className="w-1/3">
                <Image src={"https://images.pexels.com/photos/5414817/pexels-photo-5414817.jpeg?auto=compress&cs=tinysrgb&w=1200"} alt={""} width={124} height={124} className="w-36 h-36 rounded-full object-cover"/>
            </div>
            <div className="w-2/3 flex flex-col justify-between  gap-2">
            
            <h1 className="font-semibold text-xl ">Cameron Moran</h1>
            <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <div className="flex items-center justify-between  gap-2 flex-wrap text-xs font-medium">
                <div className="w-full md:w-1/3  lg:w-full 2xl:w-1/3 flex items-center gap-2">
                    <Image src={"/blood.png"} alt={""} width={14} height={14} />
                    <span>A+</span>     
                </div>
                <div className="w-full md:w-1/3  lg:w-full 2xl:w-1/3 flex items-center gap-2">
                    <Image src={"/date.png"} alt={""} width={14} height={14} />
                    <span>Januaury 2025</span>     
                </div>
                <div className="w-full md:w-1/3  lg:w-full 2xl:w-1/3 flex items-center gap-2">
                    <Image src={"/mail.png"} alt={""} width={14} height={14} />
                    <span>user@gmail.com</span>     
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3  flex items-center gap-2">
                    <Image src={"/phone.png"} alt={""} width={14} height={14} />
                    <span>+92000000</span>     
                </div>  
            </div>
            </div>
        </div>
        {/* Small Info Card */}
        <div className="flex-1 flex gap-4 justify-between flex-wrap">
            {/* Card */}
            <div className="bg-white p-4 rounded-md flex items-center gap-4 w-full md:w-[48%] lg:w-[46%]">
              <Image
                src="/singleAttendance.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">90%</h1>
                <span className="text-sm text-gray-400">Attendance</span>
              </div>
            </div>
            {/* Card */}
           <div className="bg-white p-4 rounded-md flex items-center gap-4 w-full md:w-[48%] lg:w-[46%]">
              <Image
                src="/singleBranch.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">6th</h1>
                <span className="text-sm text-gray-400">Grade</span>
              </div>
            </div>
            {/* CARD */}
            <div className="bg-white p-4 rounded-md flex items-center gap-4 w-full md:w-[48%] lg:w-[46%]">
              <Image
                src="/singleLesson.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">18</h1>
                <span className="text-sm text-gray-400">Lessons</span>
              </div>
            </div>
            {/* CARD */}
            <div className="bg-white p-4 rounded-md flex items-center gap-4 w-full md:w-[48%] lg:w-[46%]">
              <Image
                src="/singleClass.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">6A</h1>
                <span className="text-sm text-gray-400">Class</span>
              </div>
            </div>
        </div>
     </div>
        {/* {Bottom} */}
        <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
            <h1>Teacher&apos;s Schedule</h1>
            <BigCalendar/>
        </div>
     </div>
     {/* Right */} 
     <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="bg-white p-3 rounded-md">
            <h1 className="text-xl ml-2 font-semibold">Shortcuts</h1>
            <div className="mt-4 flex gap-3 flex-wrap text-xs  text-gray-500">
                <Link  className="p-3 rounded-md bg-lamaSkyLight" href={""}>Student&apos;s Class</Link>
                <Link className="p-3 rounded-md bg-lamaPurpleLight"  href={""}>Student&apos;s Teachers</Link>
                <Link className="p-3 rounded-md bg-lamaSky"  href={""}>Student&apos;s Results</Link>
                <Link className="p-3 rounded-md bg-lamaYellowLight"  href={""}>Student&apos;s Exams</Link>
                <Link className="p-3 rounded-md bg-pink-50"  href={""}>Student&apos;s Assignments</Link>
            </div>
        </div>
        <Performance/>
        <Announcements/>
     </div>
    </div>
  );
}