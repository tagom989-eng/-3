import React from 'react';

interface SubHeaderRibbonProps {
  onOpenDispenseModal: () => void;
}

export const SubHeaderRibbon: React.FC<SubHeaderRibbonProps> = ({
  onOpenDispenseModal,
}) => {
  return (
    <div className="w-full bg-surface-container-low rounded-xl p-space-md shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-space-sm">
      <div className="flex items-center gap-space-sm flex-wrap">
        <div className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse"></div>
        <span className="font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight">
          รายการบัญชียาหลักและระบบควบคุมสต็อกเวชภัณฑ์
        </span>
        <span className="font-code-dense text-code-dense px-space-xs py-0.5 rounded bg-surface-container text-on-surface-variant font-semibold">
          LOC-STORE-BAY-04
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-space-sm">
        <div className="inline-flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-surface-container-highest text-on-surface font-label-sm text-label-sm">
          <span className="material-symbols-outlined text-[15px] text-secondary">
            database
          </span>
          <span>ซิงค์ฐานข้อมูลล่าสุด: 07:42 น.</span>
        </div>
        <div className="inline-flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-surface-container-highest text-on-surface font-label-sm text-label-sm">
          <span className="material-symbols-outlined text-[15px] text-outline">
            history
          </span>
          <span>สำรองข้อมูล: 18 นาทีก่อน</span>
        </div>
        <button
          className="inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-lg bg-secondary text-on-secondary font-label-md text-label-md hover:bg-on-secondary-fixed-variant transition-all shadow-sm cursor-pointer"
          onClick={onOpenDispenseModal}
          type="button"
          title="เปิดเคาน์เตอร์จ่ายยา (F3)"
        >
          <span className="material-symbols-outlined text-[17px]">add_task</span>
          <span>เคาน์เตอร์จ่ายยา</span>
          <span className="font-code-dense text-code-dense opacity-75">F3</span>
        </button>
      </div>
    </div>
  );
};
