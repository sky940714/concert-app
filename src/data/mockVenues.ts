import type { VenuesData } from '../types';

export const MOCK_VENUES_DATA: VenuesData = {
  'v1': {
    id: 'v1',
    name: '臺北大巨蛋',
    city: 'Taipei',
    status: 'Hot',
    img: '🏟️',
    capacity: '40,000',
    events: [
      { id: 'e1', title: '五月天 [回到那一天]', date: '2025-05-25', price: '$2,800 起' },
      { id: 'e2', title: '周杰倫嘉年華', date: '2025-06-10', price: '$3,200 起' }
    ]
  },
  'v2': {
    id: 'v2',
    name: '台北小巨蛋',
    city: 'Taipei',
    status: 'Open',
    img: '🎤',
    capacity: '11,000',
    events: [
      { id: 'e3', title: 'A-Lin 2025 演唱會', date: '2025-07-15', price: '$1,800 起' }
    ]
  },
  'v3': {
    id: 'v3',
    name: '台中洲際棒球場',
    city: 'Taichung',
    status: 'Quiet',
    img: '⚾',
    capacity: '20,000',
    events: []
  },
  'v4': {
    id: 'v4',
    name: '高雄國家體育場',
    city: 'Kaohsiung',
    status: 'Hot',
    img: '🎆',
    capacity: '55,000',
    events: [
      { id: 'e4', title: 'Coldplay World Tour', date: '2025-11-12', price: '$3,800 起' },
      { id: 'e5', title: 'Ed Sheeran Tour', date: '2026-02-03', price: '$3,600 起' }
    ]
  },
  'v5': {
    id: 'v5',
    name: '高雄巨蛋',
    city: 'Kaohsiung',
    status: 'Open',
    img: '🎸',
    capacity: '15,000',
    events: []
  }
};