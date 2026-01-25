import type { Ticket } from '../types';
import JayPoster from '../assets/jay-carnival.jpg';

export const MOCK_TICKETS: Ticket[] = [
  {
    id: "T-2024001",
    event: "周杰倫 [嘉年華]",
    date: "2025-05-25",
    venue: "臺北小巨蛋",
    seat: "搖滾A區 5排 12號",
    status: "active",
    img: JayPoster,
    isLinked: true,
    color: "from-slate-900 to-slate-800",
    // ✨ 動態風格設定
    themeColor: "#EAB308",
    trackName: "嘉年華 Carnival",
    artistName: "Jay Chou",
    energyValue: 95,
    bgGradient: "from-[#450A0A]",
    badgeChar: "J"
  }
];

export const MOCK_PAST_TICKETS: Ticket[] = [
  {
    id: "T-2025001",
    event: "周杰倫 [嘉年華]",
    date: "2025-01-24",
    venue: "臺北小巨蛋",
    status: "used",
    img: JayPoster,
    isLinked: true,
    color: "from-amber-900 to-black",
    themeColor: "#EAB308",
    trackName: "嘉年華 Carnival",
    artistName: "Jay Chou",
    energyValue: 95,
    bgGradient: "from-[#450A0A]",
    badgeChar: "J"
  },
  {
    id: "T-2023099",
    event: "BLACKPINK BORN PINK",
    date: "2023-03-18",
    venue: "高雄國家體育場",
    status: "used",
    img: "https://images.unsplash.com/photo-1621360841013-c7683c659ec6?q=80&w=1000&auto=format&fit=crop", // 範例圖
    isLinked: true,
    color: "from-slate-800 to-black",
    // ✨ BLACKPINK 專屬風格
    themeColor: "#F472B6", 
    trackName: "Pink Venom",
    artistName: "BLACKPINK",
    energyValue: 99,
    bgGradient: "from-[#4D072B]",
    badgeChar: "B"
  }
];