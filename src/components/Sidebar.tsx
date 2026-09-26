import React from 'react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-primary-container text-on-primary-container z-50 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="flex flex-col">
        {/* Logo and Hospital Pharmacy System branding */}
        <div className="h-16 px-margin flex items-center gap-space-sm bg-primary-container">
          <img
            alt="PharmaSync MedCore Logo"
            className="h-8 w-8 rounded-lg object-contain"
            src="https://lh3.googleusercontent.com/aida/AEtjO1WHLLPI8j-bYd26Ggl0d-A1c4CME-W5Xar5BxC_cMXa73I9paf5IwTb20O7PBFeCHjQdPnRoohRx69jya3Tv5O8mdJ1pTjr7Q2aqrzCAhqH3oDBsyKhr8Xqeehe4_Ott12GlwW3I6aLEvov2bdUdjB8-vGECljtcp8yXXzE8PsZ7qlUTBtaBP0rKjfMKoLr04ePJxj0-5XTeFAVv11Ueug57zTE0M3hdop8WWL_6lWUk6t-edOI23kwKVqd"
          />
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm text-surface font-bold tracking-tight leading-none">
              PharmaSync
            </span>
            <span className="font-label-sm text-[10px] text-primary-fixed-dim tracking-tight font-medium mt-0.5">
              ระบบบริหารจัดการคลังยาและจ่ายยา
            </span>
          </div>
        </div>

        {/* Menu Section Header */}
        <div className="px-margin pt-space-lg pb-space-xs">
          <span className="font-label-sm text-label-sm text-on-primary-container uppercase font-bold tracking-wider">
            เมนูการทำงานหลัก
          </span>
        </div>

        {/* Navigation items */}
        <nav className="flex flex-col gap-space-xs px-space-md">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`w-full text-left flex items-center gap-space-md px-space-md py-space-sm transition-colors rounded-lg shadow-sm ${
              activeTab === 'inventory'
                ? 'bg-surface-container-high text-on-surface font-label-lg font-bold'
                : 'text-primary-fixed-dim hover:bg-inverse-surface hover:text-surface font-body-md text-body-md'
            }`}
          >
            <span className="material-symbols-outlined text-secondary-fixed text-[20px]">
              inventory_2
            </span>
            <span>ระบบคลังยาและเวชภัณฑ์</span>
          </button>

          <button
            onClick={() => setActiveTab('prescriptions')}
            className={`w-full text-left flex items-center gap-space-md px-space-md py-space-sm transition-colors rounded-lg shadow-sm ${
              activeTab === 'prescriptions'
                ? 'bg-surface-container-high text-on-surface font-label-lg font-bold'
                : 'text-primary-fixed-dim hover:bg-inverse-surface hover:text-surface font-body-md text-body-md'
            }`}
          >
            <span className="material-symbols-outlined text-secondary-fixed text-[20px]">
              prescriptions
            </span>
            <span>ประวัติใบสั่งยาผู้ป่วย</span>
          </button>

          <button
            onClick={() => setActiveTab('dispensing-log')}
            className={`w-full text-left flex items-center gap-space-md px-space-md py-space-sm transition-colors rounded-lg shadow-sm ${
              activeTab === 'dispensing-log'
                ? 'bg-surface-container-high text-on-surface font-label-lg font-bold'
                : 'text-primary-fixed-dim hover:bg-inverse-surface hover:text-surface font-body-md text-body-md'
            }`}
          >
            <span className="material-symbols-outlined text-secondary-fixed text-[20px]">
              receipt_long
            </span>
            <span>บันทึกประวัติการจ่ายยา</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`w-full text-left flex items-center gap-space-md px-space-md py-space-sm transition-colors rounded-lg shadow-sm ${
              activeTab === 'analytics'
                ? 'bg-surface-container-high text-on-surface font-label-lg font-bold'
                : 'text-primary-fixed-dim hover:bg-inverse-surface hover:text-surface font-body-md text-body-md'
            }`}
          >
            <span className="material-symbols-outlined text-secondary-fixed text-[20px]">
              analytics
            </span>
            <span>รายงานสรุปและสถิติ</span>
          </button>
        </nav>
      </div>

      {/* Air-Gap Security Badge */}
      <div className="p-space-md mx-space-md mb-space-lg rounded-lg bg-inverse-surface text-inverse-on-surface flex flex-col gap-space-xs">
        <div className="flex items-center justify-between">
          <span className="font-label-sm text-label-sm uppercase font-bold text-secondary-fixed">
            ระบบความปลอดภัย Air-Gap
          </span>
          <span className="material-symbols-outlined text-secondary-fixed text-[16px]">
            shield
          </span>
        </div>
        <span className="font-code-dense text-code-dense text-inverse-on-surface">
          MedCore v4.2.1-Offline
        </span>
        <div className="w-full bg-on-primary-fixed-variant h-1 rounded-full overflow-hidden mt-space-xs">
          <div className="bg-secondary-fixed h-full w-full"></div>
        </div>
        <span className="font-label-sm text-label-sm text-inverse-primary">
          เข้ารหัสฐานข้อมูลในเครื่อง (AES-256)
        </span>
      </div>
    </aside>
  );
};
