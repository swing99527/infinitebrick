import React, { useState } from 'react';
import { Package, ShoppingCart, Download, Share2, AlertCircle } from 'lucide-react';
import { BrandButton } from '../BrandButton';
import { BrandCard } from '../BrandCard';

interface RightPanelProps {
  hasModel: boolean;
}

const brickParts = [
  { id: '3001', name: '2x4 Brick', color: 'Red', quantity: 245, price: 0.08 },
  { id: '3003', name: '2x2 Brick', color: 'Blue', quantity: 189, price: 0.06 },
  { id: '3004', name: '1x2 Brick', color: 'Yellow', quantity: 156, price: 0.05 },
  { id: '3005', name: '1x1 Brick', color: 'White', quantity: 342, price: 0.04 },
  { id: '3010', name: '1x4 Brick', color: 'Gray', quantity: 123, price: 0.07 },
  { id: '3622', name: '1x3 Brick', color: 'Black', quantity: 98, price: 0.06 }
];

export function RightPanel({ hasModel }: RightPanelProps) {
  const [activeTab, setActiveTab] = useState<'parts' | 'delivery'>('parts');

  const totalBricks = brickParts.reduce((sum, part) => sum + part.quantity, 0);
  const materialCost = brickParts.reduce((sum, part) => sum + (part.quantity * part.price), 0);
  const shippingCost = 15.99;
  const totalCost = materialCost + shippingCost;

  if (!hasModel) {
    return (
      <div className="h-full flex items-center justify-center bg-[#080808] p-8">
        <div className="text-center space-y-4 max-w-sm">
          <div className="w-16 h-16 mx-auto bg-[#1F1F1F] rounded-full flex items-center justify-center border border-[#333333]">
            <Package className="w-8 h-8 text-white/20" />
          </div>
          <div>
            <h3 className="text-white mb-2">No model yet</h3>
            <p className="text-white/40 text-sm">
              Generate a model to see parts list and delivery options
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-[#080808]">
      
      {/* Tabs */}
      <div className="flex border-b border-[#333333]">
        <button
          onClick={() => setActiveTab('parts')}
          className={`flex-1 px-4 py-3 text-sm transition-colors ${
            activeTab === 'parts'
              ? 'text-[#FFD700] border-b-2 border-[#FFD700]'
              : 'text-white/60 hover:text-white'
          }`}
        >
          <Package className="w-4 h-4 inline mr-2" />
          Parts List
        </button>
        <button
          onClick={() => setActiveTab('delivery')}
          className={`flex-1 px-4 py-3 text-sm transition-colors ${
            activeTab === 'delivery'
              ? 'text-[#FFD700] border-b-2 border-[#FFD700]'
              : 'text-white/60 hover:text-white'
          }`}
        >
          <ShoppingCart className="w-4 h-4 inline mr-2" />
          Purchase
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        
        {/* Parts List Tab */}
        {activeTab === 'parts' && (
          <>
            {/* Summary */}
            <BrandCard padding="md">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Total Bricks</span>
                  <span className="text-white">{totalBricks}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Unique Parts</span>
                  <span className="text-white">{brickParts.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Colors</span>
                  <span className="text-white">24</span>
                </div>
              </div>
            </BrandCard>

            {/* Parts Table */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white">Bill of Materials</h3>
                <button className="text-[#FFD700] text-sm hover:underline">
                  <Download className="w-4 h-4 inline mr-1" />
                  Export BOM
                </button>
              </div>

              <div className="space-y-2">
                {brickParts.map((part) => (
                  <div
                    key={`${part.id}-${part.color}`}
                    className="bg-[#1F1F1F] border border-[#333333] rounded-lg p-3 hover:border-[#FFD700]/30 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm mb-1">{part.name}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-white/40 text-xs">ID: {part.id}</span>
                          <span className="text-white/20">•</span>
                          <span className="text-white/40 text-xs">{part.color}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white">×{part.quantity}</p>
                        <p className="text-white/40 text-xs">
                          ${(part.quantity * part.price).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4 border-t border-[#333333]">
              <BrandButton variant="secondary" size="md" className="w-full">
                <Download className="w-4 h-4" />
                Download Instructions
              </BrandButton>
              <BrandButton variant="ghost" size="md" className="w-full">
                <Share2 className="w-4 h-4" />
                Share BOM
              </BrandButton>
            </div>
          </>
        )}

        {/* Delivery Tab */}
        {activeTab === 'delivery' && (
          <>
            {/* Pricing Breakdown */}
            <BrandCard padding="md">
              <h3 className="text-white mb-4">Price Breakdown</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-white/60">
                  <span>Materials ({totalBricks} bricks)</span>
                  <span>${materialCost.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-white/60">
                  <span>Shipping (SF Express)</span>
                  <span>${shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-white/60">
                  <span>Instructions Print</span>
                  <span>$4.99</span>
                </div>
                <div className="h-px bg-[#333333] my-3" />
                <div className="flex items-center justify-between text-white">
                  <span>Total</span>
                  <span className="text-[#FFD700]">${(totalCost + 4.99).toFixed(2)}</span>
                </div>
              </div>
            </BrandCard>

            {/* Delivery Options */}
            <div>
              <h3 className="text-white mb-4">Delivery Method</h3>
              <div className="space-y-3">
                <label className="block">
                  <input
                    type="radio"
                    name="delivery"
                    defaultChecked
                    className="mr-3 accent-[#FFD700]"
                  />
                  <span className="text-white">Standard (7-10 days)</span>
                  <span className="text-white/40 text-sm block ml-6">
                    Tracked shipping via SF Express
                  </span>
                </label>
                <label className="block">
                  <input
                    type="radio"
                    name="delivery"
                    className="mr-3 accent-[#FFD700]"
                  />
                  <span className="text-white">Express (3-5 days) +$15</span>
                  <span className="text-white/40 text-sm block ml-6">
                    Priority handling
                  </span>
                </label>
              </div>
            </div>

            {/* Availability Notice */}
            <div className="bg-[#45A29E]/10 border border-[#45A29E]/30 rounded-lg p-4">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-[#45A29E] flex-shrink-0" />
                <div>
                  <p className="text-[#45A29E] text-sm mb-1">All parts in stock</p>
                  <p className="text-white/60 text-xs">
                    Estimated shipping: Dec 5-8, 2024
                  </p>
                </div>
              </div>
            </div>

            {/* Purchase Button */}
            <BrandButton variant="primary" size="lg" className="w-full">
              <ShoppingCart className="w-5 h-5" />
              Purchase Physical Set
            </BrandButton>

            {/* Additional Info */}
            <div className="space-y-2 text-xs text-white/40">
              <p>✓ 30-day return policy</p>
              <p>✓ Missing part guarantee</p>
              <p>✓ Quality certified by TÜV</p>
            </div>
          </>
        )}

      </div>

    </div>
  );
}
