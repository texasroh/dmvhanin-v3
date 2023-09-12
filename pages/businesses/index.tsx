import { BUSINESS_CATEGORY_PAGE } from "@/constants/urls";
import amenities from "@/images/business-category/amenities.png";
import beauty from "@/images/business-category/beauty.png";
import car from "@/images/business-category/car.png";
import claim from "@/images/business-category/claim.png";
import grocery from "@/images/business-category/grocery.png";
import hospital from "@/images/business-category/hospital.png";
import house from "@/images/business-category/house.png";
import more from "@/images/business-category/more.png";
import profession from "@/images/business-category/profession.png";
import restaurant from "@/images/business-category/restaurant.png";
import study from "@/images/business-category/study.png";
import travel from "@/images/business-category/travel.png";
import Image from "next/image";
import Link from "next/link";
import { sprintf } from "sprintf-js";

export const categories = [
  { key: "restaurant", label: "식당", imgSrc: restaurant },
  { key: "grocery", label: "식품점", imgSrc: grocery },
  { key: "medical", label: "병원 / 약국", imgSrc: hospital },
  { key: "study", label: "학교 / 학원 / 튜터", imgSrc: study },
  { key: "beauty", label: "미용 / 뷰티", imgSrc: beauty },
  { key: "lawyer-cpa", label: "변호사 / 회계사", imgSrc: profession },
  { key: "bank-insurance", label: "은행 / 보험", imgSrc: claim },
  { key: "real-estate", label: "부동산", imgSrc: house },
  { key: "car", label: "자동차", imgSrc: car },
  { key: "travel", label: "여행 / 숙박 / 택시", imgSrc: travel },
  { key: "amenity", label: "생활편의", imgSrc: amenities },
  { key: "etc", label: "기타", imgSrc: more },
];

const BusinessIndex = () => {
  return (
    <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4">
      {categories.map((category) => (
        <div key={category.key} className="p-4">
          <Link href={sprintf(BUSINESS_CATEGORY_PAGE, category.key)}>
            <Image
              src={category.imgSrc}
              alt={category.key}
              width={80}
              className="mx-auto"
            />
            <div className="mt-4 text-center text-sm font-medium text-gray-600">
              {category.label}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BusinessIndex;
