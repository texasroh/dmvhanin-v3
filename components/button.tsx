import LoadingSpinner from "./loadingSpinner";

interface IButtonProps {
  title: string;
  isLoading?: boolean;
}
const Button = ({ title, isLoading = false }: IButtonProps) => {
  return (
    <button className="w-full rounded bg-orange-500 py-2 font-medium text-white">
      {isLoading ? <LoadingSpinner /> : title}
    </button>
  );
};

export default Button;
