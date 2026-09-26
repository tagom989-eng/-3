import React from 'react';

interface KpiCardsProps {
  totalDrugsCount?: number;
  criticalCount?: number;
  dispensedTodayCount?: number;
  dispensedTodayAmount?: number;
  onOpenPoModal?: () => void;
}

export const KpiCards: React.FC<KpiCardsProps> = ({
  totalDrugsCount = 1482,
  criticalCount = 14,
  dispensedTodayCount = 142,
  dispensedTodayAmount = 238420,
  onOpenPoModal,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-space-md">
      {/* KPI 1: Active Formularies */}
      <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm relative overflow-hidden flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">
            จำนวนรายการยาทั้งหมด
          </span>
          <div className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-primary-container">
            <span className="material-symbols-outlined text-[20px]">
              medication
            </span>
          </div>
        </div>
        <div className="mt-space-md">
          <div className="flex items-baseline gap-space-xs">
            <span className="font-headline-xl text-headline-xl text-on-surface font-bold tracking-tight">
              {totalDrugsCount.toLocaleString()}
            </span>
            <span className="font-label-md text-label-md text-secondary font-semibold">
              รายการยาพร้อมใช้
            </span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
            อัตราพร้อมจ่าย 98.2% กระจายใน 18 ช่องจัดเก็บ
          </p>
        </div>
        {/* Mini Sparkline */}
        <div className="mt-space-sm w-full h-7 flex items-end">
          <svg className="w-full h-6 text-secondary" fill="none" viewBox="0 0 100 24">
            <path
              d="M0 18 L15 14 L30 19 L45 8 L60 12 L75 4 L90 9 L100 2"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
            ></path>
          </svg>
        </div>
      </div>

      {/* KPI 2: Critical & Low Stock Alerts */}
      <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm relative overflow-hidden flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-error font-bold">
            ยาใกล้หมด / ขาดสต็อกวิกฤต
          </span>
          <div className="w-8 h-8 rounded-lg bg-error-container flex items-center justify-center text-on-error-container">
            <span className="material-symbols-outlined text-[20px]">warning</span>
          </div>
        </div>
        <div className="mt-space-md">
          <div className="flex items-baseline gap-space-xs">
            <span className="font-headline-xl text-headline-xl text-error font-bold tracking-tight">
              {criticalCount}
            </span>
            <span className="font-label-md text-label-md text-on-error-container font-semibold">
              รายการแจ้งเตือน
            </span>
          </div>
          <div className="flex items-center gap-space-sm mt-1">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-error-container text-on-error-container font-label-sm text-label-sm font-bold">
              4 วิกฤต
            </span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface font-label-sm text-label-sm font-semibold">
              10 สต็อกต่ำ
            </span>
          </div>
        </div>
        <div className="mt-space-sm pt-space-xs flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
          <span>รอบสั่งซื้อ: ระบบออฟไลน์</span>
          <button
            className="text-error font-bold hover:underline cursor-pointer"
            type="button"
            onClick={onOpenPoModal}
          >
            ออกใบขอเบิกยา (PO)
          </button>
        </div>
      </div>

      {/* KPI 3: Dispensed Activity Today */}
      <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm relative overflow-hidden flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">
            ยอดจ่ายยาวันนี้
          </span>
          <div className="w-8 h-8 rounded-lg bg-secondary-container flex items-center justify-center text-on-secondary-container">
            <span className="material-symbols-outlined text-[20px]">
              receipt_long
            </span>
          </div>
        </div>
        <div className="mt-space-md">
          <div className="flex items-baseline gap-space-xs">
            <span className="font-headline-xl text-headline-xl text-on-surface font-bold tracking-tight">
              {dispensedTodayCount}
            </span>
            <span className="font-label-md text-label-md text-secondary font-semibold">
              ใบสั่งยา
            </span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface font-medium mt-1">
            มูลค่ายาจ่าย:{' '}
            <span className="font-code-dense text-code-dense font-bold">
              ฿{dispensedTodayAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </p>
        </div>
        <div className="mt-space-sm w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
          <div className="bg-secondary h-full rounded-full" style={{ width: '71%' }}></div>
        </div>
      </div>

      {/* KPI 4: Air-Gap Storage & Security */}
      <div className="bg-primary-container text-surface rounded-xl p-space-lg shadow-sm relative overflow-hidden flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary-fixed font-bold">
            ความสมบูรณ์ของฐานข้อมูล
          </span>
          <div className="w-8 h-8 rounded-lg bg-inverse-surface flex items-center justify-center text-secondary-fixed">
            <span className="material-symbols-outlined text-[20px]">
              verified_user
            </span>
          </div>
        </div>
        <div className="mt-space-md">
          <div className="flex items-baseline gap-space-xs">
            <span className="font-headline-xl text-headline-xl text-surface font-bold tracking-tight">
              100%
            </span>
            <span className="font-label-md text-label-md text-secondary-fixed font-semibold">
              สมบูรณ์ตรวจสอบแล้ว
            </span>
          </div>
          <p className="font-body-sm text-body-sm text-primary-fixed-dim mt-1 font-code-dense">
            SHA-256 Ledger: ตรงกัน
          </p>
        </div>
        <div className="mt-space-sm flex items-center justify-between text-secondary-fixed font-label-sm text-label-sm">
          <span className="font-code-dense">SQLite v3.45 WAL</span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed"></span>
            เข้ารหัสปลอดภัย
          </span>
        </div>
      </div>
    </div>
  );
};
