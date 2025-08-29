export interface MenuLists {
  menuID: number;
  name: string;
  price: number;
  typeID: number;
  image: string;
  fileID: string;
  isAvailable: boolean;

  type?: MenuType;
}

export interface MenuType {
  typeID: number;
  name: string;

  menus?: MenuLists[]; // optional เพราะบางครั้งยังไม่มี relation
}

export interface TableNo {
  tableNo: number;
  locationDetail: string;

  orders?: Orders[]; // optional เพราะบางครั้งเราไม่ได้ include relation
}

export interface Admin {
  username: string;
  password: string;
  image: string;
  fileID: string;
}

// Table
export interface TableNo {
  tableNo: number;
  locationDetail: string;
  orders?: Orders[];
}

// ServiceState
export interface ServiceState {
  serviceID: number;
  serviceName: string;
  orders?: Orders[];
}

// Orders
export interface Orders {
  orderNo: number;
  tableNO: number;
  serviceID: number;
  dateTime: Date;
  table?: TableNo;
  service?: ServiceState;
  details?: OrderDetail[];
  payments?: Payment[];
}

// OrderDetail
export interface OrderDetail {
  detailNo: number;
  orderNo: number;
  menuID: number;
  trackOrderID: number;
  amount: number;
  price: number;
  dateTime: Date;
  updateAT: Date;
  order?: Orders;
  menu?: MenuLists;
  track?: OrderTrack;
  cancelLog?: CancelOrderLog[];
}

// CancelOrderLog
export interface CancelOrderLog {
  cancelLog: number;
  detailNo: number;
  orderNo: number;
  description: string;
  cancelBy: string;
  createAt: Date;
  detail?: OrderDetail;
}

// OrderTrack
export interface OrderTrack {
  trackOrderID: number;
  trackStateName: string;
  details?: OrderDetail[];
}

export interface Payment {
  paymentNo: number;
  orderNo: number;
  totalCost: number; // Decimal mapped to number
  dateTime: Date;
  status: PaymentStatus;
  staffID: number;
  methodID: number;
  order?: Orders;
  staff?: Staff;
  method?: PayMethod;
}

// PaymentStatus
export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED";

// PayMethod
export interface PayMethod {
  methodID: number;
  methodName: string;
  payments?: Payment[];
}

// Staff
export interface Staff {
  staffNo: number;
  staffID: string;
  name: string;
  surname: string;
  telNo: string;
  email: string;
  password: string;
  image: string;
  fileID: string;
  payments?: Payment[];
  loginLogs?: LoginLog[];
}

// LoginLog
export interface LoginLog {
  logNo: number;
  staffID: number;
  loginResult: string;
  dateTime: Date;
  staff?: Staff;
}