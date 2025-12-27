import type { ReactNode } from 'react';

export interface Region {
  id: string;
  name: string;
  x: number;
  y: number;
  z: number;
  venues: string[];
  color: string;
  border: string;
  icon: ReactNode;
}