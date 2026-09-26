import React, { useState } from 'react';

interface HeaderProps {
  onOpenDispenseModal: () => void;
  unreadAlertsCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenDispenseModal,
  unreadAlertsCount = 3,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 px-space-xl flex items-center justify-between">
      {/* Left side: Offline Status & Storage indicator */}
      <div className="flex items-center gap-space-md">
        <div className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-secondary-container text-on-secondary-container font-label-md text-label-md font-semibold">
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
          <span>โหมดออฟไลน์ - ฐานข้อมูล SQLite พร้อมทำงาน (0 รายการรอซิงค์)</span>
        </div>
        <div className="hidden xl:inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-surface-container-low text-on-surface-variant font-body-sm text-body-sm">
          <span className="material-symbols-outlined text-[16px] text-outline">
            sd_card
          </span>
          <span>พื้นที่จัดเก็บ: เหลือ 94%</span>
        </div>
      </div>

      {/* Right side: Quick Dispense, Alerts, Pharmacist Profile */}
      <div className="flex items-center gap-space-lg">
        {/* Quick Emergency Dispense button (F2) */}
        <button
          className="inline-flex items-center gap-space-xs px-space-md py-space-sm rounded-lg bg-secondary text-on-secondary font-label-md text-label-md hover:bg-on-secondary-fixed-variant transition-colors shadow-sm cursor-pointer"
          onClick={onOpenDispenseModal}
          type="button"
          title="เปิดหน้าต่างจ่ายยาฉุกเฉินด่วน (คีย์ลัด F2)"
        >
          <span className="material-symbols-outlined text-[18px]">bolt</span>
          <span>จ่ายยาฉุกเฉินด่วน</span>
          <span className="font-code-dense text-code-dense opacity-80 pl-space-xs">
            F2
          </span>
        </button>

        {/* Notifications */}
        <div className="relative flex items-center">
          <button
            aria-label="แจ้งเตือน"
            className="p-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors cursor-pointer"
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <span className="material-symbols-outlined text-[24px]">
              notifications
            </span>
          </button>
          {unreadAlertsCount > 0 && (
            <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 rounded-full bg-error text-on-error font-label-sm text-label-sm leading-none font-bold">
              {unreadAlertsCount} เตือน
            </span>
          )}

          {/* Dropdown panel for notifications */}
          {showNotifications && (
            <div className="absolute right-0 top-12 w-80 bg-surface-container-lowest rounded-xl shadow-xl border border-outline-variant p-space-md z-50 flex flex-col gap-2">
              <div className="flex items-center justify-between pb-2 border-b border-surface-container">
                <span className="font-label-md font-bold text-on-surface">การแจ้งเตือนของระบบ</span>
                <span className="font-label-sm text-secondary font-semibold">3 รายการใหม่</span>
              </div>
              <div className="flex flex-col gap-2 text-left">
                <div className="p-2 rounded-lg bg-error-container/40 text-on-error-container">
                  <div className="font-label-sm font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">warning</span>
                    Amoxicillin 500mg สต็อกวิกฤต
                  </div>
                  <div className="text-[12px] text-on-surface-variant">เหลือ 18 ขวด ต่ำกว่าเกณฑ์สำรองขั้นต่ำ 50 ขวด</div>
                </div>
                <div className="p-2 rounded-lg bg-surface-container-low text-on-surface">
                  <div className="font-label-sm font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">alarm</span>
                    Epinephrine 1mg/mL ใกล้หมดอายุ
                  </div>
                  <div className="text-[12px] text-on-surface-variant">ล็อต #EP-9942 หมดอายุใน 14 วัน (18 พ.ย. 2026)</div>
                </div>
                <div className="p-2 rounded-lg bg-surface-container-low text-on-surface">
                  <div className="font-label-sm font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">info</span>
                    สำรองข้อมูลระบบเสร็จสมบูรณ์
                  </div>
                  <div className="text-[12px] text-on-surface-variant">SQLite WAL Archive เข้ารหัส AES-256 เรียบร้อย</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="h-6 w-px bg-outline-variant"></div>

        {/* Pharmacist Profile */}
        <div className="flex items-center gap-space-md">
          <div className="hidden sm:flex flex-col text-right">
            <span className="font-label-lg text-label-lg text-on-surface font-bold leading-tight">
              ภญ. เอเวอลิน แวนซ์
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant leading-tight">
              หัวหน้าเภสัชกรคลินิก (ภ.บ.)
            </span>
          </div>
          <img
            alt="ภญ. เอเวอลิน แวนซ์"
            className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/20"
            src="https://lh3.googleusercontent.com/aida/AEtjO1W4puA1XLuFHTuIDovNQWxcXiv4kkafGlyplDFH45IPBokLv9yBSk3lkpJLZ53udvh41o8_dFPf1Bwc5Ihp-ucBX6ipqn7qTPkXS5A3iGAk99YDTyvujBCdMVXORSiY6Tk6uyTdf3_Mnx9u5hN-zpI0ehGtkVzQLwBTKZQ7UXo1Hq4FR4XYVpxTYsl5EqN-1Cs5X4B8-Ibqj9dnsNL0yqoXPZuA6tFPQUt8Lx-99Ba0F_CZj_dSaaNfMz62"
          />
        </div>
      </div>
    </header>
  );
};
