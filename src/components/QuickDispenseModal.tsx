import React, { useState, useEffect } from 'react';
import { Medication, Patient } from '../data/mockData';

interface QuickDispenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedMedication: Medication | null;
  patient: Patient;
  patientsList: Patient[];
  onSelectPatient: (patient: Patient) => void;
  onConfirmDispense: (
    medication: Medication,
    qty: number,
    instructions: string,
    patient: Patient
  ) => void;
  allMedications: Medication[];
  onSelectMedication: (med: Medication) => void;
}

export const QuickDispenseModal: React.FC<QuickDispenseModalProps> = ({
  isOpen,
  onClose,
  selectedMedication,
  patient,
  patientsList,
  onSelectPatient,
  onConfirmDispense,
  allMedications,
  onSelectMedication,
}) => {
  const [dispenseQty, setDispenseQty] = useState<number>(30);
  const [instructions, setInstructions] = useState<string>(
    'รับประทานครั้งละ 1 เม็ด วันละ 1 ครั้ง ตอนเช้า ก่อนหรือหลังอาหาร'
  );
  const [printLabel, setPrintLabel] = useState<boolean>(true);
  const [showPatientSelect, setShowPatientSelect] = useState<boolean>(false);
  const [showDrugSelect, setShowDrugSelect] = useState<boolean>(false);

  // Sync when medication or patient changes
  useEffect(() => {
    if (selectedMedication) {
      if (selectedMedication.name.includes('Lisinopril')) {
        setDispenseQty(30);
        setInstructions('รับประทานครั้งละ 1 เม็ด วันละ 1 ครั้ง ตอนเช้า ก่อนหรือหลังอาหาร');
      } else if (selectedMedication.name.includes('Amoxicillin')) {
        setDispenseQty(20);
        setInstructions('รับประทานครั้งละ 1 แคปซูล วันละ 3 ครั้ง หลังอาหาร เช้า-กลางวัน-เย็น ติดต่อกัน 7 วัน');
      } else if (selectedMedication.name.includes('Metformin')) {
        setDispenseQty(60);
        setInstructions('รับประทานครั้งละ 1 เม็ด วันละ 2 ครั้ง พร้อมหรือหลังอาหาร เช้า-เย็น');
      } else if (selectedMedication.name.includes('Insulin')) {
        setDispenseQty(1);
        setInstructions('ฉีดเข้าใต้ผิวหนัง 20 units วันละ 1 ครั้ง ก่อนนอน (เก็บในตู้เย็น 2-8°C)');
      } else if (selectedMedication.name.includes('Oxycodone')) {
        setDispenseQty(10);
        setInstructions('รับประทานครั้งละ 1 เม็ด ทุก 6-8 ชั่วโมง เมื่อมีอาการปวดรุนแรง (ต้องมีพยานเซ็นกำกับคู่)');
      } else {
        setDispenseQty(30);
        setInstructions('รับประทานตามคำสั่งแพทย์บนฉลาก');
      }
    }
  }, [selectedMedication]);

  if (!isOpen || !selectedMedication) return null;

  // Check contraindications & allergy conflict
  const isPenicillinAllergyConflict =
    patient.allergies.some((a) => a.toLowerCase().includes('penicillin') || a.toLowerCase().includes('เพนิซิลลิน')) &&
    (selectedMedication.name.toLowerCase().includes('amoxicillin') ||
      selectedMedication.name.toLowerCase().includes('ampicillin') ||
      selectedMedication.genericName.toLowerCase().includes('penicillin'));

  const handleConfirm = () => {
    if (dispenseQty <= 0) {
      alert('กรุณาระบุจำนวนที่จ่ายให้ถูกต้อง');
      return;
    }
    if (dispenseQty > selectedMedication.stock) {
      alert(`สต็อกยาไม่เพียงพอ (คงเหลือ ${selectedMedication.stock} ${selectedMedication.unit})`);
      return;
    }
    if (isPenicillinAllergyConflict) {
      const proceed = confirm(
        'คำเตือนด้านความปลอดภัย: ผู้ป่วยมีประวัติแพ้ยากลุ่มนี้โดยตรง! คุณต้องการยืนยันการจ่ายยาด้วยอำนาจวิชาชีพเภสัชกรหรือไม่?'
      );
      if (!proceed) return;
    }
    onConfirmDispense(selectedMedication, dispenseQty, instructions, patient);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-space-md bg-primary-container/70 backdrop-blur-sm"
      id="dispenseModal"
    >
      <div className="bg-surface-container-lowest rounded-xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col border border-outline-variant/30">
        {/* Modal Header */}
        <div className="px-space-lg py-space-md bg-primary-container text-surface flex items-center justify-between">
          <div className="flex items-center gap-space-sm">
            <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-on-secondary">
              <span className="material-symbols-outlined text-[20px]">vaccines</span>
            </div>
            <div className="flex flex-col">
              <h3 className="font-headline-sm text-headline-sm text-surface font-bold">
                หน้าต่างบันทึกจ่ายยาด่วน
              </h3>
              <span className="font-label-sm text-label-sm text-secondary-fixed">
                ธุรกรรมออฟไลน์ • บันทึกระบบตรวจสอบข้อมูลในเครื่องเรียบร้อย
              </span>
            </div>
          </div>
          <button
            className="p-1 rounded-lg text-primary-fixed-dim hover:text-surface hover:bg-inverse-surface transition-colors cursor-pointer"
            onClick={onClose}
            title="ปิดหน้าต่าง (Esc)"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-space-lg flex flex-col gap-space-md overflow-y-auto max-h-[768px]">
          {/* Step 1: Patient Identity Lookup Banner */}
          <div className="bg-surface-container-low p-space-md rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-space-sm relative">
            <div className="flex items-center gap-space-md">
              <div className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-headline-sm shrink-0">
                {patient.name.split(' ').length > 1
                  ? patient.name.split(' ')[0][0] + (patient.name.split(' ')[1]?.[0] || 'P')
                  : 'PT'}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-space-xs flex-wrap">
                  <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
                    {patient.name}
                  </span>
                  <span className="font-code-dense text-code-dense text-on-surface-variant font-semibold">
                    {patient.id.toUpperCase()}
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                    (อายุ {patient.age} ปี • {patient.gender})
                  </span>
                </div>
                <div className="flex items-center gap-space-sm mt-0.5 flex-wrap">
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    เลขประจำตัวผู้ป่วย (HN):{' '}
                    <strong className="text-on-surface">{patient.hn}</strong>
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">•</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    สถานะการเข้ารับบริการ:{' '}
                    <strong className="text-secondary font-semibold">
                      {patient.status}
                    </strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Allergy Flag Pill & Switch Patient button */}
            <div className="flex flex-col items-end gap-1">
              <div
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg font-label-md text-label-md font-bold ${
                  patient.allergies.some((a) => !a.includes('ไม่มี'))
                    ? 'bg-error-container text-on-error-container'
                    : 'bg-secondary-container text-on-secondary-container'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">
                  {patient.allergies.some((a) => !a.includes('ไม่มี'))
                    ? 'emergency'
                    : 'check_circle'}
                </span>
                <span>
                  {patient.allergies.some((a) => !a.includes('ไม่มี'))
                    ? `⚠ ประวัติแพ้ยา: ${patient.allergies.join(', ')}`
                    : 'ไม่มีประวัติแพ้ยา (NKA)'}
                </span>
              </div>
              <button
                className="text-[11px] text-secondary font-semibold hover:underline cursor-pointer"
                type="button"
                onClick={() => setShowPatientSelect(!showPatientSelect)}
              >
                {showPatientSelect ? '▲ ซ่อนรายชื่อ' : '▼ เปลี่ยนผู้ป่วย / ค้นหา HN อื่น'}
              </button>
            </div>
          </div>

          {/* Patient Quick Selector Dropdown */}
          {showPatientSelect && (
            <div className="p-3 bg-surface-container rounded-xl border border-outline-variant flex flex-col gap-2">
              <span className="text-xs font-bold text-on-surface uppercase">
                เลือกผู้ป่วยจากคิวรับบริการ (OPD Queue):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {patientsList.map((pt) => (
                  <button
                    key={pt.id}
                    className={`text-left p-2 rounded-lg border transition-colors ${
                      pt.id === patient.id
                        ? 'bg-surface-container-lowest border-secondary shadow-sm font-semibold'
                        : 'bg-surface-container-low hover:bg-surface-container-lowest border-outline-variant/40'
                    }`}
                    onClick={() => {
                      onSelectPatient(pt);
                      setShowPatientSelect(false);
                    }}
                  >
                    <div className="text-xs font-bold text-on-surface">{pt.name}</div>
                    <div className="text-[11px] text-on-surface-variant">
                      HN: {pt.hn} • {pt.department}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Medication Verification & Selected Batch */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            <div className="flex flex-col gap-space-xs">
              <div className="flex items-center justify-between">
                <label className="font-label-sm text-label-sm uppercase font-bold text-on-surface-variant">
                  ยาที่เลือกจ่าย (PRESCRIPTION DRUG)
                </label>
                <button
                  className="text-[11px] text-secondary font-semibold hover:underline cursor-pointer"
                  onClick={() => setShowDrugSelect(!showDrugSelect)}
                  type="button"
                >
                  {showDrugSelect ? '▲ ซ่อน' : '▼ เปลี่ยนยา'}
                </button>
              </div>
              <div className="p-space-sm bg-surface-container rounded-lg flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
                    {selectedMedication.name} ({selectedMedication.dosage})
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    ล็อต: {selectedMedication.lot} • หมดอายุ: {selectedMedication.expiryDate}
                  </span>
                </div>
                <span className="material-symbols-outlined text-secondary text-[22px]">
                  check_circle
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-space-xs">
              <label className="font-label-sm text-label-sm uppercase font-bold text-on-surface-variant">
                เบิกจ่ายจาก (STOCK SOURCE)
              </label>
              <div className="p-space-sm bg-surface-container rounded-lg flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md font-bold text-on-surface">
                    ช่องสต็อก {selectedMedication.shelf} ({selectedMedication.storageBay})
                  </span>
                  <span className="font-label-sm text-label-sm text-secondary font-bold">
                    คงเหลือพร้อมจ่าย: {selectedMedication.stock} {selectedMedication.unit}
                  </span>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold">
                  พร้อมจ่ายทันที
                </span>
              </div>
            </div>
          </div>

          {/* Drug Selection Quick Menu */}
          {showDrugSelect && (
            <div className="p-3 bg-surface-container rounded-xl border border-outline-variant flex flex-col gap-2">
              <span className="text-xs font-bold text-on-surface uppercase">
                เลือกยาตัวอื่นจากคลังยา:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {allMedications.map((med) => (
                  <button
                    key={med.id}
                    className={`text-left p-2 rounded-lg border transition-colors ${
                      med.id === selectedMedication.id
                        ? 'bg-surface-container-lowest border-secondary shadow-sm font-semibold'
                        : 'bg-surface-container-low hover:bg-surface-container-lowest border-outline-variant/40'
                    }`}
                    onClick={() => {
                      onSelectMedication(med);
                      setShowDrugSelect(false);
                    }}
                  >
                    <div className="text-xs font-bold text-on-surface">{med.name}</div>
                    <div className="text-[11px] text-on-surface-variant">
                      คงเหลือ: {med.stock} {med.unit} • {med.storageBay}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Quantity, Dosage & Instructions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
            <div className="flex flex-col gap-space-xs">
              <label
                className="font-label-sm text-label-sm uppercase font-bold text-on-surface-variant"
                htmlFor="dispenseQty"
              >
                จำนวนที่จ่าย
              </label>
              <div className="relative">
                <input
                  className="w-full h-10 px-3 bg-surface-container-low rounded-lg font-headline-sm text-headline-sm font-bold text-on-surface focus:outline-none focus:bg-surface-container-lowest border border-outline-variant/40"
                  id="dispenseQty"
                  type="number"
                  min="1"
                  max={selectedMedication.stock}
                  value={dispenseQty}
                  onChange={(e) => setDispenseQty(parseInt(e.target.value) || 0)}
                />
                <span className="absolute right-3 top-2.5 font-label-md text-label-md text-on-surface-variant font-semibold select-none">
                  {selectedMedication.unit}
                </span>
              </div>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                สำหรับรับประทาน {dispenseQty} วัน คงเหลือสั่งซ้ำได้ 1 ครั้ง
              </span>
            </div>

            <div className="md:col-span-2 flex flex-col gap-space-xs">
              <label
                className="font-label-sm text-label-sm uppercase font-bold text-on-surface-variant"
                htmlFor="sigInstructions"
              >
                วิธีใช้ยา / ฉลากยาหน้าซอง
              </label>
              <input
                className="w-full h-10 px-3 bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:bg-surface-container-lowest border border-outline-variant/40"
                id="sigInstructions"
                type="text"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
              />
              <span className="font-code-dense text-code-dense text-on-surface-variant">
                รหัสวิธีใช้: 1T PO QD AM
              </span>
            </div>
          </div>

          {/* Safety Contraindication Telemetry Check */}
          {isPenicillinAllergyConflict ? (
            <div className="p-space-md rounded-xl bg-error-container text-on-error-container flex items-start gap-space-sm border border-error">
              <span className="material-symbols-outlined text-error text-[22px] mt-0.5">
                emergency
              </span>
              <div className="flex flex-col">
                <span className="font-label-md text-label-md font-bold text-error">
                  ⚠ ตรวจพบความเสี่ยงปฏิกิริยาการแพ้ข้ามกลุ่มรุนแรง (Cross-Allergy Alert!)
                </span>
                <p className="font-body-sm text-body-sm mt-0.5">
                  ผู้ป่วยมีประวัติแพ้ยา <strong>{patient.allergies.join(', ')}</strong> ซึ่งเป็นยากลุ่มเดียวกันกับ{' '}
                  <strong>{selectedMedication.name}</strong> อาจก่อให้เกิดอาการ Anaphylaxis
                  ช็อกและเสียชีวิตได้ กรุณาเปลี่ยนกลุ่มยาหรือปรึกษาแพทย์เจ้าของไข้
                </p>
              </div>
            </div>
          ) : (
            <div className="p-space-md rounded-xl bg-secondary-container/50 flex items-start gap-space-sm border border-secondary-container">
              <span className="material-symbols-outlined text-secondary text-[22px] mt-0.5">
                verified
              </span>
              <div className="flex flex-col">
                <span className="font-label-md text-label-md font-bold text-on-secondary-container">
                  ระบบตรวจสอบความปลอดภัยทางคลินิก (ออฟไลน์): ผ่านเกณฑ์ความปลอดภัย
                </span>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  ไม่พบการแพ้ข้ามกลุ่มกับประวัติแพ้เพนิซิลลินของผู้ป่วย
                  และไม่พบปฏิกิริยาไม่พึงประสงค์รุนแรงในประวัติการใช้ยา
                </p>
              </div>
            </div>
          )}

          {/* Receipt Print Toggle */}
          <div
            className="flex items-center justify-between p-space-sm bg-surface-container-low rounded-lg cursor-pointer hover:bg-surface-container transition-colors"
            onClick={() => setPrintLabel(!printLabel)}
          >
            <div className="flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-outline text-[18px]">
                print
              </span>
              <span className="font-label-md text-label-md font-semibold text-on-surface">
                พิมพ์ฉลากยาความร้อนอัตโนมัติ (Zebra-LP2844)
              </span>
            </div>
            <span
              className={`font-label-sm text-label-sm font-bold ${
                printLabel ? 'text-secondary' : 'text-outline'
              }`}
            >
              {printLabel ? 'สถานะ: พร้อมพิมพ์ (อัตโนมัติ)' : 'สถานะ: ปิดการพิมพ์'}
            </span>
          </div>
        </div>

        {/* Modal Actions Footer */}
        <div className="px-space-lg py-space-md bg-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-space-sm border-t border-outline-variant/30">
          <div className="flex items-center gap-space-xs text-on-surface-variant font-body-sm text-body-sm">
            <span className="material-symbols-outlined text-[15px]">lock</span>
            <span>
              รหัสบันทึกธุรกรรมออฟไลน์ TxID:{' '}
              <strong className="text-on-surface font-bold font-code-dense">
                #TX-202611-8841
              </strong>
            </span>
          </div>
          <div className="flex items-center gap-space-sm w-full sm:w-auto">
            <button
              className="flex-1 sm:flex-none px-space-lg py-2 rounded-lg bg-surface-container text-on-surface font-label-md text-label-md font-semibold hover:bg-surface-container-high transition-colors cursor-pointer"
              onClick={onClose}
              type="button"
            >
              ยกเลิก
            </button>
            <button
              className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-space-xs px-space-xl py-2 rounded-lg font-label-md text-label-md font-bold transition-colors shadow-sm cursor-pointer ${
                isPenicillinAllergyConflict
                  ? 'bg-error text-on-error hover:bg-on-error-container'
                  : 'bg-primary text-on-primary hover:bg-on-primary-fixed-variant'
              }`}
              onClick={handleConfirm}
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">task_alt</span>
              <span>ยืนยันและตัดยอดสต็อกยา</span>
              <span className="font-code-dense text-code-dense opacity-75">Enter</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
