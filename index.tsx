import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 引入你的两个主要组件
import Homepage from './Homepage';
import App from './App'; // 这就是你原来的 Scale 项目，完全不用动它内部代码

import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* 默认路径显示你的“新门面” */}
        <Route path="/" element={<Homepage />} />
        
        {/* /scale 路径显示你原来的 App */}
        {/* 注意：由于 App 内部没有路由，这里直接挂载即可 */}
        <Route path="/scale/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);