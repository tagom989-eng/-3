export interface Medication {
  id: string;
  name: string;
  genericName: string;
  dosage: string;
  form: string;
  route: string;
  lot: string;
  ndc: string;
  expiryDate: string; // MM/YYYY or YYYY-MM
  category: string;
  categoryTag: string;
  isControlled?: boolean;
  controlledTag?: string;
  isColdChain?: boolean;
  tempCondition: string;
  stock: number;
  unit: string;
  minThreshold: number;
  status: 'normal' | 'low' | 'critical';
  unitPrice: number;
  priceDisplay: string;
  storageBay: string;
  shelf: string;
  packDetails: string;
}

export interface Patient {
  id: string;
  hn: string;
  name: string;
  thaiName: string;
  age: number;
  gender: string;
  status: string;
  allergies: string[];
  department: string;
  defaultSig?: string;
  defaultDrugId?: string;
  defaultQty?: number;
}

export interface DispenseLogItem {
  id: string;
  txId: string;
  timestamp: string;
  patientName: string;
  hn: string;
  medicationName: string;
  lot: string;
  qty: number;
  unit: string;
  instructions: string;
  pharmacist: string;
  verifiedStatus: string;
  amount: number;
}

export const INITIAL_MEDICATIONS: Medication[] = [
  {
    id: 'med-1',
    name: 'Atorvastatin Calcium',
    genericName: 'Atorvastatin Calcium',
    dosage: '20mg',
    form: 'Film-Coated Tablet',
    route: 'รับประทาน',
    lot: 'LOT-8831A',
    ndc: 'NDC 0071-0156-23',
    expiryDate: '11/2027',
    category: 'ระบบหัวใจและหลอดเลือด',
    categoryTag: 'โรคหัวใจและหลอดเลือด',
    tempCondition: 'อุณหภูมิห้อง 20-25°C',
    stock: 340,
    unit: 'เม็ด',
    minThreshold: 100,
    status: 'normal',
    unitPrice: 645,
    priceDisplay: '฿645.00 / กล่อง',
    storageBay: 'BAY-08',
    shelf: 'ชั้น 1',
    packDetails: 'เม็ด (34 แผง)',
  },
  {
    id: 'med-2',
    name: 'Amoxicillin Trihydrate',
    genericName: 'Amoxicillin Trihydrate',
    dosage: '500mg',
    form: 'แคปซูลรับประทาน',
    route: 'รับประทาน',
    lot: 'LOT-AMX-04',
    ndc: 'NDC 0781-2613-05',
    expiryDate: '04/2026',
    category: 'ยาปฏิชีวนะ',
    categoryTag: 'ยาฆ่าเชื้อแบคทีเรีย',
    tempCondition: 'อุณหภูมิห้อง 15-30°C',
    stock: 18,
    unit: 'ขวด',
    minThreshold: 50,
    status: 'critical',
    unitPrice: 430,
    priceDisplay: '฿430.00 / ขวด',
    storageBay: 'BAY-12',
    shelf: 'ชั้น 2',
    packDetails: 'ขวด (สำรอง: 50)',
  },
  {
    id: 'med-3',
    name: 'Oxycodone HCl',
    genericName: 'Oxycodone Hydrochloride',
    dosage: '10mg',
    form: 'Immediate-Release Tablets',
    route: 'รับประทาน',
    lot: 'LOT-C2-9901',
    ndc: 'NDC 0406-8515-01',
    expiryDate: '08/2027',
    category: 'ยาควบคุมพิเศษ / Sch II',
    categoryTag: 'ยาควบคุมพิเศษ',
    isControlled: true,
    controlledTag: 'ยาเสพติดประเภท 2',
    tempCondition: 'ตู้ล็อก 2 ชั้น',
    stock: 95,
    unit: 'หน่วย',
    minThreshold: 30,
    status: 'normal',
    unitPrice: 1190,
    priceDisplay: '฿1,190.00 / หน่วย',
    storageBay: 'SAFE-01',
    shelf: 'ตู้เซฟนิรภัย',
    packDetails: 'หน่วย (ตู้เซฟนิรภัย)',
  },
  {
    id: 'med-4',
    name: 'Metformin HCl',
    genericName: 'Metformin Hydrochloride',
    dosage: '850mg',
    form: 'Extended-Release Tab',
    route: 'รับประทาน',
    lot: 'LOT-MET-22',
    ndc: 'NDC 50090-2819-0',
    expiryDate: '01/2027',
    category: 'ยารักษาเบาหวาน',
    categoryTag: 'ยารักษาเบาหวาน',
    tempCondition: 'อุณหภูมิห้อง 20-25°C',
    stock: 42,
    unit: 'แผง',
    minThreshold: 100,
    status: 'low',
    unitPrice: 340,
    priceDisplay: '฿340.00 / กล่อง',
    storageBay: 'BAY-04',
    shelf: 'ชั้น 1',
    packDetails: 'แผง (ขั้นต่ำ: 100)',
  },
  {
    id: 'med-5',
    name: 'Insulin Glargine (Lantus)',
    genericName: 'Insulin Glargine',
    dosage: '100 units/mL',
    form: '10mL Multi-Dose Vial',
    route: 'ฉีดเข้าใต้ผิวหนัง (SC)',
    lot: 'LOT-GL-1102',
    ndc: 'NDC 0088-2220-33',
    expiryDate: '09/2026',
    category: 'ยาแช่เย็นควบคุมอุณหภูมิ',
    categoryTag: 'ต่อมไร้ท่อ / ยาชีววัตถุ',
    isColdChain: true,
    tempCondition: 'เซนเซอร์: 4.1°C เหมาะสม',
    stock: 45,
    unit: 'ขวดแก้ว',
    minThreshold: 20,
    status: 'normal',
    unitPrice: 4950,
    priceDisplay: '฿4,950.00 / ขวด',
    storageBay: 'COLD-CHAIN-01',
    shelf: 'ตู้เย็นแช่ยา 2°C - 8°C (ตู้เย็น A)',
    packDetails: 'ขวดแก้ว (ตู้เย็น A)',
  },
  {
    id: 'med-6',
    name: 'Lisinopril',
    genericName: 'Lisinopril Tablets',
    dosage: '10mg',
    form: 'ยาเม็ดไม่เคลือบ',
    route: 'รับประทาน',
    lot: 'LOT-LS-4029',
    ndc: 'NDC 68180-514-01',
    expiryDate: '05/2028',
    category: 'ระบบหัวใจและหลอดเลือด',
    categoryTag: 'กลุ่ม ACE Inhibitor',
    tempCondition: 'อุณหภูมิห้อง 20-25°C',
    stock: 820,
    unit: 'เม็ด',
    minThreshold: 150,
    status: 'normal',
    unitPrice: 218,
    priceDisplay: '฿218.00 / 100 เม็ด',
    storageBay: 'BAY-03',
    shelf: 'ชั้น 3 (ตู้เบิกจ่ายยาชั้น 1)',
    packDetails: 'เม็ด (กระปุกรวม #3)',
  },
  {
    id: 'med-7',
    name: 'Epinephrine Injection',
    genericName: 'Epinephrine Auto-Injector',
    dosage: '1mg/mL',
    form: 'เข็มฉีดยาอัตโนมัติ Single-Dose',
    route: 'ฉีดเข้ากล้ามเนื้อ (IM)',
    lot: 'LOT-EP-9942',
    ndc: 'NDC 49502-500-02',
    expiryDate: '18 พ.ย. 2026',
    category: 'ยาแช่เย็นควบคุมอุณหภูมิ',
    categoryTag: 'ยาฉุกเฉินช่วยชีวิต / Resuscitation',
    isColdChain: true,
    tempCondition: 'ตู้ควบคุมแสงและอุณหภูมิ 20-25°C',
    stock: 8,
    unit: 'ด้าม',
    minThreshold: 15,
    status: 'critical',
    unitPrice: 2850,
    priceDisplay: '฿2,850.00 / ด้าม',
    storageBay: 'COLD-CHAIN-01',
    shelf: 'กล่องฉุกเฉิน Resuscitation Cart',
    packDetails: 'ด้าม (สำรอง: 15)',
  },
  {
    id: 'med-8',
    name: 'Ciprofloxacin HCl',
    genericName: 'Ciprofloxacin Tablets',
    dosage: '500mg',
    form: 'Film-Coated Tablet',
    route: 'รับประทาน',
    lot: 'LOT-CF-1049',
    ndc: 'NDC 0093-0145-01',
    expiryDate: '10/2028',
    category: 'ยาปฏิชีวนะ',
    categoryTag: 'กลุ่ม Fluoroquinolone',
    tempCondition: 'อุณหภูมิห้อง 20-25°C',
    stock: 500,
    unit: 'เม็ด',
    minThreshold: 100,
    status: 'normal',
    unitPrice: 520,
    priceDisplay: '฿520.00 / กล่อง (50 เม็ด)',
    storageBay: 'BAY-11',
    shelf: 'ชั้น 2',
    packDetails: 'เม็ด (50 แผง)',
  },
  {
    id: 'med-9',
    name: 'Omeprazole',
    genericName: 'Omeprazole Delayed-Release',
    dosage: '20mg',
    form: 'Capsule',
    route: 'รับประทาน',
    lot: 'LOT-OM-2291',
    ndc: 'NDC 0186-0602-31',
    expiryDate: '12/2027',
    category: 'ระบบทางเดินอาหาร',
    categoryTag: 'กลุ่ม Proton Pump Inhibitor (PPI)',
    tempCondition: 'อุณหภูมิห้อง 15-30°C',
    stock: 1200,
    unit: 'แคปซูล',
    minThreshold: 200,
    status: 'normal',
    unitPrice: 180,
    priceDisplay: '฿180.00 / กล่อง (30 เม็ด)',
    storageBay: 'BAY-05',
    shelf: 'ชั้น 1',
    packDetails: 'แคปซูล (40 กล่อง)',
  },
  {
    id: 'med-10',
    name: 'Paracetamol (Acetaminophen)',
    genericName: 'Paracetamol Tablets',
    dosage: '500mg',
    form: 'ยาเม็ดกลมสีขาว',
    route: 'รับประทาน',
    lot: 'LOT-PA-8302',
    ndc: 'NDC 50580-496-01',
    expiryDate: '03/2029',
    category: 'ยาแก้ปวดและลดการอักเสบ',
    categoryTag: 'ยาสามัญประจำบ้าน / Analgesic',
    tempCondition: 'อุณหภูมิห้อง 25°C',
    stock: 3000,
    unit: 'เม็ด',
    minThreshold: 500,
    status: 'normal',
    unitPrice: 75,
    priceDisplay: '฿75.00 / กระปุก 100 เม็ด',
    storageBay: 'BAY-01',
    shelf: 'ชั้น 1',
    packDetails: 'เม็ด (30 กระปุก)',
  }
];

export const INITIAL_PATIENTS: Patient[] = [
  {
    id: 'pt-1',
    hn: '#992-04-129',
    name: 'มาร์คัส แวนซ์ (Marcus Vance)',
    thaiName: 'มาร์คัส แวนซ์',
    age: 54,
    gender: 'ชาย',
    status: 'ผู้ป่วยนอก (OPD) พร้อมจ่ายยา',
    allergies: ['เพนิซิลลิน (Penicillin)'],
    department: 'อายุรกรรมความดันและหัวใจ',
    defaultSig: 'รับประทานครั้งละ 1 เม็ด วันละ 1 ครั้ง ตอนเช้า ก่อนหรือหลังอาหาร',
    defaultDrugId: 'med-6',
    defaultQty: 30,
  },
  {
    id: 'pt-2',
    hn: '#992-05-883',
    name: 'สมศักดิ์ ประเสริฐสุข (Somsak Prasertsuk)',
    thaiName: 'สมศักดิ์ ประเสริฐสุข',
    age: 62,
    gender: 'ชาย',
    status: 'ผู้ป่วยคลินิกเบาหวาน (NCDs)',
    allergies: ['ซัลฟา (Sulfa Drugs)'],
    department: 'คลินิกโรคเบาหวานและเมตาบอลิก',
    defaultSig: 'รับประทานครั้งละ 1 เม็ด วันละ 2 ครั้ง หลังอาหาร เช้า-เย็น',
    defaultDrugId: 'med-4',
    defaultQty: 60,
  },
  {
    id: 'pt-3',
    hn: '#992-03-512',
    name: 'วิภาดา วงศ์สุวรรณ (Wiphada Wongsuwan)',
    thaiName: 'วิภาดา วงศ์สุวรรณ',
    age: 43,
    gender: 'หญิง',
    status: 'ผู้ป่วยนอก (OPD) ส่งต่อเคาน์เตอร์ 2',
    allergies: ['ไม่มีประวัติแพ้ยา (NKA)'],
    department: 'คลินิกหัวใจและหลอดเลือด',
    defaultSig: 'รับประทานครั้งละ 1 เม็ด วันละ 1 ครั้ง ก่อนนอน',
    defaultDrugId: 'med-1',
    defaultQty: 30,
  },
  {
    id: 'pt-4',
    hn: '#992-09-001',
    name: 'อนันต์ ชัยเจริญ (Anan Chaicharoen)',
    thaiName: 'อนันต์ ชัยเจริญ',
    age: 68,
    gender: 'ชาย',
    status: 'ผู้ป่วยผ่าตัดกระดูกและข้อ (Post-Op)',
    allergies: ['Aspirin (แอสไพริน)'],
    department: 'ศัลยกรรมออร์โธปิดิกส์',
    defaultSig: 'รับประทานครั้งละ 1 เม็ด ทุก 6-8 ชั่วโมง เมื่อมีอาการปวดรุนแรง',
    defaultDrugId: 'med-3',
    defaultQty: 10,
  },
  {
    id: 'pt-5',
    hn: '#992-07-234',
    name: 'ปรียาภรณ์ ธนวัฒน์ (Preeyaporn Thanawat)',
    thaiName: 'ปรียาภรณ์ ธนวัฒน์',
    age: 38,
    gender: 'หญิง',
    status: 'ผู้ป่วยห้องฉุกเฉิน (ER)',
    allergies: ['กุ้ง / อาหารทะเลรุนแรง (Anaphylaxis)'],
    department: 'เวชศาสตร์ฉุกเฉิน (Emergency)',
    defaultSig: 'ใช้ฉีดเข้ากล้ามเนื้อต้นขาด้านนอกทันทีเมื่อเกิดอาการแพ้รุนแรงเฉียบพลัน',
    defaultDrugId: 'med-7',
    defaultQty: 1,
  }
];

export const INITIAL_DISPENSE_LOGS: DispenseLogItem[] = [
  {
    id: 'log-1',
    txId: '#TX-202611-8840',
    timestamp: '08:42:15 น.',
    patientName: 'วิภาดา วงศ์สุวรรณ',
    hn: '#992-03-512',
    medicationName: 'Atorvastatin Calcium 20mg',
    lot: 'LOT-8831A',
    qty: 30,
    unit: 'เม็ด',
    instructions: 'รับประทานวันละ 1 เม็ด ก่อนนอน',
    pharmacist: 'ภญ. เอเวอลิน แวนซ์',
    verifiedStatus: 'ผ่านเกณฑ์ตรวจสอบ',
    amount: 645,
  },
  {
    id: 'log-2',
    txId: '#TX-202611-8839',
    timestamp: '08:35:40 น.',
    patientName: 'สมศักดิ์ ประเสริฐสุข',
    hn: '#992-05-883',
    medicationName: 'Insulin Glargine (Lantus) 100u/mL',
    lot: 'LOT-GL-1102',
    qty: 1,
    unit: 'ขวดแก้ว',
    instructions: 'ฉีดเข้าใต้ผิวหนัง 20 units วันละ 1 ครั้ง ก่อนนอน',
    pharmacist: 'ภญ. เอเวอลิน แวนซ์',
    verifiedStatus: 'บันทึกลูกโซ่ความเย็น 4.1°C',
    amount: 4950,
  },
  {
    id: 'log-3',
    txId: '#TX-202611-8838',
    timestamp: '08:21:09 น.',
    patientName: 'เกียรติศักดิ์ พรหมมินทร์',
    hn: '#992-01-449',
    medicationName: 'Omeprazole 20mg DR',
    lot: 'LOT-OM-2291',
    qty: 30,
    unit: 'แคปซูล',
    instructions: 'รับประทานครั้งละ 1 แคปซูล วันละ 1 ครั้ง ก่อนอาหารเช้า 30 นาที',
    pharmacist: 'ภญ. เอเวอลิน แวนซ์',
    verifiedStatus: 'ผ่านเกณฑ์ตรวจสอบ',
    amount: 180,
  }
];

export const CATEGORIES = [
  { name: 'ทั้งหมด', count: 1482 },
  { name: 'ยาปฏิชีวนะ', count: 312 },
  { name: 'ระบบหัวใจและหลอดเลือด', count: 248 },
  { name: 'ยาควบคุมพิเศษ / Sch II', count: 44 },
  { name: 'ยาแก้ปวดและลดการอักเสบ', count: 189 },
  { name: 'ยาแช่เย็นควบคุมอุณหภูมิ', count: 62 },
];
