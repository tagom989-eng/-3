import React from 'react';
import { Medication } from '../data/mockData';

interface AnalyticsViewProps {
  medications: Medication[];
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ medications }) => {
  const totalStockValue = medications.reduce(
    (sum, m) => sum + m.stock * m.unitPrice,
    0
  );

  return (
    <div className="flex flex-col gap-space-md">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-headline-md font-bold text-on-surface">
            รายงานวิเคราะห์และสถิติคลังยา (Pharmacy Inventory Analytics)
          </h2>
          <p className="font-body-sm text-on-surface-variant">
            การประเมินมูลค่าสต็อก อัตราการหมุนเวียนยา และการจัดกลุ่ม ABC/VEN
          </p>
        </div>
        <button
          onClick={() => alert('ส่งออกไฟล์สรุปสถิติคลังยาประจำเดือนเรียบร้อยแล้ว (PDF/Excel)')}
          className="px-4 py-2 rounded-lg bg-primary text-on-primary font-label-md font-bold hover:bg-on-primary-fixed-variant transition-colors flex items-center gap-1 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">picture_as_pdf</span>
          <span>ดาวน์โหลดรายงานประจำเดือน</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md">
        <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm border border-outline-variant/30">
          <span className="text-xs text-on-surface-variant uppercase font-bold">
            มูลค่าสต็อกยาคงคลังรวม (Total Asset)
          </span>
          <div className="font-headline-xl font-bold text-on-surface mt-2">
            ฿{totalStockValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <span className="text-xs text-secondary font-semibold mt-1 block">
            ครอบคลุม {medications.length} กลุ่มยาหลัก
          </span>
        </div>

        <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm border border-outline-variant/30">
          <span className="text-xs text-on-surface-variant uppercase font-bold">
            อัตราการหมุนเวียนสต็อก (Turnover Rate)
          </span>
          <div className="font-headline-xl font-bold text-secondary mt-2">
            8.4 เท่า / ปี
          </div>
          <span className="text-xs text-on-surface-variant font-medium mt-1 block">
            เฉลี่ยระยะเวลาสต็อกค้าง: 43 วัน
          </span>
        </div>

        <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm border border-outline-variant/30">
          <span className="text-xs text-on-surface-variant uppercase font-bold">
            อัตราความพร้อมจ่ายยา (Drug Availability)
          </span>
          <div className="font-headline-xl font-bold text-on-surface mt-2">
            98.2%
          </div>
          <span className="text-xs text-secondary font-semibold mt-1 block">
            เกณฑ์มาตรฐานโรงพยาบาลคุณภาพ (HA &gt; 95%)
          </span>
        </div>
      </div>

      {/* Category Distribution Breakdown */}
      <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm border border-outline-variant/30">
        <h3 className="font-headline-sm font-bold text-on-surface mb-3">
          สัดส่วนมูลค่ายาตามกลุ่มการรักษา (Formulary Breakdown)
        </h3>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs font-bold text-on-surface mb-1">
              <span>ระบบหัวใจและหลอดเลือด (Cardiovascular)</span>
              <span>38% (฿982,000)</span>
            </div>
            <div className="w-full bg-surface-container-low h-2 rounded-full overflow-hidden">
              <div className="bg-secondary h-full rounded-full" style={{ width: '38%' }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold text-on-surface mb-1">
              <span>ยาชีววัตถุและอินซูลินควบคุมความเย็น (Cold-Chain Biologics)</span>
              <span>29% (฿749,000)</span>
            </div>
            <div className="w-full bg-surface-container-low h-2 rounded-full overflow-hidden">
              <div className="bg-primary h-full rounded-full" style={{ width: '29%' }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold text-on-surface mb-1">
              <span>ยาปฏิชีวนะและฆ่าเชื้อ (Antimicrobials)</span>
              <span>18% (฿465,000)</span>
            </div>
            <div className="w-full bg-surface-container-low h-2 rounded-full overflow-hidden">
              <div className="bg-error h-full rounded-full" style={{ width: '18%' }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold text-on-surface mb-1">
              <span>ยาควบคุมพิเศษและยาเสพติดการแพทย์ (Controlled Sch II)</span>
              <span>15% (฿387,000)</span>
            </div>
            <div className="w-full bg-surface-container-low h-2 rounded-full overflow-hidden">
              <div className="bg-tertiary-container h-full rounded-full" style={{ width: '15%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
