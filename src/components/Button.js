import { jsx as _jsx } from "react/jsx-runtime";
const Button = ({ text, onClick }) => {
    return (_jsx("button", { onClick: onClick, className: "bg-blue-700 text-white px-4 py-2 rounded m-1 hover:bg-blue-800 transition", children: text }));
};
export default Button;
