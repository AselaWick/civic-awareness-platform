import { jsx as _jsx } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MapTestPage from '../pages/MapTestPage';
const MapTestRouter = () => {
    return (_jsx(Router, { children: _jsx(Routes, { children: _jsx(Route, { path: "/map-test", element: _jsx(MapTestPage, {}) }) }) }));
};
export default MapTestRouter;
