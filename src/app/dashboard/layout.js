import DashboardNavbar from '@/components/dashboard/DashboardNavbar';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import { auth } from '@/lib/auth';
import { headers } from "next/headers";
import React from 'react';

const DashboardLayout = async ({ children }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  return (
    <div className='flex h-screen'>
      <div className='flex flex-1 overflow-hidden'>

        {/* Sidebar */}
        <DashboardSidebar role={user?.role} name={user?.name} />

        <div className='flex-1 overflow-y-auto'>
          <div className='w-full'>
            <DashboardNavbar />
          </div>

          <main>
            {children}
          </main>
        </div>

      </div>
    </div>
  );
};

export default DashboardLayout;