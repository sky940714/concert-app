import type { Ticket } from '../types';

export const MOCK_TICKETS: Ticket[] = [
  {
    id: "T-2024001",
    event: "周杰倫 [嘉年華]",
    date: "2025-05-25",
    time: "19:30",
    venue: "臺北小巨蛋",
    seat: "搖滾A區 5排 12號",
    status: "active",
    gate: "Gate A",
    color: "from-slate-900 to-slate-800",
    img: "🎸",
    isLinked: true 
  }
];

export const MOCK_PAST_TICKETS: Ticket[] = [
  {
    id: "T-2023099",
    event: "BLACKPINK BORN PINK",
    date: "2023-03-18",
    venue: "高雄國家體育場",
    status: "used",
    color: "from-slate-800 to-black",
    img: "🎤",
    isLinked: true
  }
];