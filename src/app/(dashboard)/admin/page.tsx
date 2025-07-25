import Announcements from "@/components/Announcements";
import AttendanceChart from "@/components/AttendanceChart";
import CountChart from "@/components/CountChart";
import EventCalender from "@/components/EventCalender";
import FinanceChart from "@/components/FinanceChart";
import UserCard from "@/components/UserCard";

export default function AdminPage(){
    return(
        <div className="p-4 flex  gap-4 flex-col md:flex-row">
            {/* {Left} */}
            <div className="w-full lg:w-2/3 flex flex-col gap-8">
                {/* {USer Cards} */}
                <div className="flex gap-4 justify-between flex-wrap">
                    <UserCard type="student"/>
                    <UserCard type="teacher"/>
                    <UserCard type="parent"/>
                    <UserCard type="staff"/>
                </div>
                {/* Middle Charts */}
                <div className="flex gap-4 flex-col lg:flex-row">
                    {/* CountChart */}
                    <div className="w-full lg:w-1/3 h-[450px]  ">
                        <CountChart/>
                    </div>
                    {/* Attendance Chart */}
                    <div className="w-full lg:w-2/3 h-[450px]">
                        <AttendanceChart/>
                    </div>
                </div>
                {/* Bottom Charts */}
                <div className="w-full h-[500px]">
                    <FinanceChart/>
                </div>
            </div>
            {/* {Right} */}
            <div className="w-full lg:w-1/3 flex flex-col gap-8">
                <EventCalender/>
                <Announcements/>
            </div>
        </div>
    )
}