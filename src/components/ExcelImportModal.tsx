import React, { useState } from 'react';

interface ExcelImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmImport: () => void;
}

export const ExcelImportModal: React.FC<ExcelImportModalProps> = ({
  isOpen,
  onClose,
  onConfirmImport,
}) => {
  const [activeType, setActiveType] = useState<'drugs' | 'patients'>('drugs');
  const [fileName, setFileName] = useState<string>('inventory_update_2026.xlsx');

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-space-md bg-primary-container/70 backdrop-blur-sm"
      id="excelImportModal"
    >
      <div className="bg-surface-container-lowest rounded-xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col border border-outline-variant/30">
        {/* Modal Header */}
        <div className="px-space-lg py-space-md bg-primary-container text-surface flex items-center justify-between">
          <div className="flex items-center gap-space-sm">
            <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-on-secondary">
              <span className="material-symbols-outlined text-[20px]">
                table_view
              </span>
            </div>
            <div className="flex flex-col">
              <h3 className="font-headline-sm text-headline-sm text-surface font-bold">
                นำเข้าข้อมูลจากไฟล์ Excel (.xlsx / .csv)
              </h3>
              <span className="font-label-sm text-label-sm text-secondary-fixed">
                รองรับไฟล์ Microsoft Excel และ CSV สำหรับบันทึกเข้าฐานข้อมูลออฟไลน์
              </span>
            </div>
          </div>
          <button
            className="p-1 rounded-lg text-primary-fixed-dim hover:text-surface hover:bg-inverse-surface transition-colors cursor-pointer"
            onClick={onClose}
            title="ปิดหน้าต่าง"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-space-lg flex flex-col gap-space-md overflow-y-auto max-h-[768px]">
          {/* Sub Tab bar */}
          <div className="flex items-center justify-between p-space-xs bg-surface-container-low rounded-xl">
            <div className="flex items-center gap-space-xs">
              <button
                className={`px-space-md py-1.5 rounded-lg font-label-md text-label-md font-semibold transition-colors cursor-pointer ${
                  activeType === 'drugs'
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                }`}
                type="button"
                onClick={() => setActiveType('drugs')}
              >
                <span className="material-symbols-outlined text-[16px] mr-1 align-middle">
                  medication
                </span>
                นำเข้ารายการยา (Drug Formulary)
              </button>
              <button
                className={`px-space-md py-1.5 rounded-lg font-label-md text-label-md font-semibold transition-colors cursor-pointer ${
                  activeType === 'patients'
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                }`}
                type="button"
                onClick={() => setActiveType('patients')}
              >
                <span className="material-symbols-outlined text-[16px] mr-1 align-middle">
                  person_search
                </span>
                นำเข้ารายชื่อผู้ป่วย (Patient Roster)
              </button>
            </div>
            <button
              className="inline-flex items-center gap-1 text-secondary font-label-sm text-label-sm font-bold hover:underline px-space-sm cursor-pointer"
              type="button"
              onClick={() => {
                alert('ดาวน์โหลดไฟล์เทมเพลต Excel สำหรับบันทึกบัญชียาเรียบร้อยแล้ว');
              }}
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              <span>ดาวน์โหลดเทมเพลต Excel (.xlsx)</span>
            </button>
          </div>

          {/* Upload Dropzone */}
          <div
            className="border-2 border-dashed border-outline-variant rounded-xl p-space-lg flex flex-col items-center justify-center text-center bg-surface-container-lowest hover:bg-surface-container-low transition-colors cursor-pointer"
            onClick={() => {
              const input = document.createElement('input');
              input.type = 'file';
              input.accept = '.xlsx, .xls, .csv';
              input.onchange = (e: any) => {
                if (e.target?.files?.[0]) {
                  setFileName(e.target.files[0].name);
                }
              };
              input.click();
            }}
          >
            <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container mb-space-xs">
              <span className="material-symbols-outlined text-[28px]">
                upload_file
              </span>
            </div>
            <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
              ลากไฟล์ Excel (.xlsx, .xls หรือ .csv) วางที่นี่
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant mt-1">
              หรือคลิกเพื่อเลือกไฟล์จากคอมพิวเตอร์ของคุณ (ขนาดไฟล์สูงสุดไม่เกิน 25 MB)
            </span>
            <div className="mt-space-md inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-lg bg-surface-container text-on-surface font-label-md text-label-md font-semibold">
              <span className="material-symbols-outlined text-[16px] text-secondary">
                check_circle
              </span>
              <span>
                ไฟล์ที่เลือก: <strong>{fileName}</strong> (248 รายการ)
              </span>
            </div>
          </div>

          {/* Preview Table */}
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm uppercase font-bold text-on-surface-variant">
                ตัวอย่างข้อมูลที่ตรวจพบในไฟล์ (Preview 3 รายการแรก):
              </span>
              <span className="font-label-sm text-label-sm text-secondary font-semibold">
                ความถูกต้องของโครงสร้าง: 100% ผ่านการตรวจสอบ
              </span>
            </div>
            <div className="w-full overflow-x-auto rounded-lg bg-surface-container-low border border-outline-variant">
              <table className="w-full text-left font-body-sm text-body-sm border-collapse">
                <thead className="bg-surface-container-high text-on-surface font-label-sm text-label-sm uppercase font-bold">
                  <tr>
                    <th className="p-space-xs">รหัส NDC / ล็อต</th>
                    <th className="p-space-xs">ชื่อยา / รูปแบบ</th>
                    <th className="p-space-xs">จำนวนรับเข้า</th>
                    <th className="p-space-xs">วันหมดอายุ</th>
                    <th className="p-space-xs">สถานะ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container">
                  <tr className="hover:bg-surface-container-lowest">
                    <td className="p-space-xs font-code-dense">LOT-CF-1049</td>
                    <td className="p-space-xs font-medium">Ciprofloxacin 500mg เม็ด</td>
                    <td className="p-space-xs font-bold text-on-surface">+500 เม็ด</td>
                    <td className="p-space-xs font-code-dense text-secondary">10/2028</td>
                    <td className="p-space-xs">
                      <span className="px-1.5 py-0.5 rounded font-label-sm text-[11px] bg-secondary-container text-on-secondary-container font-semibold">
                        พร้อมนำเข้า
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-container-lowest">
                    <td className="p-space-xs font-code-dense">LOT-OM-2291</td>
                    <td className="p-space-xs font-medium">Omeprazole 20mg แคปซูล</td>
                    <td className="p-space-xs font-bold text-on-surface">+1,200 แคปซูล</td>
                    <td className="p-space-xs font-code-dense text-secondary">12/2027</td>
                    <td className="p-space-xs">
                      <span className="px-1.5 py-0.5 rounded font-label-sm text-[11px] bg-secondary-container text-on-secondary-container font-semibold">
                        พร้อมนำเข้า
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-container-lowest">
                    <td className="p-space-xs font-code-dense">LOT-PA-8302</td>
                    <td className="p-space-xs font-medium">Paracetamol 500mg เม็ด</td>
                    <td className="p-space-xs font-bold text-on-surface">+3,000 เม็ด</td>
                    <td className="p-space-xs font-code-dense text-secondary">03/2029</td>
                    <td className="p-space-xs">
                      <span className="px-1.5 py-0.5 rounded font-label-sm text-[11px] bg-secondary-container text-on-secondary-container font-semibold">
                        พร้อมนำเข้า
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-space-sm bg-secondary-container/50 rounded-lg flex items-center gap-space-sm">
            <span className="material-symbols-outlined text-secondary text-[20px]">
              verified
            </span>
            <span className="font-body-sm text-body-sm text-on-surface">
              ระบบจะอัปเดตและเพิ่มยอดเข้าฐานข้อมูล SQLite ออฟไลน์โดยอัตโนมัติ
              ไม่ต้องต่ออินเทอร์เน็ต
            </span>
          </div>
        </div>

        {/* Modal Actions Footer */}
        <div className="px-space-lg py-space-md bg-surface-container-low flex items-center justify-between gap-space-sm border-t border-outline-variant/30">
          <span className="font-label-sm text-label-sm text-on-surface-variant font-code-dense">
            SHA-256 Batch Checksum: ผ่านการรับรอง
          </span>
          <div className="flex items-center gap-space-sm">
            <button
              className="px-space-lg py-2 rounded-lg bg-surface-container text-on-surface font-label-md text-label-md font-semibold hover:bg-surface-container-high transition-colors cursor-pointer"
              onClick={onClose}
              type="button"
            >
              ยกเลิก
            </button>
            <button
              className="inline-flex items-center gap-space-xs px-space-xl py-2 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-bold hover:bg-on-primary-fixed-variant transition-colors shadow-sm cursor-pointer"
              onClick={onConfirmImport}
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">cloud_done</span>
              <span>ยืนยันนำเข้าข้อมูลเข้าสู่ระบบ</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
