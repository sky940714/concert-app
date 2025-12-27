import { Sparkles, Ticket, MapPin } from 'lucide-react';
import type { Region } from '../types';

export const MOCK_REGIONS: Region[] = [
  {
    id: 'north',
    name: '精選推薦 (Hot)',
    x: 0,
    y: -90, // 落在票券上半部
    z: 60,
    venues: ['v1', 'v2'],
    color: 'text-[#FF8A65]', // 珊瑚橘
    border: 'border-[#FF8A65]',
    icon: <Sparkles size={20} />
  },
  {
    id: 'center',
    name: '熱門票券 (Tickets)',
    x: 0,
    y: 10, // 落在票券中心文字下方
    z: 60,
    venues: ['v3'],
    color: 'text-[#76C4B7]', // 深薄荷綠
    border: 'border-[#76C4B7]',
    icon: <Ticket size={20} />
  },
  {
    id: 'south',
    name: '附近的活動 (Nearby)',
    x: 0,
    y: 110, // 落在票券下半部
    z: 60,
    venues: ['v4', 'v5'],
    color: 'text-[#FF8A65]',
    border: 'border-[#FF8A65]',
    icon: <MapPin size={20} />
  },
];