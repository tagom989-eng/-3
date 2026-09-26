import React from 'react';

interface PriorityAlertsProps {
  onOrderBatch: (drugName: string) => void;
  onLockReserve: (drugName: string) => void;
  onForecast: (drugName: string) => void;
  onQuarantine: (drugName: string) => void;
}

export const PriorityAlerts: React.FC<PriorityAlertsProps> = ({
  onOrderBatch,
  onLockReserve,
  onForecast,
  onQuarantine,
}) => {
  return (
    <div className="flex flex-col gap-space-xs">
      <div className="flex items-center justify-between px-space-xs">
        <div className="flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-error text-[20px]">
            notification_important
          </span>
          <span className="font-label-lg text-label-lg font-bold text-on-surface">
            รายการยาเร่งด่วนและยาใกล้หมดอายุ (ต้องดำเนินการทันที)
          </span>
        </div>
        <span className="font-label-sm text-label-sm text-on-surface-variant">
          รอดำเนินการ 3 รายการ
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
        {/* Critical Low Card */}
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between">
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center px-2 py-0.5 rounded font-label-sm text-label-sm font-bold bg-error-container text-on-error-container">
                ต้องสั่งซื้อด่วน
              </span>
              <span className="font-code-dense text-code-dense text-on-surface-variant">
                ช่อง BAY-12 / ชั้น 2
              </span>
            </div>
            <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold mt-space-xs">
              Amoxicillin 500mg
            </h4>
            <span className="font-body-sm text-body-sm text-on-surface-variant font-medium">
              ชนิดแคปซูลรับประทาน • ขวดละ 100 เม็ด
            </span>
            <div className="p-space-sm bg-surface-container-low rounded-lg mt-space-xs flex items-center justify-between">
              <div>
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">
                  สต็อกคงเหลือ
                </span>
                <p className="font-headline-sm text-headline-sm text-error font-bold leading-none">
                  18 ขวด
                </p>
              </div>
              <div className="text-right">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">
                  เกณฑ์สำรองขั้นต่ำ
                </span>
                <p className="font-headline-sm text-headline-sm text-on-surface font-semibold leading-none">
                  50 ขวด
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-space-xs mt-space-md pt-space-xs">
            <button
              className="flex-1 py-1.5 px-space-sm rounded-lg bg-primary text-on-primary font-label-md text-label-md font-semibold hover:opacity-90 transition-opacity cursor-pointer"
              type="button"
              onClick={() => onOrderBatch('Amoxicillin 500mg')}
            >
              สั่งซื้อล็อตใหม่
            </button>
            <button
              className="py-1.5 px-space-sm rounded-lg bg-surface-container text-on-surface font-label-md text-label-md font-medium hover:bg-surface-container-high transition-colors cursor-pointer"
              type="button"
              onClick={() => onLockReserve('Amoxicillin 500mg')}
            >
              ล็อกยอดสำรอง
            </button>
          </div>
        </div>

        {/* Low Stock Warning Card */}
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between">
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center px-2 py-0.5 rounded font-label-sm text-label-sm font-bold bg-surface-container-high text-on-surface">
                สต็อกต่ำ (42%)
              </span>
              <span className="font-code-dense text-code-dense text-on-surface-variant">
                ช่อง BAY-04 / ชั้น 1
              </span>
            </div>
            <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold mt-space-xs">
              Metformin HCl 850mg
            </h4>
            <span className="font-body-sm text-body-sm text-on-surface-variant font-medium">
              ยาเม็ดเคลือบฟิล์ม • แผงฟอยล์บลิสเตอร์
            </span>
            <div className="p-space-sm bg-surface-container-low rounded-lg mt-space-xs flex items-center justify-between">
              <div>
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">
                  สต็อกคงเหลือ
                </span>
                <p className="font-headline-sm text-headline-sm text-on-surface font-bold leading-none">
                  42 แผง
                </p>
              </div>
              <div className="text-right">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">
                  เกณฑ์สั่งซื้อ
                </span>
                <p className="font-headline-sm text-headline-sm text-on-surface font-semibold leading-none">
                  100 แผง
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-space-xs mt-space-md pt-space-xs">
            <button
              className="flex-1 py-1.5 px-space-sm rounded-lg bg-primary text-on-primary font-label-md text-label-md font-semibold hover:opacity-90 transition-opacity cursor-pointer"
              type="button"
              onClick={() => onOrderBatch('Metformin HCl 850mg')}
            >
              สั่งซื้อล็อตใหม่
            </button>
            <button
              className="py-1.5 px-space-sm rounded-lg bg-surface-container text-on-surface font-label-md text-label-md font-medium hover:bg-surface-container-high transition-colors cursor-pointer"
              type="button"
              onClick={() => onForecast('Metformin HCl 850mg')}
            >
              พยากรณ์การใช้ (7 วัน)
            </button>
          </div>
        </div>

        {/* Critical Expiry Alert Card */}
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center px-2 py-0.5 rounded font-label-sm text-label-sm font-bold bg-error-container text-on-error-container">
              หมดอายุใน 14 วัน
            </span>
            <span className="font-code-dense text-code-dense text-on-surface-variant">
              COLD-CHAIN-01
            </span>
          </div>
          <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold mt-space-xs">
            Epinephrine 1mg/mL
          </h4>
          <span className="font-body-sm text-body-sm text-on-surface-variant font-medium">
            เข็มฉีดยาอัตโนมัติ Single-Dose (ล็อต #EP-9942)
          </span>
          <div className="p-space-sm bg-surface-container-low rounded-lg mt-space-xs flex items-center justify-between">
            <div>
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">
                ล็อตปัจจุบัน
              </span>
              <p className="font-headline-sm text-headline-sm text-error font-bold leading-none">
                8 ด้าม
              </p>
            </div>
            <div className="text-right">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">
                วันหมดอายุ
              </span>
              <p className="font-headline-sm text-headline-sm text-error font-semibold leading-none">
                18 พ.ย. 2026
              </p>
            </div>
          </div>
          <div className="flex items-center gap-space-xs mt-space-md pt-space-xs">
            <button
              className="flex-1 py-1.5 px-space-sm rounded-lg bg-error text-on-error font-label-md text-label-md font-semibold hover:opacity-90 transition-opacity cursor-pointer"
              type="button"
              onClick={() => onQuarantine('Epinephrine 1mg/mL')}
            >
              หมุนเวียน / กักกันยา
            </button>
            <button
              className="py-1.5 px-space-sm rounded-lg bg-surface-container text-on-surface font-label-md text-label-md font-medium hover:bg-surface-container-high transition-colors cursor-pointer"
              type="button"
              onClick={() => onLockReserve('Epinephrine 1mg/mL')}
            >
              ประวัติการแลกเปลี่ยน
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
