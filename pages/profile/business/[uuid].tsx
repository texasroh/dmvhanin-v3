import Badge from "@/components/badge";
import BusinessForm from "@/components/business/businessForm";
import { Subtitle, Title } from "@/components/text";
import { getDateTimeString } from "@/libs/client/datetime";
import { stringToEditorState } from "@/libs/client/editor";
import { GetDetailBusiness, businessQuery } from "@/libs/server/business";
import { withSsrSession } from "@/libs/server/withSession";
import { Editor } from "draft-js";
import { GetServerSidePropsContext } from "next";

interface BusinessDetailProps {
  business: GetDetailBusiness;
}

const BusinessDetail = ({ business }: BusinessDetailProps) => {
  const description = stringToEditorState(business.description!);
  const hasText = description.getCurrentContent().hasText();
  return (
    <div className="space-y-3">
      <BusinessForm business={business} />
      <div className="text-sm italic text-gray-500">
        <div>Created At: {getDateTimeString(business.createdAt)}</div>
        <div>Updated At: {getDateTimeString(business.updatedAt)}</div>
      </div>
      <div>
        <Title>{business.titleKor}</Title>
        <Subtitle>{business.titleEng}</Subtitle>
      </div>
      <div className="space-x-2">
        <Badge className="bg-orange-100">
          {business.businessSubcategory.businessCategory.name}
        </Badge>
        <Badge className="bg-blue-100">
          {business.businessSubcategory.name}
        </Badge>
      </div>
      <div>
        {hasText ? (
          <Editor
            editorState={description}
            readOnly
            editorKey="editor"
            onChange={console.log}
          />
        ) : (
          "No description"
        )}
      </div>
    </div>
  );
};

export default BusinessDetail;

export const getServerSideProps = withSsrSession(
  async ({ req, query: { uuid } }: GetServerSidePropsContext) => {
    const uid = req?.session.user?.uid;
    const business = await businessQuery.getBusiness(uuid + "");

    return { props: { business: JSON.parse(JSON.stringify(business)) } };
  }
);
