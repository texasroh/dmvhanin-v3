import Button from "@/components/button";
import ImageUploader, { ImageItem } from "@/components/imageUploader";
import Input from "@/components/input";
import Textarea from "@/components/textarea";
import { fleamarketAPI } from "@/libs/client/api/fleamarket";
import { fleamarketQuery } from "@/libs/server/fleamarket";
import { FleaMarketCategory } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface ProductUploadVariable {
  title: string;
  description: string;
  images: ImageItem[];
  category: number;
}

interface UploadProps {
  categories: FleaMarketCategory[];
}

const Upload = ({ categories }: UploadProps) => {
  const [images, setImages] = useState(null);
  const { register, handleSubmit, setValue } = useForm<ProductUploadVariable>();
  const { mutate } = useMutation(fleamarketAPI.postProduct, {
    onSuccess: () => {},
  });

  const onSubmit = (data: ProductUploadVariable) => {
    // mutate(data);
    console.log(data);
  };
  return (
    <div>
      <h1 className="text-lg font-medium">새 물건 등록</h1>
      <div className="mt-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <ImageUploader
              onFileChange={(files) => setValue("images", files)}
            />
            <Input
              label="Title"
              {...register("title", { required: true })}
              required
            />
            <Textarea label="Description" {...register("description")} />
            <div className="flex justify-end">
              <div className="flex">
                <Button>Save</Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Upload;

export const getServerSideProps = async () => {
  const categories = await fleamarketQuery.getCategoryList();
  return { props: { categories } };
};
