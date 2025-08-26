export interface Menu {
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
  
  menus?: Menu[]; // optional เพราะบางครั้งยังไม่มี relation
}