import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TablePage from '@/pages/TablePage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<TablePage />} />
      </Routes>
    </BrowserRouter>
  );
}
