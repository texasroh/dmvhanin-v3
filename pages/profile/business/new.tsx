import BusinessForm from "@/components/business/businessForm";
import NoSsr from "@/components/noSsr";
import { Title } from "@/components/text";

const CreateBusiness = () => {
  return (
    <div>
      <Title>새 업소등록하기</Title>
      <NoSsr>
        <BusinessForm />
      </NoSsr>
    </div>
  );
};

export default CreateBusiness;
