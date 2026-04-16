"use client";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ShoppingBag, Search, Filter, ChevronLeft, Download
} from 'lucide-react';
import { userDashboardData, UserOrder, statusColors } from '@/data/userDashboardData';
import Link from 'next/link';

export default function OrdersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOrders] = useState(userDashboardData.recentOrders); // Mock - replace with Prisma fetch

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push('/auth/signin?callbackUrl=/dashboard/orders');
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="animate-pulse h-12 w-80 bg-slate-800 rounded-2xl"></div>
      <div className="grid gap-4">
        {Array(8).fill(0).map((_, i) => (
          <div key={i} className="h-20 bg-slate-800 rounded-2xl"></div>
        ))}
      </div>
    </div>;
  }

  const filteredOrdersData = filteredOrders.filter(order =>
    order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.products.some(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const statusOptions = ['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'];

  return (
    <div className="min-h-screen pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/*Header*/}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard" className="p-2 hover:bg-slate-800 rounded-xl transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="text-5xl font-black bg-gradient-to-r from-white to-slate-300/50 bg-clip-text text-transparent mb-2">
              Order History
            </h1>
            <p className="text-xl text-slate-400 font-semibold">Track all your purchases</p>
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div 
        className="glass-card p-6 rounded-3xl border border-slate-700 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex flex-col lg:flex-row gap-4 items-center lg:items-end">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search orders or products..."
              className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-700 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Status Filter */}
          <select
            className="glass-card px-6 py-4 rounded-2xl border border-slate-700 bg-slate-800/50 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>

          {/* Actions */}
          <div className="flex gap-3">
            <motion.button
              className="glass-card p-4 rounded-2xl border border-slate-700 hover:shadow-glow-blue transition-all flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <Filter className="w-5 h-5" />
              <span className="font-semibold">Filters</span>
            </motion.button>
            <motion.button
              className="glass-card p-4 rounded-2xl border border-slate-700 hover:shadow-glow-emerald transition-all flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <Download className="w-5 h-5" />
              <span className="font-semibold">Export</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Orders Table */}
      <motion.div
        className="glass-card p-8 rounded-3xl border border-slate-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-6 font-bold text-white">Order</th>
                <th className="text-left py-6 font-bold text-white">Products</th>
                <th className="text-right py-6 font-bold text-white">Total</th>
                <th className="text-right py-6 font-bold text-white">Status</th>
                <th className="text-right py-6 font-bold text-white">Payment</th>
                <th className="text-right py-6 font-bold text-white">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrdersData.map((order, index) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.02 }}
                  className="group hover:bg-slate-800/30 border-b border-slate-700/50 transition-all cursor-pointer"
                >
                  <td className="py-6 pr-4">
                    <div className="font-bold text-xl text-white group-hover:text-blue-400">
                      {order.orderNumber}
                    </div>
                  </td>
                  <td className="py-6 pr-4">
                    <div className="space-y-1 max-w-xs">
                      {order.products.slice(0, 2).map((product, pIndex) => (
                        <div key={pIndex} className="flex items-center gap-2 text-slate-300">
                          <div className="w-3 h-3 bg-emerald-400 rounded-full flex-shrink-0"></div>
                          <span className="truncate">{product.title}</span>
                          <span className="text-slate-500">x{product.quantity}</span>
                        </div>
                      ))}
                      {order.products.length > 2 && (
                        <div className="text-slate-500 text-sm">+{order.products.length - 2} more</div>
                      )}
                    </div>
                  </td>
                  <td className="text-right py-6 pr-4">
                    <div className="font-bold text-2xl text-emerald-400 mb-1">
                      ${order.totalUSD.toFixed(2)}
                    </div>
                    <div className="text-slate-400 text-sm">
                      TZS {order.totalTZS.toLocaleString()}
                    </div>
                  </td>
                  <td className="text-right py-6 pr-4">
                    <span className={`inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold border capitalize ${
                      order.status === 'delivered' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
                      order.status === 'shipped' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                      order.status === 'processing' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                      'bg-slate-500/20 text-slate-400 border-slate-500/30'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="text-right py-6 pr-4">
                    <span className="inline-block px-3 py-1 bg-slate-800/50 border border-slate-700 rounded-xl text-slate-300 capitalize text-sm font-medium">
                      {order.paymentMethod}
                    </span>
                  </td>
                  <td className="text-right py-6">
                    <div className="text-slate-400 text-sm font-mono">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                </motion.tr>
              ))}
              {filteredOrdersData.length === 0 && (
                <motion.tr
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <td colSpan={6} className="py-20 text-center">
                    <ShoppingBag className="w-16 h-16 text-slate-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-slate-400 mb-2">No orders found</h3>
                    <p className="text-slate-500">Try adjusting your search or filter settings.</p>
                  </td>
                </motion.tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredOrdersData.length > 0 && (
          <div className="mt-12 flex items-center justify-between">
            <div className="text-slate-400">
              Showing <span className="font-bold text-white">{filteredOrdersData.length}</span> of{' '}
              <span className="font-bold text-white">{filteredOrdersData.length}</span> orders
            </div>
            <div className="flex gap-2">
              <button className="glass-card p-3 rounded-xl border border-slate-700 hover:shadow-glow-blue transition-all">
                Previous
              </button>
              <button className="glass-card p-3 rounded-xl border border-slate-700 bg-slate-700 hover:shadow-glow-emerald transition-all font-bold">
                1
              </button>
              <button className="glass-card p-3 rounded-xl border border-slate-700 hover:shadow-glow-blue transition-all">
                Next
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
