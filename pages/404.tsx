import Link from "next/link";

const Custom404 = () => {
  return (
    <div className="absolute top-0 left-0 z-50 flex h-full w-full flex-col items-center justify-center space-y-8 bg-white">
      <div className="flex space-x-6 text-3xl font-medium text-gray-600">
        <div>404</div>
        <div>|</div>
        <div>Not Found</div>
      </div>
      <div className="font-medium">
        <Link href="/">Go to Home &rarr;</Link>
      </div>
    </div>
  );
};

export default Custom404;
