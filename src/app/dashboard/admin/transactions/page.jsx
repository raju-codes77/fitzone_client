import { getPaymentData } from '@/lib/api/payment';
import React from 'react';

const AdminTransactionsPage = async () => {
  const transactions = await getPaymentData();

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen bg-slate-950 text-slate-100">
      
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-50">
          Stripe Payment History
        </h1>

        <p className="text-sm text-slate-400">
          A read-only overview of all platform transactions.
        </p>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto bg-slate-900 rounded-lg shadow-xl border border-slate-800">
        
        <table className="min-w-full divide-y divide-slate-800 text-left text-sm text-slate-300">
          
          {/* Table Head */}
          <thead className="bg-slate-900 text-xs font-semibold uppercase tracking-wider text-slate-400">
            <tr>
              <th className="px-6 py-3">Transaction ID</th>
              <th className="px-6 py-3">User Email</th>
              <th className="px-6 py-3">Amount</th>
              <th className="px-6 py-3">Payment Date</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-slate-800">
            
            {transactions?.length > 0 ? (
              transactions.map((tx) => (
                <tr
                  key={tx._id}
                  className="hover:bg-slate-800/50 transition-colors"
                >
                  
                  {/* Transaction ID */}
                  <td className="px-6 py-4 font-mono text-xs text-slate-400 break-all">
                    {tx.sessionId}
                  </td>

                  {/* User Email */}
                  <td className="px-6 py-4 font-medium text-slate-200">
                    {tx.userEmail}
                  </td>

                  {/* Amount */}
                  <td className="px-6 py-4 font-semibold text-emerald-400">
                    ${Number(tx.price).toFixed(2)}
                  </td>

                  {/* Payment Date */}
                  <td className="px-6 py-4 text-slate-400 whitespace-nowrap">
                    {new Date(tx.paymentDate).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-12 text-slate-500"
                >
                  No transactions found.
                </td>
              </tr>
            )}

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTransactionsPage;