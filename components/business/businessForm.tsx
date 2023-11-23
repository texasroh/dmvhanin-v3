import { BUSINESS_OWNER_PAGE } from "@/constants/urls";
import { businessAPI } from "@/libs/client/api/business";
import { stringToEditorState } from "@/libs/client/editor";
import { GetDetailBusiness } from "@/libs/server/business";
import { categories } from "@/pages/businesses";
import { useMutation, useQuery } from "@tanstack/react-query";
import { EditorState } from "draft-js";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import Button from "../button";
import { HorizontalDivider } from "../divider";
import DraftEditor from "../draftEditor";
import Input from "../input";
import NoSsr from "../noSsr";
import { Subtitle } from "../text";

export interface BusinessFormData {
  category: string;
  subcategory: number;
  titleKor: string;
  titleEng: string;
  description: EditorState;
  address: string;
  city: string;
  zipcode: string;
  state: string;
  phone: string;
  website: string;
  email: string;
}

interface BusinessFormProps {
  business?: GetDetailBusiness;
}

const BusinessForm = ({ business }: BusinessFormProps) => {
  const defaultValues = {
    category: business?.businessSubcategory.businessCategory.name || "",
    // subcategory: number;
    titleKor: business?.titleKor || "",
    titleEng: business?.titleEng || "",
    description: business && stringToEditorState(business?.description || ""),
    // address: string;
    // city: string;
    // zipcode: string;
    // state: string;
    // phone: string;
    // website: string;
    // email: string;
  };
  console.log(defaultValues);
  const { register, handleSubmit, control } = useForm<BusinessFormData>({
    defaultValues,
  });
  const router = useRouter();
  const { mutate, isLoading: isMutating } = useMutation(
    businessAPI.postBusiness,
    {
      onSuccess: () => {
        router.push(BUSINESS_OWNER_PAGE);
      },
    }
  );

  const { data: subCategoryData } = useQuery(
    ["subCategories"],
    businessAPI.getSubcategories,
    {
      refetchInterval: false,
      refetchOnMount: false,
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false,
    }
  );

  const [subCategories, setSubCategories] = useState(subCategoryData);

  const filterSubCategories = (selectedKey: string) => {
    setSubCategories(
      subCategoryData?.filter(
        (subcategory) => subcategory.businessCategory.key === selectedKey
      )
    );
  };

  const onSubmit = (data: BusinessFormData) => {
    console.log(data);
    // mutate({ ...data, description: editorStateToString(data.description) });
  };

  return (
    <NoSsr>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-4 space-y-4">
          <div className="flex flex-col gap-4 md:flex-row">
            <Input
              label="Title Kor"
              required
              value={defaultValues.titleKor}
              {...register("titleKor", { required: true })}
            />
            <Input
              label="Title Eng"
              required
              value={defaultValues.titleEng}
              {...register("titleEng", { required: true })}
            />
          </div>
          <Controller
            render={({ field: { onChange } }) => (
              <DraftEditor
                placeholder="Description"
                onChange={(state) => onChange(state)}
                // value={}
              />
            )}
            name="description"
            control={control}
          />
          <HorizontalDivider />
          <Subtitle>분류</Subtitle>
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="w-full">
              <Select
                options={categories.map((category) => ({
                  value: category.key,
                  label: category.label,
                }))}
                isSearchable={false}
                placeholder="대분류 선택"
                onChange={(selectedItem) =>
                  filterSubCategories(selectedItem?.value ?? "")
                }
              />
            </div>
            <div className="w-full">
              <Controller
                render={({ field: { onChange } }) => (
                  <Select
                    options={subCategories?.map((subCategory) => ({
                      value: subCategory.id,
                      label: subCategory.name,
                    }))}
                    placeholder="소분류 선택"
                    required
                    onChange={(selected_item) => onChange(selected_item?.value)}
                  />
                )}
                name="subcategory"
                control={control}
                rules={{ required: true }}
              />
            </div>
          </div>
          <HorizontalDivider />
          <Subtitle>Address</Subtitle>
          <Input label="Street Address" {...register("address")} />
          <div className="flex flex-col gap-4 md:flex-row">
            <Input label="City" {...register("city")} />
            <Input label="Zipcode" {...register("zipcode")} />
            {/* <Input label="State" {...register("state")} /> */}
            <div className="w-full">
              <Controller
                render={({ field: { onChange } }) => (
                  <Select
                    options={["VA", "MD", "DC"].map((state) => ({
                      label: state,
                      value: state,
                    }))}
                    placeholder="State"
                    onChange={(selected_item) => onChange(selected_item?.value)}
                  />
                )}
                name="state"
                control={control}
              />
            </div>
          </div>
          <HorizontalDivider />
          <Subtitle>Contact Info</Subtitle>
          <div className="flex flex-col gap-4 md:flex-row">
            <Input label="Phone" {...register("phone")} />
            <Input label="Website" {...register("website")} />
          </div>
          <Input label="Email" {...register("email")} type="email" />
          <HorizontalDivider />
          <div className="ml-auto w-full md:w-1/2 lg:w-1/3">
            <Button isLoading={isMutating}>Save</Button>
          </div>
        </div>
      </form>
    </NoSsr>
  );
};

export default BusinessForm;
