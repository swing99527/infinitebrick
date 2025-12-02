import React, { useState } from 'react';
import { User, Mail, Bell, CreditCard, Globe, Shield } from 'lucide-react';
import { BrandCard } from '../BrandCard';
import { BrandButton } from '../BrandButton';

export function AccountSettings() {
  const [language, setLanguage] = useState('en');

  return (
    <div className="p-8 max-w-4xl">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-white mb-2">Account Settings</h1>
        <p className="text-white/60">Manage your profile and preferences</p>
      </div>

      <div className="space-y-6">
        
        {/* Profile Section */}
        <BrandCard padding="lg">
          <div className="flex items-start gap-4 mb-6">
            <User className="w-6 h-6 text-[#FFD700]" />
            <div className="flex-1">
              <h3 className="text-white mb-1">Profile Information</h3>
              <p className="text-white/40 text-sm">Update your account details</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white/80 mb-2 text-sm">First Name</label>
                <input
                  type="text"
                  defaultValue="John"
                  className="w-full px-4 py-2.5 bg-[#2A2A2A] border border-[#333333] rounded-lg text-white focus:border-[#FFD700] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-white/80 mb-2 text-sm">Last Name</label>
                <input
                  type="text"
                  defaultValue="Doe"
                  className="w-full px-4 py-2.5 bg-[#2A2A2A] border border-[#333333] rounded-lg text-white focus:border-[#FFD700] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-white/80 mb-2 text-sm">Email</label>
              <input
                type="email"
                defaultValue="john.doe@example.com"
                className="w-full px-4 py-2.5 bg-[#2A2A2A] border border-[#333333] rounded-lg text-white focus:border-[#FFD700] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-white/80 mb-2 text-sm">Bio</label>
              <textarea
                rows={3}
                defaultValue="Brick enthusiast and creative builder"
                className="w-full px-4 py-2.5 bg-[#2A2A2A] border border-[#333333] rounded-lg text-white focus:border-[#FFD700] focus:outline-none resize-none"
              />
            </div>

            <BrandButton variant="primary" size="md">
              Save Changes
            </BrandButton>
          </div>
        </BrandCard>

        {/* Language & Region */}
        <BrandCard padding="lg">
          <div className="flex items-start gap-4 mb-6">
            <Globe className="w-6 h-6 text-[#FFD700]" />
            <div className="flex-1">
              <h3 className="text-white mb-1">Language & Region</h3>
              <p className="text-white/40 text-sm">Set your preferred language</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-white/80 mb-2 text-sm">Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#2A2A2A] border border-[#333333] rounded-lg text-white focus:border-[#FFD700] focus:outline-none"
              >
                <option value="en">English</option>
                <option value="zh">中文 (Chinese)</option>
              </select>
            </div>
          </div>
        </BrandCard>

        {/* Notifications */}
        <BrandCard padding="lg">
          <div className="flex items-start gap-4 mb-6">
            <Bell className="w-6 h-6 text-[#FFD700]" />
            <div className="flex-1">
              <h3 className="text-white mb-1">Notifications</h3>
              <p className="text-white/40 text-sm">Manage your notification preferences</p>
            </div>
          </div>

          <div className="space-y-4">
            <NotificationToggle
              label="Email Notifications"
              description="Receive updates about your orders"
              defaultChecked={true}
            />
            <NotificationToggle
              label="Community Updates"
              description="Get notified about new models and likes"
              defaultChecked={true}
            />
            <NotificationToggle
              label="Marketing Emails"
              description="Receive news and promotions"
              defaultChecked={false}
            />
          </div>
        </BrandCard>

        {/* Billing */}
        <BrandCard padding="lg">
          <div className="flex items-start gap-4 mb-6">
            <CreditCard className="w-6 h-6 text-[#FFD700]" />
            <div className="flex-1">
              <h3 className="text-white mb-1">Billing & Payment</h3>
              <p className="text-white/40 text-sm">Manage payment methods</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-[#2A2A2A] border border-[#333333] rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-8 bg-[#FFD700] rounded flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-black" />
                </div>
                <div>
                  <p className="text-white text-sm">•••• •••• •••• 4242</p>
                  <p className="text-white/40 text-xs">Expires 12/25</p>
                </div>
              </div>
              <button className="text-[#FFD700] text-sm hover:underline">
                Edit
              </button>
            </div>

            <BrandButton variant="secondary" size="md">
              Add Payment Method
            </BrandButton>
          </div>
        </BrandCard>

        {/* Security */}
        <BrandCard padding="lg">
          <div className="flex items-start gap-4 mb-6">
            <Shield className="w-6 h-6 text-[#FFD700]" />
            <div className="flex-1">
              <h3 className="text-white mb-1">Security</h3>
              <p className="text-white/40 text-sm">Manage your account security</p>
            </div>
          </div>

          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 bg-[#2A2A2A] hover:bg-[#333333] border border-[#333333] rounded-lg text-white transition-colors">
              Change Password
            </button>
            <button className="w-full text-left px-4 py-3 bg-[#2A2A2A] hover:bg-[#333333] border border-[#333333] rounded-lg text-white transition-colors">
              Two-Factor Authentication
            </button>
          </div>
        </BrandCard>

        {/* Danger Zone */}
        <BrandCard padding="lg">
          <div className="space-y-4">
            <div>
              <h3 className="text-[#FF4D4F] mb-1">Danger Zone</h3>
              <p className="text-white/40 text-sm">Irreversible actions</p>
            </div>

            <div className="space-y-3">
              <button className="w-full px-4 py-3 bg-[#FF4D4F]/10 hover:bg-[#FF4D4F]/20 border border-[#FF4D4F]/30 rounded-lg text-[#FF4D4F] transition-colors">
                Delete Account
              </button>
            </div>
          </div>
        </BrandCard>

      </div>

    </div>
  );
}

// Notification Toggle Component
function NotificationToggle({ 
  label, 
  description, 
  defaultChecked 
}: { 
  label: string; 
  description: string; 
  defaultChecked: boolean;
}) {
  return (
    <label className="flex items-start justify-between gap-4 cursor-pointer">
      <div className="flex-1">
        <p className="text-white text-sm mb-1">{label}</p>
        <p className="text-white/40 text-xs">{description}</p>
      </div>
      <input
        type="checkbox"
        defaultChecked={defaultChecked}
        className="w-5 h-5 accent-[#FFD700] mt-1"
      />
    </label>
  );
}
