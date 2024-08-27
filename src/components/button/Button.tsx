
interface IButton {
    children: string
} 
const Button = ({children}:IButton) => {
    return   <button className="py-1 px-3 bg-purple-600 rounded-xl my-10 text-white font-bold">{children}</button>
};

export default Button;