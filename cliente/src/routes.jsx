import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Index.jsx';
import Detail from './pages/Detail/index.jsx';

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="produtos/detail/:id" element={<Detail />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
