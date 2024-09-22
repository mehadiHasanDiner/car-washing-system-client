import { useNavigate } from "react-router-dom";
import { TService } from "../../../types/service.types";
import { FaLongArrowAltRight } from "react-icons/fa";
import { BiDollarCircle } from "react-icons/bi";
import { CiClock1 } from "react-icons/ci";

const ServiceCardDetails = ({ service }: { service: TService }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white p-4 border border-slate-200">
      <div className="w-full h-60 sm:h-40 overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={service?.image}
          alt={service?.name}
        />
      </div>
      <div className="space-y-2 pt-5">
        <div className="flex items-center gap-3 text-slate-700">
          <div className="flex items-center gap-1 text-sm font-medium">
            <CiClock1 className="mt-[1.5px] text-lg" />
            <span>{service?.duration} Min</span>
          </div>
          <div className="flex items-center gap-1 text-sm font-medium">
            <BiDollarCircle className="mt-[1.5px] text-lg" />
            <span>{service?.price}</span>
          </div>
        </div>
        <h4 className="text-lg font-semibold">{service?.name}</h4>
        <p className="text-slate-700">{service?.description}</p>
        <button
          onClick={() => navigate(`/services/${service?._id}`)}
          className="text-purple-800 flex items-center gap-2"
        >
          Book this service <FaLongArrowAltRight className="mt-1" />
        </button>
      </div>
    </div>
  );
};

export default ServiceCardDetails;
