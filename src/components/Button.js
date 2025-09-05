import { jsx as _jsx } from "react/jsx-runtime";
const Button = ({ text, onClick, type = 'button' }) => {
    return (_jsx("button", { type: type, onClick: onClick, className: "bg-blue-700 text-white px-4 py-2 rounded m-1 hover:bg-blue-800 transition", children: text }));
};
export default Button;
