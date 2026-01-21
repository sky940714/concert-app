export interface Event {
  id: string;      // 新增這一行
  title: string;
  date: string;
  price: string;
  ticketUrl?: string; // 順便確保這行也在，用於導引至外部網站
}

export interface Venue {
  id: string;
  name: string;
  city: string;
  status: string;
  img: string;
  capacity: string;
  coordinate: [number, number, number]; 
  events: Event[];
}

export type VenuesData = Record<string, Venue>;