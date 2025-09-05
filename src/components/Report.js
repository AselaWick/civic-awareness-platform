import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const Report = ({ title, description }) => {
    return (_jsxs("div", { className: "border-b py-2", children: [_jsx("strong", { children: title }), ": ", description] }));
};
export default Report;
