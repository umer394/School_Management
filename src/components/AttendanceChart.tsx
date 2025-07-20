'use client'
import Image from "next/image"
import React, { PureComponent } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Mon',
    present: 4000,
    absent: 2400,
    
  },
  {
    name: 'Tue',
    present: 3000,
    absent: 1398,
    
  },
  {
    name: 'Wed',
    present: 2000,
    absent: 9800,
    
  },
  {
    name: 'Thurs',
    present: 2780,
    absent: 3908,
  },
  {
    name: 'Fri',
    present: 1890,
    absent: 4800,
 
  },
  {
    name: 'Sat',
    present: 2390,
    absent: 3800,

  },
];
export default function AttendanceChart(){
    return (
        <div className="bg-white rounded-xl p-4 h-full">
            <div className="flex justify-between items-center">
                <h1 className="text-lg font-semibold ">Attendance</h1>
                <Image src={"/moreDark.png"} alt={""} width={20} height={20}/>
            </div>
            <ResponsiveContainer width="100%" height="90%">
        <BarChart
          width={500}
          height={300}
          data={data}
          barSize={20}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd"/>
          <XAxis dataKey="name" axisLine={false} tick={{fill:"#d1d5db"}} tickLine={false}/>
          <YAxis axisLine={false} tick={{fill:"#d1d5db"}} tickLine={false}/>
          <Tooltip contentStyle={{borderRadius:"10px",borderColor:"lightgray"}}/>
          <Legend align="left" verticalAlign="top" wrapperStyle={{paddingTop:"20px",paddingBottom:"40px"}}/>
          <Bar dataKey="present" fill="#C3EBFA" radius={[10,10,0,0]}  legendType="circle"/>
          <Bar dataKey="absent" fill="#FAE27C" radius={[10,10,0,0]} legendType="circle"/>
        </BarChart>
      </ResponsiveContainer>
        </div>
    )
}