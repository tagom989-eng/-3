import React, { useState } from 'react';
import { Medication } from '../data/mockData';

interface AddMedicineModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMedicine: (med: Medication) => void;
}

export const AddMedicineModal: React.FC<AddMedicineModalProps> = ({
  isOpen,
  onClose,
  onAddMedicine,
}) => {
  const [name, setName] = useState('');
  const [genericName, setGenericName] = useState('');
  const [dosage, setDosage] = useState('');
  const [form, setForm] = useState('ยาเม็ด (Tablet)');
  const [lot, setLot] = useState('LOT-' + Math.floor(1000 + Math.random() * 9000));
  const [ndc, setNdc] = useState('NDC 50090-' + Math.floor(1000 + Math.random() * 9000) + '-0');
  const [expiryDate, setExpiryDate] = useState('12/2028');
  const [category, setCategory] = useState('ระบบหัวใจและหลอดเลือด');
  const [stock, setStock] = useState(500);
  const [unit, setUnit] = useState('เม็ด');
  const [unitPrice, setUnitPrice] = useState(250);
  const [storageBay, setStorageBay] = useState('BAY-06');
  const [shelf, setShelf] = useState('ชั้น 2');
  const [tempCondition, setTempCondition] = useState('อุณหภูมิห้อง 20-25°C');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('กรุณากรอกชื่อยา');
      return;
    }
    const newMed: Medication = {
      id: 'med-' + Date.now(),
      name,
      genericName: genericName || name,
      dosage: dosage || '10mg',
      form,
      route: 'รับประทาน',
      lot,
      ndc,
      expiryDate,
      category,
      categoryTag: category,
      stock,
      unit,
      minThreshold: 100,
      status: stock <= 20 ? 'critical' : stock < 100 ? 'low' : 'normal',
      unitPrice,
      priceDisplay: `฿${unitPrice.toFixed(2)} / กล่อง`,
      storageBay,
      shelf,
      packDetails: `${unit} (${shelf})`,
      tempCondition,
    };
    onAddMedicine(newMed);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-space-md bg-primary-container/70 backdrop-blur-sm">
      <div className="bg-surface-container-lowest rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col border border-outline-variant/30">
        <div className="px-space-lg py-space-md bg-primary-container text-surface flex items-center justify-between">
          <div className="flex items-center gap-space-sm">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-on-primary">
              <span className="material-symbols-outlined text-[20px]">add_circle</span>
            </div>
            <div>
              <h3 className="font-headline-sm font-bold text-surface">
                เพิ่มรายการยาใหม่เข้าคลัง (New Formulary)
              </h3>
              <span className="font-label-sm text-secondary-fixed">
                บันทึกลงฐานข้อมูลยาออฟไลน์ในเครื่อง
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

        <form onSubmit={handleSubmit} className="p-space-lg flex flex-col gap-4 overflow-y-auto max-h-[700px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-label-sm text-on-surface-variant font-bold">ชื่อทางการค้า (Trade Name)</label>
              <input
                type="text"
                required
                className="w-full h-10 px-3 mt-1 bg-surface-container-low rounded-lg font-body-md text-on-surface border border-outline-variant/40"
                placeholder="เช่น Lipitor, Augmentin, etc."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="font-label-sm text-on-surface-variant font-bold">ชื่อสามัญทางยา (Generic Name)</label>
              <input
                type="text"
                className="w-full h-10 px-3 mt-1 bg-surface-container-low rounded-lg font-body-md text-on-surface border border-outline-variant/40"
                placeholder="เช่น Atorvastatin Calcium"
                value={genericName}
                onChange={(e) => setGenericName(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="font-label-sm text-on-surface-variant font-bold">ความแรง (Dosage)</label>
              <input
                type="text"
                className="w-full h-10 px-3 mt-1 bg-surface-container-low rounded-lg font-body-md text-on-surface border border-outline-variant/40"
                placeholder="เช่น 10mg, 500mg"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
              />
            </div>
            <div>
              <label className="font-label-sm text-on-surface-variant font-bold">รูปแบบยา (Form)</label>
              <select
                className="w-full h-10 px-3 mt-1 bg-surface-container-low rounded-lg font-body-md text-on-surface border border-outline-variant/40 cursor-pointer"
                value={form}
                onChange={(e) => setForm(e.target.value)}
              >
                <option>ยาเม็ด (Tablet)</option>
                <option>แคปซูล (Capsule)</option>
                <option>ยาน้ำ / ยาน้ำเชื่อม (Syrup)</option>
                <option>ยาฉีด (Injection / Vial)</option>
                <option>ยาทาภายนอก (Cream / Ointment)</option>
              </select>
            </div>
            <div>
              <label className="font-label-sm text-on-surface-variant font-bold">กลุ่มยา (Category)</label>
              <select
                className="w-full h-10 px-3 mt-1 bg-surface-container-low rounded-lg font-body-md text-on-surface border border-outline-variant/40 cursor-pointer"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>ระบบหัวใจและหลอดเลือด</option>
                <option>ยาปฏิชีวนะ</option>
                <option>ยาควบคุมพิเศษ / Sch II</option>
                <option>ยาแก้ปวดและลดการอักเสบ</option>
                <option>ยาแช่เย็นควบคุมอุณหภูมิ</option>
                <option>ยารักษาเบาหวาน</option>
                <option>ระบบทางเดินอาหาร</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="font-label-sm text-on-surface-variant font-bold">เลขล็อต (Lot Number)</label>
              <input
                type="text"
                className="w-full h-10 px-3 mt-1 bg-surface-container-low rounded-lg font-body-md text-on-surface border border-outline-variant/40 font-code-dense"
                value={lot}
                onChange={(e) => setLot(e.target.value)}
              />
            </div>
            <div>
              <label className="font-label-sm text-on-surface-variant font-bold">รหัส NDC</label>
              <input
                type="text"
                className="w-full h-10 px-3 mt-1 bg-surface-container-low rounded-lg font-body-md text-on-surface border border-outline-variant/40 font-code-dense"
                value={ndc}
                onChange={(e) => setNdc(e.target.value)}
              />
            </div>
            <div>
              <label className="font-label-sm text-on-surface-variant font-bold">วันหมดอายุ (Exp Date)</label>
              <input
                type="text"
                className="w-full h-10 px-3 mt-1 bg-surface-container-low rounded-lg font-body-md text-on-surface border border-outline-variant/40 font-code-dense"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="font-label-sm text-on-surface-variant font-bold">จำนวนรับเข้าคลัง</label>
              <input
                type="number"
                min="1"
                className="w-full h-10 px-3 mt-1 bg-surface-container-low rounded-lg font-headline-sm font-bold text-on-surface border border-outline-variant/40"
                value={stock}
                onChange={(e) => setStock(parseInt(e.target.value) || 0)}
              />
            </div>
            <div>
              <label className="font-label-sm text-on-surface-variant font-bold">หน่วยนับ</label>
              <input
                type="text"
                className="w-full h-10 px-3 mt-1 bg-surface-container-low rounded-lg font-body-md text-on-surface border border-outline-variant/40"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              />
            </div>
            <div>
              <label className="font-label-sm text-on-surface-variant font-bold">ราคาต่อหน่วย (บาท)</label>
              <input
                type="number"
                className="w-full h-10 px-3 mt-1 bg-surface-container-low rounded-lg font-body-md text-on-surface border border-outline-variant/40 font-code-dense"
                value={unitPrice}
                onChange={(e) => setUnitPrice(parseFloat(e.target.value) || 0)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-label-sm text-on-surface-variant font-bold">ช่องจัดเก็บ (Storage Bay & Shelf)</label>
              <input
                type="text"
                className="w-full h-10 px-3 mt-1 bg-surface-container-low rounded-lg font-body-md text-on-surface border border-outline-variant/40"
                placeholder="เช่น ช่อง BAY-06 / ชั้น 2"
                value={storageBay}
                onChange={(e) => setStorageBay(e.target.value)}
              />
            </div>
            <div>
              <label className="font-label-sm text-on-surface-variant font-bold">เงื่อนไขอุณหภูมิ</label>
              <input
                type="text"
                className="w-full h-10 px-3 mt-1 bg-surface-container-low rounded-lg font-body-md text-on-surface border border-outline-variant/40"
                value={tempCondition}
                onChange={(e) => setTempCondition(e.target.value)}
              />
            </div>
          </div>

          <div className="pt-3 border-t border-outline-variant/30 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-surface-container text-on-surface font-label-md font-semibold hover:bg-surface-container-high cursor-pointer"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-primary text-on-primary font-label-md font-bold hover:bg-on-primary-fixed-variant cursor-pointer"
            >
              บันทึกรายการยา
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
