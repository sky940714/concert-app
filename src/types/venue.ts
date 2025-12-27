export interface VenueEvent {
  id: string;
  title: string;
  date: string;
  price: string;
}

export interface Venue {
  id: string;
  name: string;
  city: string;
  status: 'Hot' | 'Open' | 'Quiet';
  img: string;
  capacity: string;
  events: VenueEvent[];
}

export type VenuesData = Record<string, Venue>;