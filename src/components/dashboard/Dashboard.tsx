import React, { useState } from 'react';
import { DashboardSidebar } from './DashboardSidebar';
import { MyModels } from './MyModels';
import { MyOrders } from './MyOrders';
import { AccountSettings } from './AccountSettings';

type DashboardView = 'models' | 'orders' | 'settings' | 'analytics';

export function Dashboard() {
  const [currentView, setCurrentView] = useState<DashboardView>('models');

  return (
    <div className="min-h-screen bg-[#000000] dark flex">
      
      {/* Sidebar */}
      <DashboardSidebar 
        currentView={currentView}
        onViewChange={setCurrentView}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {currentView === 'models' && <MyModels />}
        {currentView === 'orders' && <MyOrders />}
        {currentView === 'settings' && <AccountSettings />}
      </div>

    </div>
  );
}
