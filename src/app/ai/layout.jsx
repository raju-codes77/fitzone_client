import { auth } from '@/lib/auth';
import { headers } from "next/headers";
import { redirect } from 'next/navigation';
import AINav from '@/components/AINav';

export default async function AILayout({ children }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect('/login');
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-950 flex flex-col">
      <AINav />
      <div className="flex-1 w-full w-full py-4 px-2 sm:px-4">
        {children}
      </div>
    </div>
  );
}
