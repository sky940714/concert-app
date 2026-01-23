export interface Ticket {
  id: string;
  event: string;
  date: string;
  time?: string;
  venue: string;
  seat?: string;
  status: 'active' | 'used';
  gate?: string;
  color: string;
  img: string;
  isLinked: boolean; // ✅ 新增：標記是否已通過實名驗證歸戶
}