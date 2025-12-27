import type { Ticket } from '../types';

export const MOCK_TICKETS: Ticket[] = [
  {
    id: "T-2024001",
    event: "五月天 [回到那一天]",
    date: "2025-05-25",
    time: "19:30",
    venue: "臺北大巨蛋",
    seat: "搖滾A區 5排 12號",
    status: "active",
    gate: "Gate A",
    color: "from-cyan-600 to-blue-600",
    img: "🎸"
  }
];

export const MOCK_PAST_TICKETS: Ticket[] = [
  {
    id: "T-2023099",
    event: "BLACKPINK BORN PINK",
    date: "2023-03-18",
    venue: "高雄國家體育場",
    status: "used",
    color: "from-pink-600 to-rose-600",
    img: "🎤"
  },
  {
    id: "T-2022055",
    event: "張惠妹 ASMR 巡迴",
    date: "2022-04-10",
    venue: "台北小巨蛋",
    status: "used",
    color: "from-purple-600 to-indigo-600",
    img: "🔥"
  }
];