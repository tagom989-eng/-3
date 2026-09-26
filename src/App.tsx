import { useState, useEffect } from 'react';
import {
  INITIAL_MEDICATIONS,
  INITIAL_PATIENTS,
  INITIAL_DISPENSE_LOGS,
  Medication,
  Patient,
  DispenseLogItem,
} from './data/mockData';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { SubHeaderRibbon } from './components/SubHeaderRibbon';
import { KpiCards } from './components/KpiCards';
import { PriorityAlerts } from './components/PriorityAlerts';
import { InventoryTable } from './components/InventoryTable';
import { QuickDispenseModal } from './components/QuickDispenseModal';
import { ExcelImportModal } from './components/ExcelImportModal';
import { AddMedicineModal } from './components/AddMedicineModal';
import { BarcodeModal } from './components/BarcodeModal';
import { PurchaseOrderModal } from './components/PurchaseOrderModal';
import { PrescriptionsView } from './components/PrescriptionsView';
import { DispenseLogView } from './components/DispenseLogView';
import { AnalyticsView } from './components/AnalyticsView';

export default function App() {
  const [activeTab, setActiveTab] = useState<'inventory' | 'prescriptions' | 'dispensing-log' | 'analytics'>('inventory');

  // Core state
  const [medications, setMedications] = useState<Medication[]>(INITIAL_MEDICATIONS);
  const [patients, setPatients] = useState<Patient[]>(INITIAL_PATIENTS);
  const [dispenseLogs, setDispenseLogs] = useState<DispenseLogItem[]>(INITIAL_DISPENSE_LOGS);

  // Selected patient & drug for dispensing modal (defaults to Marcus Vance & Lisinopril as seen in screenshot)
  const [selectedPatient, setSelectedPatient] = useState<Patient>(INITIAL_PATIENTS[0]);
  const [selectedMedication, setSelectedMedication] = useState<Medication | null>(
    INITIAL_MEDICATIONS.find((m) => m.name.includes('Lisinopril')) || INITIAL_MEDICATIONS[0]
  );

  // Modals state - Note: in the user's screenshot, the quick dispense modal is open in the foreground!
  const [isDispenseModalOpen, setIsDispenseModalOpen] = useState<boolean>(true);
  const [isExcelModalOpen, setIsExcelModalOpen] = useState<boolean>(false);
  const [isAddMedModalOpen, setIsAddMedModalOpen] = useState<boolean>(false);
  const [isBarcodeModalOpen, setIsBarcodeModalOpen] = useState<boolean>(false);
  const [isPoModalOpen, setIsPoModalOpen] = useState<boolean>(false);
  const [poPreselectedDrug, setPoPreselectedDrug] = useState<string>('');

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<{ title: string; desc: string } | null>(null);

  // Metrics
  const [dispensedTodayCount, setDispensedTodayCount] = useState<number>(142);
  const [dispensedTodayAmount, setDispensedTodayAmount] = useState<number>(238420);

  const showToast = (title: string, desc: string) => {
    setToastMessage({ title, desc });
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Keyboard shortcut listener (F2 = Scan / Quick Dispense, F3 = Counter, Esc = Close, Ctrl+K / '/' = Focus search)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsDispenseModalOpen(false);
        setIsExcelModalOpen(false);
        setIsAddMedModalOpen(false);
        setIsBarcodeModalOpen(false);
        setIsPoModalOpen(false);
      } else if (e.key === 'F2') {
        e.preventDefault();
        setIsBarcodeModalOpen(true);
      } else if (e.key === 'F3') {
        e.preventDefault();
        setIsDispenseModalOpen((prev) => !prev);
      } else if ((e.key === 'k' && (e.ctrlKey || e.metaKey)) || e.key === '/') {
        if (
          document.activeElement?.tagName !== 'INPUT' &&
          document.activeElement?.tagName !== 'TEXTAREA'
        ) {
          e.preventDefault();
          const searchInput = document.getElementById('inventorySearch');
          if (searchInput) searchInput.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Action handlers
  const handleOpenDispenseForMed = (med: Medication) => {
    setSelectedMedication(med);
    setIsDispenseModalOpen(true);
  };

  const handleConfirmDispense = (
    med: Medication,
    qty: number,
    instructions: string,
    patient: Patient
  ) => {
    // 1. Decrement stock
    setMedications((prev) =>
      prev.map((item) => {
        if (item.id === med.id) {
          const newStock = Math.max(0, item.stock - qty);
          let newStatus = item.status;
          if (newStock <= 20) newStatus = 'critical';
          else if (newStock <= item.minThreshold) newStatus = 'low';
          return {
            ...item,
            stock: newStock,
            status: newStatus,
          };
        }
        return item;
      })
    );

    // 2. Add log entry
    const newTxId = `#TX-202611-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(
      now.getMinutes()
    ).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')} น.`;
    const cost = qty * (med.unitPrice / (med.unit === 'เม็ด' && med.priceDisplay.includes('100') ? 100 : 1));

    const newLogItem: DispenseLogItem = {
      id: 'log-' + Date.now(),
      txId: newTxId,
      timestamp: timeStr,
      patientName: patient.name,
      hn: patient.hn,
      medicationName: `${med.name} ${med.dosage}`,
      lot: med.lot,
      qty,
      unit: med.unit,
      instructions,
      pharmacist: 'ภญ. เอเวอลิน แวนซ์',
      verifiedStatus: 'ผ่านเกณฑ์ตรวจสอบ',
      amount: Math.round(cost) || 645,
    };

    setDispenseLogs((prev) => [newLogItem, ...prev]);
    setDispensedTodayCount((prev) => prev + 1);
    setDispensedTodayAmount((prev) => prev + (Math.round(cost) || 645));

    // 3. Close modal & show toast
    setIsDispenseModalOpen(false);
    showToast(
      'บันทึกการจ่ายยาเรียบร้อยแล้ว',
      `ตัดยอดสต็อกยาสำเร็จ (-${qty} ${med.unit}) และบันทึกลงฐานข้อมูล SQLite ในเครื่องแล้ว (TxID: ${newTxId})`
    );
  };

  const handleConfirmExcelImport = () => {
    setIsExcelModalOpen(false);
    showToast(
      'นำเข้าข้อมูลไฟล์ Excel สำเร็จ',
      'นำเข้าข้อมูล 248 รายการลงฐานข้อมูลออฟไลน์เรียบร้อยแล้ว'
    );
  };

  const handleAddMedicine = (newMed: Medication) => {
    setMedications((prev) => [newMed, ...prev]);
    showToast(
      'เพิ่มรายการยาใหม่สำเร็จ',
      `บันทึก ${newMed.name} (${newMed.dosage}) เข้าคลังยาเรียบร้อยแล้ว`
    );
  };

  const handleExportCsv = () => {
    const headers = ['ID', 'Name', 'GenericName', 'Dosage', 'LOT', 'NDC', 'Expiry', 'Stock', 'Unit', 'Price', 'Location'];
    const rows = medications.map((m) => [
      m.id,
      `"${m.name}"`,
      `"${m.genericName}"`,
      m.dosage,
      m.lot,
      m.ndc,
      m.expiryDate,
      m.stock,
      m.unit,
      m.unitPrice,
      `"${m.storageBay} / ${m.shelf}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'pharmasync_inventory_2026.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('ส่งออกข้อมูลคลังยาสำเร็จ', 'ไฟล์ pharmasync_inventory_2026.csv พร้อมดาวน์โหลดแล้ว');
  };

  const handleStockAudit = () => {
    showToast('เริ่มกระบวนการตรวจนับสต็อก', 'เปิดโหมด Cycle Count ประจำรอบสัปดาห์ LOC-STORE-BAY-04');
  };

  const handleOrderBatch = (drugName: string) => {
    setPoPreselectedDrug(drugName);
    setIsPoModalOpen(true);
  };

  const handleLockReserve = (drugName: string) => {
    showToast('ล็อกยอดสำรองยาสำเร็จ', `กำหนดสถานะโควตาสำรองฉุกเฉินสำหรับ ${drugName} เรียบร้อยแล้ว`);
  };

  const handleForecast = (drugName: string) => {
    showToast('พยากรณ์อัตราการใช้ยา 7 วัน', `${drugName}: คาดการณ์ความต้องการ 85 แผง (อัตราการใช้เพิ่มขึ้น 12%)`);
  };

  const handleQuarantine = (drugName: string) => {
    showToast('กักกันยาใกล้หมดอายุ', `ย้าย ${drugName} ไปยังพื้นที่กักกันยาเพื่อรอเปลี่ยนคืนผู้ผลิต`);
  };

  const handleConfirmPO = (poNumber: string, count: number) => {
    showToast('อนุมัติใบสั่งซื้อยา (PO) สำเร็จ', `สร้างเอกสาร ${poNumber} จำนวน ${count} รายการลงคิวเบิกจ่ายเรียบร้อย`);
  };

  return (
    <div className="bg-background font-body-md text-body-md text-on-surface antialiased min-h-screen">
      {/* Fixed Left Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={(t) => setActiveTab(t as any)} />

      {/* Main Content Area */}
      <div className="pl-64">
        {/* Top Header */}
        <Header
          onOpenDispenseModal={() => setIsDispenseModalOpen(true)}
          unreadAlertsCount={3}
        />

        <main className="w-full pt-16 bg-background px-margin min-h-screen">
          <div className="flex flex-col w-full py-space-md gap-space-lg">
            {/* Sub-Header Ribbon: Location & Air-gap Status */}
            <SubHeaderRibbon onOpenDispenseModal={() => setIsDispenseModalOpen(true)} />

            {/* TAB 1: Inventory & Stock Management (The primary screen in screenshot) */}
            {activeTab === 'inventory' && (
              <>
                {/* 4 Bento KPI Metric Cards */}
                <KpiCards
                  totalDrugsCount={1482}
                  criticalCount={14}
                  dispensedTodayCount={dispensedTodayCount}
                  dispensedTodayAmount={dispensedTodayAmount}
                  onOpenPoModal={() => {
                    setPoPreselectedDrug('');
                    setIsPoModalOpen(true);
                  }}
                />

                {/* Priority Action Alerts (Amoxicillin, Metformin, Epinephrine) */}
                <PriorityAlerts
                  onOrderBatch={handleOrderBatch}
                  onLockReserve={handleLockReserve}
                  onForecast={handleForecast}
                  onQuarantine={handleQuarantine}
                />

                {/* Main Interactive Inventory Data Table */}
                <InventoryTable
                  medications={medications}
                  onOpenDispenseForMed={handleOpenDispenseForMed}
                  onOpenExcelModal={() => setIsExcelModalOpen(true)}
                  onOpenAddMedModal={() => setIsAddMedModalOpen(true)}
                  onOpenBarcodeModal={() => setIsBarcodeModalOpen(true)}
                  onStockAudit={handleStockAudit}
                  onExportCsv={handleExportCsv}
                />
              </>
            )}

            {/* TAB 2: Patient Prescriptions Queue */}
            {activeTab === 'prescriptions' && (
              <PrescriptionsView
                patients={patients}
                medications={medications}
                onSelectPatientToDispense={(pt, med) => {
                  setSelectedPatient(pt);
                  setSelectedMedication(med);
                  setIsDispenseModalOpen(true);
                }}
              />
            )}

            {/* TAB 3: Dispense Audit Log */}
            {activeTab === 'dispensing-log' && (
              <DispenseLogView
                logs={dispenseLogs}
                onPrintReceipt={(item) => {
                  showToast('ส่งคำสั่งพิมพ์ฉลากยา', `สั่งพิมพ์ฉลากยาความร้อน Zebra สำหรับ ${item.patientName} (${item.txId})`);
                }}
              />
            )}

            {/* TAB 4: Reports & Analytics */}
            {activeTab === 'analytics' && <AnalyticsView medications={medications} />}
          </div>
        </main>
      </div>

      {/* Quick Medication Dispensing Modal Overlay (Matches the screenshot layout) */}
      <QuickDispenseModal
        isOpen={isDispenseModalOpen}
        onClose={() => setIsDispenseModalOpen(false)}
        selectedMedication={selectedMedication}
        patient={selectedPatient}
        patientsList={patients}
        onSelectPatient={(pt) => {
          setSelectedPatient(pt);
          const preferredMed = medications.find((m) => m.id === pt.defaultDrugId);
          if (preferredMed) setSelectedMedication(preferredMed);
        }}
        onConfirmDispense={handleConfirmDispense}
        allMedications={medications}
        onSelectMedication={(med) => setSelectedMedication(med)}
      />

      {/* Excel Import Modal */}
      <ExcelImportModal
        isOpen={isExcelModalOpen}
        onClose={() => setIsExcelModalOpen(false)}
        onConfirmImport={handleConfirmExcelImport}
      />

      {/* Add Medicine Modal */}
      <AddMedicineModal
        isOpen={isAddMedModalOpen}
        onClose={() => setIsAddMedModalOpen(false)}
        onAddMedicine={handleAddMedicine}
      />

      {/* Barcode Scanner Modal */}
      <BarcodeModal
        isOpen={isBarcodeModalOpen}
        onClose={() => setIsBarcodeModalOpen(false)}
        medications={medications}
        onSelectMedication={(med) => {
          setSelectedMedication(med);
          setIsDispenseModalOpen(true);
        }}
      />

      {/* Purchase Order Modal */}
      <PurchaseOrderModal
        isOpen={isPoModalOpen}
        onClose={() => setIsPoModalOpen(false)}
        preSelectedDrug={poPreselectedDrug}
        medications={medications}
        onConfirmPO={handleConfirmPO}
      />

      {/* Simulated Offline Toast Notification */}
      {toastMessage && (
        <div
          className="fixed bottom-6 right-6 z-50 bg-inverse-surface text-inverse-on-surface px-space-lg py-space-md rounded-xl shadow-2xl flex items-center gap-space-sm transition-all border border-secondary/40"
          id="toastNotification"
        >
          <span className="material-symbols-outlined text-secondary-fixed text-[22px]">
            check_circle
          </span>
          <div className="flex flex-col">
            <span className="font-label-md text-label-md font-bold text-surface">
              {toastMessage.title}
            </span>
            <span className="font-body-sm text-body-sm text-inverse-primary">
              {toastMessage.desc}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
