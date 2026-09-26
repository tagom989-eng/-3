import React, { useState } from 'react';
import { Medication } from '../data/mockData';

interface PurchaseOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedDrug?: string;
  medications: Medication[];
  onConfirmPO: (poNumber: string, itemCount: number) => void;
}

export const PurchaseOrderModal: React.FC<PurchaseOrderModalProps> = ({
  isOpen,
  onClose,
  preSelectedDrug,
  medications,
  onConfirmPO,
}) => {
  const [supplier, setSupplier] = useState('บริษัท สหแพทย์ฟาร์มาซูติคอล จำกัด (มหาชน)');
  const [urgency, setUrgency] = useState('ด่วนที่สุด (Stat 24 ชม.)');

  if (!isOpen) return null;

  const lowStockDrugs = medications.filter(
    (m) => m.status === 'critical' || m.status === 'low' || m.name.includes(preSelectedDrug || '')
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-space-md bg-primary-container/70 backdrop-blur-sm">
      <div className="bg-surface-container-lowest rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col border border-outline-variant/30">
        <div className="px-space-lg py-space-md bg-primary-container text-surface flex items-center justify-between">
          <div className="flex items-center gap-space-sm">
            <span className="material-symbols-outlined text-secondary text-[24px]">
              shopping_cart_checkout
            </span>
            <div>
              <h3 className="font-headline-sm font-bold text-surface">
                ออกใบขอเบิกซื้อยาเร่งด่วน (Emergency PO)
              </h3>
              <span className="font-label-sm text-secondary-fixed">
                เลขที่เอกสาร PO-2026-MED-{Math.floor(1000 + Math.random() * 9000)}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-primary-fixed-dim hover:text-surface hover:bg-inverse-surface cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="p-space-lg flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-label-sm text-on-surface-variant font-bold">บริษัทคู่ค้า / ผู้จัดจำหน่าย (Vendor):</label>
              <select
                className="w-full h-10 px-3 mt-1 bg-surface-container-low rounded-lg font-body-md text-on-surface border border-outline-variant/40"
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
              >
                <option>บริษัท สหแพทย์ฟาร์มาซูติคอล จำกัด (มหาชน)</option>
                <option>องค์การเภสัชกรรม (GPO Thailand)</option>
                <option>DKSH ฟาร์มาซูติคอล ดิสทริบิวชั่น</option>
              </select>
            </div>
            <div>
              <label className="font-label-sm text-on-surface-variant font-bold">ระดับความเร่งด่วน:</label>
              <select
                className="w-full h-10 px-3 mt-1 bg-surface-container-low rounded-lg font-body-md text-on-surface border border-outline-variant/40"
                value={urgency}
                onChange={(e) => setUrgency(e.target.value)}
              >
                <option>ด่วนที่สุด (Stat 24 ชม.)</option>
                <option>ด่วนพิเศษ (Urgent 48 ชม.)</option>
                <option>รอบปกติรายสัปดาห์ (Weekly)</option>
              </select>
            </div>
          </div>

          <div>
            <span className="font-label-sm text-on-surface-variant font-bold block mb-2">
              รายการยาที่ขาดสต็อก / ขอเบิกเร่งด่วน:
            </span>
            <div className="rounded-lg border border-outline-variant/40 overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-surface-container-high text-on-surface font-bold">
                  <tr>
                    <th className="p-2">ชื่อยา</th>
                    <th className="p-2">สต็อกปัจจุบัน</th>
                    <th className="p-2">จำนวนสั่งซื้อ</th>
                    <th className="p-2">ประมาณการยอด (฿)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container">
                  {lowStockDrugs.map((m) => (
                    <tr key={m.id} className="hover:bg-surface-container-lowest">
                      <td className="p-2 font-bold text-on-surface">
                        {m.name} ({m.dosage})
                      </td>
                      <td className="p-2 text-error font-bold">
                        {m.stock} {m.unit}
                      </td>
                      <td className="p-2 font-bold">
                        +{m.minThreshold * 2} {m.unit}
                      </td>
                      <td className="p-2 font-code-dense">
                        ฿{((m.minThreshold * 2) * m.unitPrice).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-3 bg-secondary-container/40 rounded-lg flex items-center gap-2 text-xs text-on-secondary-container">
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span>
              ใบสั่งซื้อนี้จะถูกเข้ารหัสและบันทึกลงในระบบคลังยาส่วนกลาง พร้อมส่งออก EDI เมื่อเชื่อมต่อระบบ
            </span>
          </div>

          <div className="pt-2 flex justify-end gap-2 border-t border-outline-variant/30">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-surface-container text-on-surface font-label-md font-semibold hover:bg-surface-container-high cursor-pointer"
            >
              ยกเลิก
            </button>
            <button
              onClick={() => {
                onConfirmPO('PO-2026-MED-9941', lowStockDrugs.length);
                onClose();
              }}
              className="px-6 py-2 rounded-lg bg-primary text-on-primary font-label-md font-bold hover:bg-on-primary-fixed-variant cursor-pointer flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[16px]">send</span>
              อนุมัติและออกใบสั่งซื้อ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
