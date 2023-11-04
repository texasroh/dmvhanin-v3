import { extractTextFromString } from "@/libs/client/editor";
import { IExtendedBusiness } from "@/pages/businesses/category/[category]";
import { BsChatText, BsDot, BsStar } from "react-icons/bs";
import CustomImage from "../customImage";

interface BusinessListItemProps {
  business: IExtendedBusiness;
}

const BusinessListItem = ({ business }: BusinessListItemProps) => {
  let description;
  try {
    description = extractTextFromString(business.description || "");
  } catch {
    description = business.description;
  }
  return (
    <div className="flex h-full gap-4 border-b py-3">
      <div className="shrink-0">
        <CustomImage
          imgSrc={business.logoImageId}
          alt={business.titleKor}
          circle
        />
      </div>
      <div className="grow space-y-1">
        <div className="flex items-end gap-2">
          <div className="line-clamp-1 break-all">{business.titleKor}</div>
          <span className="shrink-0 text-sm font-medium text-gray-400">
            {business.city}
          </span>
        </div>
        <div className="line-clamp-2 overflow-hidden text-sm leading-4">
          {description}
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <BsChatText />
          <div className="ml-1">{business.totalReview}</div>
          <div className="mx-2">
            <BsDot />
          </div>
          <BsStar />
          <div className="ml-1">
            <>{business.avgRating}</>
          </div>
          <div className="mx-2">
            <BsDot />
          </div>
          <div>{business.businessSubcategory.name}</div>
        </div>
      </div>
    </div>
  );
};

export default BusinessListItem;
