import { editorStateToString } from "@/libs/client/editor";
import { EditorState } from "draft-js";
import dynamic from "next/dynamic";
import { Controller, useForm } from "react-hook-form";
import Button from "../button";
import { HorizontalDivider } from "../divider";
import Input from "../input";
import { Subtitle } from "../text";

const DraftEditor = dynamic(() => import("@/components/draftEditor"), {
  ssr: false,
});

interface BusinessFormData {
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

const BusinessForm = () => {
  const { register, handleSubmit, control } = useForm<BusinessFormData>();

  const onSubmit = (data: BusinessFormData) => {
    console.log(data);
    console.log(editorStateToString(data.description));
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-4 space-y-4">
        <div className="flex flex-col gap-4 md:flex-row">
          <Input label="Title Kor" {...register("titleKor")} />
          <Input label="Title Eng" {...register("titleEng")} />
        </div>
        <Controller
          render={({ field: { onChange } }) => (
            <DraftEditor
              placeholder="Description"
              onChange={(state) => onChange(state)}
            />
          )}
          name="description"
          control={control}
        />
        <HorizontalDivider />
        <Subtitle>Address</Subtitle>
        <Input label="Street Address" {...register("address")} />
        <div className="flex flex-col gap-4 md:flex-row">
          <Input label="City" {...register("city")} />
          <Input label="Zipcode" {...register("zipcode")} />
          <Input label="State" {...register("state")} />
        </div>
        <HorizontalDivider />
        <Subtitle>Contact Info</Subtitle>
        <div className="flex flex-col gap-4 md:flex-row">
          <Input label="Phone" {...register("phone")} />
          <Input label="Website" {...register("website")} />
        </div>
        <Input label="Email" {...register("email")} />
        <HorizontalDivider />
        <div className="ml-auto w-full md:w-1/2 lg:w-1/3">
          <Button>Save</Button>
        </div>
      </div>
    </form>
  );
};

export default BusinessForm;
