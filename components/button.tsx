interface IButtonProps {
  title: string;
}
const Button = ({ title }: IButtonProps) => {
  return (
    <button className="w-full rounded bg-orange-500 py-2 font-medium text-white">
      {title}
    </button>
  );
};

export default Button;
