"use client";

import React, { useState } from 'react';

// Mock data representing Stripe payment histories
const MOCK_TRANSACTIONS = [
  { id: 'ch_3Mv1jaLkdIwHu7ix2b', email: 'user1@example.com', amount: 49.00, date: '2026-06-18 14:32' },
  { id: 'ch_3Mv2bcLkdIwHu7ix5n', email: 'johndoe@gmail.com', amount: 120.50, date: '2026-06-19 09:15' },
  { id: 'ch_3Mv5xyLkdIwHu7ix9p', email: 'alice.smith@outlook.com', amount: 9.99, date: '2026-06-20 11:02' },
  { id: 'ch_3Mv8zaLkdIwHu7ix1a', email: 'company_admin@techcorp.com', amount: 499.00, date: '2026-06-20 18:45' },
];

const AdminTransactionsPage = () => {
  const [transactions] = useState(MOCK_TRANSACTIONS);

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen bg-slate-950 text-slate-100">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-50">Stripe Payment History</h1>
        <p className="text-sm text-slate-400">A read-only overview of all platform transactions.</p>
      </div>

      <div className="overflow-x-auto bg-slate-900 rounded-lg shadow-xl border border-slate-800">
        <table className="min-w-full divide-y divide-slate-800 text-left text-sm text-slate-300">
          <thead className="bg-slate-850 text-xs font-semibold uppercase tracking-wider text-slate-400">
            <tr>
              <th scope="col" className="px-6 py-3">Transaction ID</th>
              <th scope="col" className="px-6 py-3">User Email</th>
              <th scope="col" className="px-6 py-3">Amount</th>
              <th scope="col" className="px-6 py-3">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {transactions.map((tx) => (
              <tr key={tx.id} className="hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4 font-mono text-xs text-slate-400 selection:bg-indigo-900 selection:text-indigo-200">
                  {tx.id}
                </td>
                <td className="px-6 py-4 font-medium text-slate-200">
                  {tx.email}
                </td>
                <td className="px-6 py-4 font-semibold text-emerald-400">
                  ${tx.amount.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-slate-400 whitespace-nowrap">
                  {tx.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {transactions.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            No transactions found.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTransactionsPage;