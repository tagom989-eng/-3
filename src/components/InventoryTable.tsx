import React, { useState, useMemo } from 'react';
import { Medication, CATEGORIES } from '../data/mockData';

interface InventoryTableProps {
  medications: Medication[];
  onOpenDispenseForMed: (med: Medication) => void;
  onOpenExcelModal: () => void;
  onOpenAddMedModal: () => void;
  onOpenBarcodeModal: () => void;
  onStockAudit: () => void;
  onExportCsv: () => void;
}

export const InventoryTable: React.FC<InventoryTableProps> = ({
  medications,
  onOpenDispenseForMed,
  onOpenExcelModal,
  onOpenAddMedModal,
  onOpenBarcodeModal,
  onStockAudit,
  onExportCsv,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด');
  const [stockStatusFilter, setStockStatusFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState<'fefo' | 'fifo' | 'name'>('fefo');
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Filter and sort items
  const filteredMedications = useMemo(() => {
    return medications.filter((med) => {
      const matchSearch =
        searchQuery.trim() === '' ||
        med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        med.genericName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        med.ndc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        med.lot.toLowerCase().includes(searchQuery.toLowerCase()) ||
        med.storageBay.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCategory =
        selectedCategory === 'ทั้งหมด' ||
        med.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        med.categoryTag.toLowerCase().includes(selectedCategory.toLowerCase());

      const matchStatus =
        stockStatusFilter === 'all' ||
        (stockStatusFilter === 'critical' && med.stock <= 20) ||
        (stockStatusFilter === 'low' && med.status === 'low') ||
        (stockStatusFilter === 'normal' && med.status === 'normal');

      return matchSearch && matchCategory && matchStatus;
    });
  }, [medications, searchQuery, selectedCategory, stockStatusFilter]);

  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col">
      {/* Action Header & Filters */}
      <div className="p-space-md flex flex-col gap-space-md bg-surface-container-low">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
          {/* Search bar with Keyboard Shortcut Indicator */}
          <div className="relative flex-1 max-w-xl">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-[18px]">
              search
            </span>
            <input
              className="w-full h-10 pl-10 pr-20 bg-surface-container-lowest rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:bg-surface-container-lowest shadow-inner placeholder:text-on-surface-variant/70 border border-outline-variant/40"
              id="inventorySearch"
              placeholder="ค้นหาด้วยชื่อยา, รหัสยา (NDC), เลขล็อตการผลิต หรือ บาร์โค้ด (กด / เพื่อค้นหา)..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute right-2.5 top-2.5 inline-flex items-center px-1.5 py-0.5 rounded bg-surface-container text-on-surface-variant font-code-dense text-code-dense font-semibold select-none">
              Ctrl+K
            </div>
          </div>

          {/* Global Inventory Rapid Command Buttons */}
          <div className="flex flex-wrap items-center gap-space-xs">
            <button
              className="inline-flex items-center gap-space-xs px-space-md h-10 rounded-lg bg-secondary text-on-secondary font-label-md text-label-md hover:bg-on-secondary-fixed-variant transition-colors shadow-sm cursor-pointer"
              onClick={onOpenExcelModal}
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">table_view</span>
              <span>นำเข้าข้อมูล Excel (.xlsx / .csv)</span>
            </button>

            <button
              className="inline-flex items-center gap-space-xs px-space-md h-10 rounded-lg bg-primary text-on-primary font-label-md text-label-md hover:bg-on-primary-fixed-variant transition-colors shadow-sm cursor-pointer"
              onClick={onOpenAddMedModal}
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
              <span>+ เพิ่มรายการยาใหม่</span>
            </button>

            <button
              className="inline-flex items-center gap-space-xs px-space-md h-10 rounded-lg bg-secondary text-on-secondary font-label-md text-label-md hover:bg-on-secondary-fixed-variant transition-colors shadow-sm cursor-pointer"
              onClick={onOpenBarcodeModal}
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">
                barcode_scanner
              </span>
              <span>สแกนบาร์โค้ดด่วน (F2)</span>
            </button>

            <button
              className="inline-flex items-center gap-space-xs px-space-md h-10 rounded-lg bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors cursor-pointer"
              onClick={onStockAudit}
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">inventory</span>
              <span>ตรวจนับสต็อก</span>
            </button>

            <button
              className="inline-flex items-center gap-space-xs px-space-md h-10 rounded-lg bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors cursor-pointer"
              onClick={onExportCsv}
              title="ส่งออกข้อมูลคลังยาและรายการบัญชียาเป็นไฟล์ CSV"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">
                file_download
              </span>
              <span>ส่งออกข้อมูลคลังยา</span>
            </button>
          </div>
        </div>

        {/* Filter Controls: Category, Stock Level, Storage Mode */}
        <div className="flex flex-wrap items-center justify-between gap-space-sm pt-space-xs">
          <div className="flex flex-wrap items-center gap-space-xs">
            <span className="font-label-sm text-label-sm uppercase font-bold text-on-surface-variant pr-space-xs">
              กลุ่มยาทั้งหมด (Formulary Category):
            </span>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.name}
                className={`px-space-sm py-1 rounded-full font-label-sm text-label-sm font-semibold transition-colors cursor-pointer ${
                  selectedCategory === cat.name
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
                }`}
                type="button"
                onClick={() => setSelectedCategory(cat.name)}
              >
                {cat.name} ({cat.count})
              </button>
            ))}
          </div>

          <div className="flex items-center gap-space-sm flex-wrap">
            <div className="flex items-center gap-space-xs bg-surface-container-lowest px-space-sm py-1 rounded-lg border border-outline-variant/40">
              <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold">
                สถานะสต็อก (Stock Status):
              </span>
              <select
                className="bg-transparent font-label-sm text-label-sm text-on-surface font-semibold focus:outline-none cursor-pointer"
                value={stockStatusFilter}
                onChange={(e) => setStockStatusFilter(e.target.value)}
              >
                <option value="all">สถานะสต็อกทั้งหมด</option>
                <option value="critical">วิกฤตใกล้หมด (&lt; 20)</option>
                <option value="low">สต็อกต่ำกว่าเกณฑ์</option>
                <option value="normal">พร้อมใช้ปกติ</option>
              </select>
            </div>

            <div className="flex items-center gap-space-xs bg-surface-container-lowest px-space-sm py-1 rounded-lg border border-outline-variant/40">
              <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold">
                เรียงตามวันหมดอายุ:
              </span>
              <select
                className="bg-transparent font-label-sm text-label-sm text-on-surface font-semibold focus:outline-none cursor-pointer"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as any)}
              >
                <option value="fefo">หมดอายุก่อนสุด (FEFO)</option>
                <option value="fifo">เข้าใหม่ล่าสุด (FIFO)</option>
                <option value="name">ชื่อยา (A-Z)</option>
              </select>
            </div>

            <span className="font-body-sm text-body-sm text-on-surface-variant">
              แสดง {filteredMedications.length} จาก 1,482 รายการ
            </span>
          </div>
        </div>
      </div>

      {/* Inventory Data Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-high text-on-surface">
              <th className="py-space-sm px-space-md font-label-sm text-label-sm font-bold uppercase tracking-wider">
                รายการยาและรูปแบบ (Medication & Form)
              </th>
              <th className="py-space-sm px-space-md font-label-sm text-label-sm font-bold uppercase tracking-wider">
                ล็อต / รหัส NDC / วันหมดอายุ (Batch & Exp)
              </th>
              <th className="py-space-sm px-space-md font-label-sm text-label-sm font-bold uppercase tracking-wider">
                กลุ่มการรักษา (Category)
              </th>
              <th className="py-space-sm px-space-md font-label-sm text-label-sm font-bold uppercase tracking-wider">
                สต็อกคงเหลือ (Available Stock)
              </th>
              <th className="py-space-sm px-space-md font-label-sm text-label-sm font-bold uppercase tracking-wider">
                สถานะสต็อก
              </th>
              <th className="py-space-sm px-space-md font-label-sm text-label-sm font-bold uppercase tracking-wider">
                ราคาต่อหน่วย / อุณหภูมิจัดเก็บ (Unit Price / Temp)
              </th>
              <th className="py-space-sm px-space-md font-label-sm text-label-sm font-bold uppercase tracking-wider text-right">
                ดำเนินการ (Action)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container-low font-body-sm text-body-sm">
            {filteredMedications.map((med) => (
              <tr
                key={med.id}
                className="hover:bg-surface-container-low transition-colors bg-surface-container-lowest"
              >
                {/* Medication & Form */}
                <td className="py-space-sm px-space-md">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-space-xs">
                      <span className="font-headline-sm text-headline-sm text-on-surface font-bold leading-tight">
                        {med.name}
                      </span>
                      {med.isControlled && med.controlledTag && (
                        <span className="px-1.5 py-0.2 rounded font-label-sm text-label-sm font-bold bg-tertiary-container text-tertiary-fixed-dim">
                          {med.controlledTag}
                        </span>
                      )}
                      {med.isColdChain && (
                        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded font-label-sm text-label-sm font-bold bg-secondary-fixed text-on-secondary-fixed">
                          <span className="material-symbols-outlined text-[12px]">
                            ac_unit
                          </span>
                          ตู้แช่ยา
                        </span>
                      )}
                    </div>
                    <span className="text-on-surface-variant font-medium">
                      {med.dosage} {med.form} • {med.route}
                    </span>
                  </div>
                </td>

                {/* Batch & Exp */}
                <td className="py-space-sm px-space-md font-code-dense text-code-dense">
                  <div className="flex flex-col">
                    <span className="font-bold text-on-surface">{med.lot}</span>
                    <span className="text-on-surface-variant">{med.ndc}</span>
                    <span
                      className={`font-semibold ${
                        med.status === 'critical' ? 'text-error' : 'text-secondary'
                      }`}
                    >
                      หมดอายุ: {med.expiryDate}
                    </span>
                  </div>
                </td>

                {/* Category */}
                <td className="py-space-sm px-space-md">
                  <div className="flex flex-col gap-1 items-start">
                    <span
                      className={`inline-flex items-center px-1.5 py-0.5 rounded font-label-sm text-label-sm font-semibold ${
                        med.isControlled
                          ? 'bg-surface-container-high text-on-surface'
                          : 'bg-surface-container text-on-surface'
                      }`}
                    >
                      {med.categoryTag}
                    </span>
                    {med.isControlled ? (
                      <span className="font-code-dense text-code-dense text-error font-bold">
                        ต้องเซ็นกำกับคู่
                      </span>
                    ) : (
                      <span className="font-code-dense text-code-dense text-on-surface-variant">
                        ยาตามใบสั่งแพทย์ (Rx)
                      </span>
                    )}
                  </div>
                </td>

                {/* Available Stock */}
                <td className="py-space-sm px-space-md">
                  <div className="flex flex-col">
                    <span
                      className={`font-headline-sm text-headline-sm font-bold ${
                        med.status === 'critical' ? 'text-error' : 'text-on-surface'
                      }`}
                    >
                      {med.stock}
                    </span>
                    <span
                      className={`font-label-sm text-label-sm ${
                        med.status === 'critical'
                          ? 'text-error font-medium'
                          : 'text-on-surface-variant'
                      }`}
                    >
                      {med.packDetails}
                    </span>
                  </div>
                </td>

                {/* Stock Status Badge */}
                <td className="py-space-sm px-space-md">
                  {med.status === 'critical' ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-label-sm text-label-sm font-bold bg-error-container text-on-error-container">
                      <span className="w-1.5 h-1.5 rounded-full bg-error"></span>
                      ต้องสั่งซื้อด่วน
                    </span>
                  ) : med.status === 'low' ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-label-sm text-label-sm font-bold bg-surface-container-high text-on-surface">
                      <span className="w-1.5 h-1.5 rounded-full bg-outline"></span>
                      สต็อกต่ำ
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-label-sm text-label-sm font-bold bg-secondary-container text-on-secondary-container">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                      ปกติ / พร้อมใช้
                    </span>
                  )}
                </td>

                {/* Unit Price & Storage Temp */}
                <td className="py-space-sm px-space-md">
                  <div className="flex flex-col">
                    <span className="font-code-dense text-code-dense font-bold text-on-surface">
                      {med.priceDisplay}
                    </span>
                    <span
                      className={`font-body-sm text-body-sm ${
                        med.isColdChain
                          ? 'text-secondary font-medium'
                          : 'text-on-surface-variant'
                      }`}
                    >
                      {med.tempCondition}
                    </span>
                  </div>
                </td>

                {/* Action Buttons */}
                <td className="py-space-sm px-space-md text-right">
                  <div className="inline-flex items-center gap-space-xs relative">
                    {med.status === 'critical' ? (
                      <button
                        className="px-space-sm py-1 rounded bg-error text-on-error font-label-sm text-label-sm font-bold hover:opacity-90 transition-opacity shadow-sm cursor-pointer"
                        onClick={() => onOpenDispenseForMed(med)}
                        type="button"
                      >
                        สั่งเบิกยา
                      </button>
                    ) : med.isControlled ? (
                      <button
                        className="px-space-sm py-1 rounded bg-primary-container text-surface font-label-sm text-label-sm font-bold hover:bg-inverse-surface transition-colors shadow-sm cursor-pointer"
                        onClick={() => onOpenDispenseForMed(med)}
                        type="button"
                      >
                        เซ็นจ่ายยา
                      </button>
                    ) : (
                      <button
                        className="px-space-sm py-1 rounded bg-secondary text-on-secondary font-label-sm text-label-sm font-bold hover:bg-on-secondary-fixed-variant transition-colors shadow-sm cursor-pointer"
                        onClick={() => onOpenDispenseForMed(med)}
                        type="button"
                      >
                        จ่ายยา
                      </button>
                    )}

                    <div className="relative">
                      <button
                        className="p-1 rounded text-on-surface-variant hover:bg-surface-container transition-colors cursor-pointer"
                        title="ปรับยอดสต็อก / ตรวจสอบ"
                        type="button"
                        onClick={() =>
                          setActiveMenuId(activeMenuId === med.id ? null : med.id)
                        }
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          more_vert
                        </span>
                      </button>

                      {activeMenuId === med.id && (
                        <div className="absolute right-0 top-8 w-48 bg-surface-container-lowest rounded-xl shadow-xl border border-outline-variant p-1 z-30 flex flex-col text-left">
                          <button
                            className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-surface-container text-sm font-medium text-on-surface"
                            onClick={() => {
                              setActiveMenuId(null);
                              onOpenDispenseForMed(med);
                            }}
                          >
                            จ่ายยานี้
                          </button>
                          <button
                            className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-surface-container text-sm font-medium text-on-surface"
                            onClick={() => {
                              setActiveMenuId(null);
                              alert(`ตรวจนับสต็อก: ${med.name} คงเหลือในระบบ ${med.stock} ${med.unit}`);
                            }}
                          >
                            ตรวจนับสต็อกช่อง {med.storageBay}
                          </button>
                          <button
                            className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-surface-container text-sm font-medium text-on-surface"
                            onClick={() => {
                              setActiveMenuId(null);
                              alert(`พิมพ์ฉลากบาร์โค้ดสำหรับ ${med.name} (NDC: ${med.ndc})`);
                            }}
                          >
                            พิมพ์บาร์โค้ดประจำช่อง
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table Pagination & Bulk Status Footer */}
      <div className="p-space-md bg-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-space-sm border-t border-outline-variant/30">
        <div className="flex items-center gap-space-md font-body-sm text-body-sm text-on-surface-variant flex-wrap">
          <span>
            แสดงรายการต่อหน้า: <strong>25</strong> (โหมดมุมมองความหนาแน่นสูง)
          </span>
          <span>•</span>
          <span>
            เวอร์ชันฐานข้อมูลบัญชียา:{' '}
            <span className="font-code-dense text-code-dense text-on-surface font-bold">
              2026.11-OFFLINE
            </span>
          </span>
        </div>

        <div className="flex items-center gap-space-xs">
          <button
            className="px-space-md py-1 rounded-lg bg-surface-container font-label-sm text-label-sm font-semibold text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer"
            type="button"
          >
            ก่อนหน้า
          </button>
          <span className="font-body-sm text-body-sm px-space-sm font-bold text-on-surface">
            หน้า 1 จาก 60
          </span>
          <button
            className="px-space-md py-1 rounded-lg bg-surface-container font-label-sm text-label-sm font-semibold text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer"
            type="button"
          >
            ถัดไป
          </button>
        </div>
      </div>
    </div>
  );
};
