// src/app/dashboard/admin/components/AdminCharts.jsx
'use client';

import { getClasses } from '@/lib/api/classes';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
const allClasses=await getClasses();
const areaData = [
  { name: 'Jan', bookings: 120, users: 400 },
  { name: 'Feb', bookings: 210, users: 550 },
  { name: 'Mar', bookings: 180, users: 700 },
  { name: 'Apr', bookings: 340, users: 820 },
  { name: 'May', bookings: 410, users: 1050 },
  { name: 'Jun', bookings: 532, users: 1240 },
];

const pieData = [
  { name: 'Active Users', value: 840, color: '#22d3ee' },      // cyan-400
  { name: 'Active Classes', value: allClasses.length, color: '#a855f7' },     // purple-500
  { name: 'Filled Bookings', value: 532, color: '#34d399' },   // emerald-400
];


export function AdminCharts() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      
      {/* Main Area Chart Layer */}
      <div className="lg:col-span-2 rounded-xl border border-zinc-800/60 bg-zinc-900/30 p-6 backdrop-blur-md">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-white">Platform Growth Trends</h3>
            <p className="text-xs text-zinc-500">Comparing user registration and class engagement</p>
          </div>
        </div>
        
        <div className="h-72 w-full text-xs">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={areaData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#34d399" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#34d399" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="#52525b" tickLine={false} />
              <YAxis stroke="#52525b" tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px', color: '#fff' }}
              />
              <Area type="monotone" dataKey="users" name="Total Users" stroke="#22d3ee" strokeWidth={2} fillOpacity={1} fill="url(#colorUsers)" />
              <Area type="monotone" dataKey="bookings" name="Bookings" stroke="#34d399" strokeWidth={2} fillOpacity={1} fill="url(#colorBookings)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Donut/Circle Chart Layer */}
      <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/30 p-6 backdrop-blur-md flex flex-col justify-between">
        <div>
          <h3 className="text-base font-semibold text-white">Metrics Distribution</h3>
          <p className="text-xs text-zinc-500">Ratio mapping across core records</p>
        </div>

        <div className="relative h-48 my-4 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px', color: '#fff' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute text-center pointer-events-none">
            <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">Assets</span>
            <p className="text-xl font-bold text-white">Healthy</p>
          </div>
        </div>

        {/* Custom Legend */}
        <div className="space-y-2">
          {pieData.map((item, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-zinc-400">{item.name}</span>
              </div>
              <span className="font-semibold text-zinc-200">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}