import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'

interface CanvasSizeControllerProps {
  isShrunken?: boolean;
}

/**
 * 強制更新 Canvas 尺寸和相機
 * 解決 CSS transform 導致的渲染錯誤
 */
export const CanvasSizeController = ({ isShrunken = false }: CanvasSizeControllerProps) => {
  const { gl, camera, size } = useThree();

  useEffect(() => {
    // 強制重新計算渲染器尺寸
    const updateSize = () => {
      const canvas = gl.domElement;
      const parent = canvas.parentElement;
      
      if (!parent) return;

      // 獲取實際的顯示尺寸
      const rect = parent.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // 更新渲染器尺寸
      gl.setSize(width, height, false);

      // 更新相機縱橫比
      if ('aspect' in camera) {
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }
    };

    // 立即執行一次
    updateSize();

    // 監聽視窗尺寸變化
    window.addEventListener('resize', updateSize);
    
    // 使用 ResizeObserver 監聽容器尺寸變化
    const canvas = gl.domElement;
    const parent = canvas.parentElement;
    
    let resizeObserver: ResizeObserver | null = null;
    
    if (parent) {
      resizeObserver = new ResizeObserver(() => {
        updateSize();
      });
      resizeObserver.observe(parent);
    }

    // 清理
    return () => {
      window.removeEventListener('resize', updateSize);
      if (resizeObserver && parent) {
        resizeObserver.unobserve(parent);
        resizeObserver.disconnect();
      }
    };
  }, [gl, camera]);

  // 當 isShrunken 改變時,也強制更新
  useEffect(() => {
    const canvas = gl.domElement;
    const parent = canvas.parentElement;
    
    if (!parent) return;

    // 延遲更新,等待 CSS transition 完成
    const timer = setTimeout(() => {
      const rect = parent.getBoundingClientRect();
      gl.setSize(rect.width, rect.height, false);
      
      if ('aspect' in camera) {
        camera.aspect = rect.width / rect.height;
        camera.updateProjectionMatrix();
      }
    }, 50); // 50ms 延遲等待 CSS 開始動畫

    return () => clearTimeout(timer);
  }, [isShrunken, gl, camera]);

  return null; // 這個組件不渲染任何東西
};