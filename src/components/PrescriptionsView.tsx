import React from 'react';
import { Patient, Medication } from '../data/mockData';

interface PrescriptionsViewProps {
  patients: Patient[];
  medications: Medication[];
  onSelectPatientToDispense: (patient: Patient, med: Medication) => void;
}

export const PrescriptionsView: React.FC<PrescriptionsViewProps> = ({
  patients,
  medications,
  onSelectPatientToDispense,
}) => {
  return (
    <div className="flex flex-col gap-space-md">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-headline-md font-bold text-on-surface">
            คิวใบสั่งยาผู้ป่วยนอก (OPD Prescription Queue)
          </h2>
          <p className="font-body-sm text-on-surface-variant">
            เชื่อมต่อระบบ HIS ออฟไลน์ในห้องจ่ายยา • อัปเดตแบบเรียลไทม์
          </p>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container text-on-surface font-label-md font-semibold">
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
          <span>มีใบสั่งยารอจ่าย {patients.length} คิว</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
        {patients.map((patient) => {
          const defaultMed =
            medications.find((m) => m.id === patient.defaultDrugId) || medications[0];

          return (
            <div
              key={patient.id}
              className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-outline-variant/30 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-sm">
                      {patient.name.split(' ')[0][0]}
                    </div>
                    <div>
                      <div className="font-headline-sm font-bold text-on-surface">
                        {patient.name}
                      </div>
                      <div className="text-xs text-on-surface-variant font-code-dense">
                        HN: {patient.hn} • {patient.department}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-surface-container font-semibold text-on-surface">
                    {patient.age} ปี • {patient.gender}
                  </span>
                </div>

                {/* Allergy tag */}
                <div className="mt-3">
                  {patient.allergies.some((a) => !a.includes('ไม่มี')) ? (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-error-container text-on-error-container text-xs font-bold">
                      <span className="material-symbols-outlined text-[14px]">emergency</span>
                      ประวัติแพ้ยา: {patient.allergies.join(', ')}
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-secondary-container/60 text-on-secondary-container text-xs font-semibold">
                      <span className="material-symbols-outlined text-[14px]">check_circle</span>
                      ไม่มีประวัติแพ้ยา
                    </div>
                  )}
                </div>

                {/* Prescribed Drug Box */}
                <div className="mt-3 p-3 bg-surface-container-low rounded-lg border border-outline-variant/30">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-on-surface-variant uppercase">
                      ยาที่สั่งจ่ายตามใบสั่งแพทย์:
                    </span>
                    <span className="text-xs font-bold text-secondary">
                      จำนวน {patient.defaultQty || 30} {defaultMed?.unit || 'เม็ด'}
                    </span>
                  </div>
                  <div className="font-headline-sm font-bold text-on-surface mt-1">
                    {defaultMed?.name} ({defaultMed?.dosage})
                  </div>
                  <div className="text-xs text-on-surface-variant mt-1">
                    {patient.defaultSig}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-outline-variant/30 flex items-center justify-between">
                <span className="text-xs font-code-dense text-on-surface-variant">
                  สถานะ: <strong className="text-secondary">{patient.status}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => onSelectPatientToDispense(patient, defaultMed)}
                  className="px-4 py-1.5 bg-secondary text-on-secondary rounded-lg font-label-md font-bold hover:bg-on-secondary-fixed-variant transition-colors shadow-sm cursor-pointer flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[16px]">vaccines</span>
                  <span>เรียกจ่ายยา</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
