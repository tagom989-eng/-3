import React, { useState } from 'react';
import { Medication } from '../data/mockData';

interface BarcodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  medications: Medication[];
  onSelectMedication: (med: Medication) => void;
}

export const BarcodeModal: React.FC<BarcodeModalProps> = ({
  isOpen,
  onClose,
  medications,
  onSelectMedication,
}) => {
  const [barcodeInput, setBarcodeInput] = useState('');

  if (!isOpen) return null;

  const handleScan = (code: string) => {
    const found = medications.find(
      (m) =>
        m.lot.toLowerCase().includes(code.toLowerCase()) ||
        m.ndc.toLowerCase().includes(code.toLowerCase()) ||
        m.name.toLowerCase().includes(code.toLowerCase())
    );
    if (found) {
      onSelectMedication(found);
      onClose();
    } else {
      alert(`ไม่พบรหัสบาร์โค้ด "${code}" ในระบบคลังยา`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-space-md bg-primary-container/70 backdrop-blur-sm">
      <div className="bg-surface-container-lowest rounded-xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col border border-outline-variant/30">
        <div className="px-space-lg py-space-md bg-primary-container text-surface flex items-center justify-between">
          <div className="flex items-center gap-space-sm">
            <span className="material-symbols-outlined text-secondary text-[24px]">
              barcode_scanner
            </span>
            <div>
              <h3 className="font-headline-sm font-bold text-surface">
                สแกนบาร์โค้ดยาด่วน (F2)
              </h3>
              <span className="font-label-sm text-secondary-fixed">
                โหมดอ่านรหัสเลเซอร์ความเร็วสูง
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

        <div className="p-space-lg flex flex-col gap-4 text-center">
          <div className="w-full h-36 bg-inverse-surface rounded-xl flex flex-col items-center justify-center relative overflow-hidden border border-secondary/40">
            {/* Animated Laser line */}
            <div className="w-full h-0.5 bg-error animate-pulse shadow-[0_0_8px_#ff0000]"></div>
            <div className="mt-4 flex items-center gap-2 text-secondary-fixed font-code-dense text-xs">
              <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-ping"></span>
              เครื่องสแกนพร้อมทำงาน (Zebra DS2208)
            </div>
          </div>

          <div>
            <label className="font-label-sm text-on-surface-variant font-bold text-left block mb-1">
              หรือพิมพ์บาร์โค้ด / รหัส NDC ด้วยตัวเอง:
            </label>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (barcodeInput.trim()) handleScan(barcodeInput.trim());
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                autoFocus
                placeholder="สแกนหรือใส่รหัส เช่น LOT-LS-4029"
                className="flex-1 h-10 px-3 bg-surface-container-low rounded-lg font-code-dense text-on-surface border border-outline-variant/40"
                value={barcodeInput}
                onChange={(e) => setBarcodeInput(e.target.value)}
              />
              <button
                type="submit"
                className="px-4 h-10 bg-secondary text-on-secondary rounded-lg font-label-md font-bold hover:bg-on-secondary-fixed-variant cursor-pointer"
              >
                ค้นหา
              </button>
            </form>
          </div>

          <div className="text-left bg-surface-container-low p-3 rounded-lg border border-outline-variant/40">
            <span className="text-xs font-bold text-on-surface-variant uppercase block mb-1.5">
              ทดสอบคลิกเพื่อจำลองการสแกนยาตัวอย่าง:
            </span>
            <div className="flex flex-col gap-1.5">
              {medications.slice(0, 4).map((med) => (
                <button
                  key={med.id}
                  onClick={() => handleScan(med.lot)}
                  className="w-full text-left p-1.5 rounded hover:bg-surface-container text-xs flex justify-between items-center transition-colors cursor-pointer"
                >
                  <span className="font-bold text-on-surface">{med.name}</span>
                  <span className="font-code-dense text-secondary">{med.lot}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
