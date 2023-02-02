import Image from "next/image";

interface ICustomImageProps {
  imgSrc: any;
  alt: string;
  circle?: boolean;
}

const CustomImage = ({ imgSrc, alt, circle = false }: ICustomImageProps) => {
  return (
    <div
      className={`${
        circle ? "rounded-full" : "rounded"
      } flex h-[4.5rem] w-[4.5rem] shrink-0 items-center justify-center overflow-hidden bg-gray-300 object-cover`}
    >
      {imgSrc ? (
        <Image src={imgSrc} alt={alt} />
      ) : (
        <span className="text-xl font-bold text-white">?</span>
      )}
    </div>
  );
};

export default CustomImage;
