import React from 'react';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { BrandCard } from '../BrandCard';
import { motion } from 'motion/react';

const orders = [
  {
    id: 'ORD-2024-1156',
    model: 'Medieval Castle',
    status: 'Delivered',
    date: '2024-11-15',
    deliveryDate: '2024-11-22',
    total: 234.50,
    bricks: 2847,
    tracking: 'SF1234567890'
  },
  {
    id: 'ORD-2024-1289',
    model: 'Fire Dragon',
    status: 'In Transit',
    date: '2024-11-28',
    deliveryDate: '2024-12-05',
    total: 312.80,
    bricks: 3210,
    tracking: 'SF2345678901'
  },
  {
    id: 'ORD-2024-1312',
    model: 'Racing Car',
    status: 'Processing',
    date: '2024-12-01',
    deliveryDate: '2024-12-08',
    total: 89.99,
    bricks: 892,
    tracking: null
  }
];

const statusConfig = {
  'Delivered': { icon: CheckCircle, color: '#45A29E', bg: '#45A29E20' },
  'In Transit': { icon: Truck, color: '#FFD700', bg: '#FFD70020' },
  'Processing': { icon: Clock, color: '#999999', bg: '#99999920' }
};

export function MyOrders() {
  return (
    <div className="p-8">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-white mb-2">My Orders</h1>
        <p className="text-white/60">Track your physical brick sets</p>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {orders.map((order, index) => {
          const StatusIcon = statusConfig[order.status as keyof typeof statusConfig].icon;
          const statusColor = statusConfig[order.status as keyof typeof statusConfig].color;
          const statusBg = statusConfig[order.status as keyof typeof statusConfig].bg;

          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <BrandCard padding="lg" hover>
                <div className="grid md:grid-cols-3 gap-6">
                  
                  {/* Left - Order Info */}
                  <div className="md:col-span-2 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-white mb-1">{order.model}</h3>
                        <p className="text-white/40 text-sm">Order ID: {order.id}</p>
                      </div>
                      
                      <div
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                        style={{ backgroundColor: statusBg, color: statusColor }}
                      >
                        <StatusIcon className="w-4 h-4" />
                        <span className="text-sm">{order.status}</span>
                      </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#333333]">
                      <div>
                        <p className="text-white/40 text-sm mb-1">Order Date</p>
                        <p className="text-white">{order.date}</p>
                      </div>
                      <div>
                        <p className="text-white/40 text-sm mb-1">Est. Delivery</p>
                        <p className="text-white">{order.deliveryDate}</p>
                      </div>
                      <div>
                        <p className="text-white/40 text-sm mb-1">Total Bricks</p>
                        <p className="text-white">{order.bricks.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-white/40 text-sm mb-1">Total Amount</p>
                        <p className="text-white">${order.total.toFixed(2)}</p>
                      </div>
                    </div>

                    {/* Tracking */}
                    {order.tracking && (
                      <div className="pt-4 border-t border-[#333333]">
                        <p className="text-white/40 text-sm mb-2">Tracking Number</p>
                        <div className="flex items-center gap-3">
                          <code className="text-[#FFD700] font-mono">{order.tracking}</code>
                          <button className="text-[#FFD700] text-sm hover:underline">
                            Track Package
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right - Timeline */}
                  <div className="border-l border-[#333333] pl-6">
                    <p className="text-white/60 mb-4">Order Timeline</p>
                    <div className="space-y-4">
                      <TimelineItem
                        label="Order Placed"
                        date={order.date}
                        completed={true}
                      />
                      <TimelineItem
                        label="Processing"
                        completed={order.status !== 'Processing'}
                        current={order.status === 'Processing'}
                      />
                      <TimelineItem
                        label="Shipped"
                        completed={order.status === 'Delivered'}
                        current={order.status === 'In Transit'}
                      />
                      <TimelineItem
                        label="Delivered"
                        completed={order.status === 'Delivered'}
                      />
                    </div>
                  </div>

                </div>
              </BrandCard>
            </motion.div>
          );
        })}
      </div>

    </div>
  );
}

// Timeline Item Component
function TimelineItem({ 
  label, 
  date, 
  completed = false, 
  current = false 
}: { 
  label: string; 
  date?: string; 
  completed?: boolean; 
  current?: boolean;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
        completed
          ? 'bg-[#45A29E] border-[#45A29E]'
          : current
          ? 'bg-[#FFD700] border-[#FFD700]'
          : 'bg-transparent border-[#333333]'
      }`}>
        {completed && (
          <CheckCircle className="w-4 h-4 text-black" />
        )}
      </div>
      <div>
        <p className={`text-sm ${
          completed || current ? 'text-white' : 'text-white/40'
        }`}>
          {label}
        </p>
        {date && <p className="text-xs text-white/30">{date}</p>}
      </div>
    </div>
  );
}
