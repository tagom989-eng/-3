import React, { useState } from 'react';
import { DispenseLogItem } from '../data/mockData';

interface DispenseLogViewProps {
  logs: DispenseLogItem[];
  onPrintReceipt: (item: DispenseLogItem) => void;
}

export const DispenseLogView: React.FC<DispenseLogViewProps> = ({
  logs,
  onPrintReceipt,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLogs = logs.filter(
    (l) =>
      l.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.hn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.txId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.medicationName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-space-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="font-headline-md font-bold text-on-surface">
            บันทึกประวัติการจ่ายยา (Dispensing Audit Log)
          </h2>
          <p className="font-body-sm text-on-surface-variant">
            ประวัติการตัดยอดและจ่ายยาทั้งหมด เข้ารหัส SHA-256 ป้องกันการแก้ไข
          </p>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="ค้นหา TxID, ชื่อผู้ป่วย หรือ HN..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-9 px-3 bg-surface-container-lowest rounded-lg border border-outline-variant/40 text-xs text-on-surface"
          />
          <button
            onClick={() => alert('ส่งออกบันทึกการจ่ายยารายวันเรียบร้อยแล้ว (CSV)')}
            className="h-9 px-3 rounded-lg bg-surface-container text-on-surface font-label-md font-semibold hover:bg-surface-container-high transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">file_download</span>
            <span>ส่งออกรายงาน</span>
          </button>
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden border border-outline-variant/30">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-container-high text-on-surface font-bold uppercase">
              <tr>
                <th className="p-3">รหัสธุรกรรม (TxID) / เวลา</th>
                <th className="p-3">ผู้ป่วย / เลขประจำตัว (HN)</th>
                <th className="p-3">รายการยาและล็อต</th>
                <th className="p-3">จำนวนจ่าย</th>
                <th className="p-3">เภสัชกรผู้จ่าย</th>
                <th className="p-3">การตรวจสอบความปลอดภัย</th>
                <th className="p-3 text-right">ยอดรวม (฿)</th>
                <th className="p-3 text-right">ดำเนินการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-low font-body-sm">
              {filteredLogs.map((item) => (
                <tr key={item.id} className="hover:bg-surface-container-low transition-colors">
                  <td className="p-3">
                    <div className="font-code-dense font-bold text-on-surface">
                      {item.txId}
                    </div>
                    <div className="text-[11px] text-on-surface-variant">
                      {item.timestamp}
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="font-bold text-on-surface">{item.patientName}</div>
                    <div className="font-code-dense text-[11px] text-on-surface-variant">
                      HN: {item.hn}
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="font-bold text-on-surface">{item.medicationName}</div>
                    <div className="font-code-dense text-[11px] text-secondary">
                      {item.lot}
                    </div>
                  </td>
                  <td className="p-3">
                    <span className="font-bold text-on-surface font-headline-sm">
                      {item.qty}
                    </span>{' '}
                    <span className="text-on-surface-variant">{item.unit}</span>
                  </td>
                  <td className="p-3">
                    <div className="font-medium text-on-surface">{item.pharmacist}</div>
                  </td>
                  <td className="p-3">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-semibold text-[11px]">
                      <span className="material-symbols-outlined text-[12px]">verified</span>
                      {item.verifiedStatus}
                    </span>
                  </td>
                  <td className="p-3 text-right font-code-dense font-bold text-on-surface">
                    ฿{item.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => onPrintReceipt(item)}
                      className="px-2.5 py-1 rounded bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-semibold text-xs flex items-center gap-1 ml-auto cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[14px]">print</span>
                      <span>พิมพ์ฉลาก</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
