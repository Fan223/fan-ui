export interface Menu {
  id: string;
  parentId: string;
  position: string;
  name: string;
  path: string;
  authority: string;
  component: string;
  type: number;
  icon: string;
  orderNum: number;
  flag: string;
  createTime: string;
  updateTime: string;
  children?: Menu[];
}
