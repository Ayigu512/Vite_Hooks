import { createRoot } from 'react-dom/client'
// 导入全局样式
import '@/index.css'
// 导入根组件
import App from '@/App.tsx'

createRoot(document.getElementById('root')!).render(<App />)
