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
  isLinked: boolean;
  themeColor: string;      // 主題色 (如: #EAB308)
  trackName: string;       // 播放器顯示歌名
  artistName: string;      // 播放器顯示藝人
  energyValue: number;     // 跑分目標值 (0-100)
  bgGradient: string;      // 背景呼吸漸層 (Tailwind class 如 from-[#450A0A])
  badgeChar: string;       // 勳章字樣 (如 'J' 或 'B')
}