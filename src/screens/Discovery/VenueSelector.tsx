import { motion, AnimatePresence } from 'framer-motion';

// 定義場館資料
const VENUE_DATA = {
  north: ["台北小巨蛋", "台北大巨蛋", "台北流行音樂中心"],
  center: ["洲際棒球場", "台中歌劇院"],
  south: ["高雄國家體育場", "高雄巨蛋", "高雄流行音樂中心", "衛武營"]
};

interface VenueSelectorProps {
  region: string | null;
  isOpen: boolean;
  onClose: () => void;
  onSelect: (venueName: string) => void;
}

export const VenueSelector = ({ region, isOpen, onClose, onSelect }: VenueSelectorProps) => {
  if (!region) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
          {/* 背景遮罩：加入模糊感以符合整體風格 */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/20 backdrop-blur-md pointer-events-auto"
          />
          
          {/* 改良後的圓潤列表容器 */}
          <div className="relative flex flex-col gap-4 w-80 pointer-events-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-[#475569] text-xs font-black tracking-[0.4em] mb-1 pl-5 border-l-4 border-[#99E6D9]"
            >
              SELECT VENUE
            </motion.div>

            {(VENUE_DATA[region as keyof typeof VENUE_DATA] || []).map((name, i) => (
              <motion.div
                key={name}
                // 修改：由下方彈出並帶有縮放感，取代原本僵硬的位移與斜角
                initial={{ y: 20, opacity: 0, scale: 0.8 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -20, opacity: 0, scale: 0.9 }}
                transition={{ 
                  delay: i * 0.08, 
                  type: 'spring', 
                  stiffness: 300, 
                  damping: 15 // 降低阻尼增加彈性跳動感
                }}
                whileHover={{ scale: 1.05, x: 10 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onSelect(name)}
                // 修改：使用圓潤的 2.5rem 圓角與 Claymorphism 陰影
                className="bg-white/90 backdrop-blur-sm px-8 py-5 rounded-[2rem] shadow-[10px_10px_20px_rgba(153,230,217,0.2)] border-2 border-white cursor-pointer group flex justify-between items-center transition-colors hover:bg-[#99E6D9]"
              >
                <span className="text-xl font-black tracking-tight text-[#475569] group-hover:text-white transition-colors">
                  {name}
                </span>
                {/* 右側小裝飾也改為圓潤球體 */}
                <motion.div 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-3 h-3 rounded-full bg-[#99E6D9] group-hover:bg-white border-2 border-white shadow-sm" 
                />
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};