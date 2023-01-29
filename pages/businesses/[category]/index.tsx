import { useRouter } from "next/router";

const CategoryIndex = () => {
  const router = useRouter();
  const { category } = router.query;
  return <div>{category}</div>;
};

export default CategoryIndex;
