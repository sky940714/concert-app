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
}