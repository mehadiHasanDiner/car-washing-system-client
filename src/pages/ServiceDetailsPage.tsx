import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalClose,
  ModalContent,
  ModalHeader,
} from "keep-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../redux/hook";
import { TService } from "../types/service.types";
import { BiCaretRight } from "react-icons/bi";
import { TDateSlot } from "../types/slots.types";
import Select, { SingleValue } from "react-select";
import { dateTimeValidator } from "../utils/dateTimeValidator";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { setBookingData } from "../redux/features/bookings/bookings.slice";
import { TbCoinTakaFilled } from "react-icons/tb";
import { GiDuration } from "react-icons/gi";
import { FaCircleCheck, FaRegCircleCheck } from "react-icons/fa6";
import CWInput from "../components/ui/form/CWInput";
import CWForm from "../components/ui/form/CWForm";
import { useGetSingleServicesQuery } from "../redux/features/services/servicesApi";

type TSelectedDate = { label: string; value: string };

const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, "0");
const day = String(today.getDate()).padStart(2, "0");
const todayDate = `${day}/${month}/${year}`;
const formattedDate = {
  label: todayDate,
  value: todayDate,
};

const ServiceDetailsPage = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] =
    useState<SingleValue<TSelectedDate>>(formattedDate);

  const [selectedSlot, setSelectedSlot] = useState<{
    slotId: string;
    slot: string;
  } | null>(null);
  const { id: serviceId } = useParams();
  
  const { data: service, isLoading: isServiceLoading } =
    useGetSingleServicesQuery(serviceId as string);

  const dispatch = useAppDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const serviceData: TService = service?.data?.service ?? {};
  const slotsData: TDateSlot[] = service?.data?.slots ?? [];
  const dateOptions = slotsData?.map((slot) => ({
    value: slot.date,
    label: slot.date,
    isDisabled: !dateTimeValidator(slot.date),
  }));
  const selectedSlotData = slotsData?.find(
    (slot) => selectedDate?.value === slot.date
  );

  const onChange = (value: SingleValue<TSelectedDate>) => {
    setSelectedDate(value);
  };

  const handleSelectSlot = (id: string, slot: string) => {
    setSelectedSlot({ slotId: id, slot });
  };

  const handleBooking: SubmitHandler<FieldValues> = async (data) => {
    const bookingData = {
      vehicleType: data.vehicleType,
      vehicleBrand: data.vehicleBrand,
      vehicleModel: data.vehicleModel,
      manufacturingYear: data.manufacturingYear,
      registrationPlate: data.registrationPlate,
      serviceId: serviceId as string,
      slotId: selectedSlot?.slotId,
    };

    dispatch(
      setBookingData({
        bookingData,
        serviceData: { ...serviceData, slot: selectedSlot?.slot },
      })
    );
    navigate("/bookings");
    setModalOpen(false);
  };

  return (
    <>
      <section className="bg-slate-100">
        <div className="container flex flex-col items-center">
          <h2 className="text-4xl font-bold">Service Details</h2>
          <Breadcrumb>
            <BreadcrumbItem onClick={() => navigate("/")}>Home</BreadcrumbItem>
            <BreadcrumbItem onClick={() => navigate("/services")}>
              <BiCaretRight size={18} color="#455468" />
              Services
            </BreadcrumbItem>
            <BreadcrumbItem className="cursor-auto hover:text-black">
              <BiCaretRight size={18} color="#455468" />
              {serviceData?.name}
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
      </section>
      {isServiceLoading ? (
        <div className="container grid gap-5 md:gap-10 grid-cols-1 md:grid-cols-2 animate-pulse">
          <div className="h-60 w-full bg-slate-100"></div>
          <div className="space-y-3">
            <div className="h-10 w-full bg-slate-100"></div>
            <div className="h-10 w-full bg-slate-100"></div>
            <div className="h-10 w-full bg-slate-100"></div>
            <div className="h-10 w-full bg-slate-100"></div>
          </div>
        </div>
      ) : (
        <section>
          <div className="container grid gap-7 grid-cols-1 md:grid-cols-2">
            <div>
              <div className="bg-slate-50 border border-slate-200 p-5 w-full h-60 sm:h-96 overflow-hidden">
                <img
                  className="h-full w-full object-cover"
                  src={serviceData?.image}
                  alt={serviceData?.name}
                />
              </div>
            </div>
            <div className="space-y-3">
              <div className="border-b border-slate-200 pb-3 space-y-1">
                <h3 className="text-3xl font-semibold">{serviceData?.name}</h3>
                <div className="flex items-center gap-1 text-sm font-medium">
                  <GiDuration className="mt-[1.5px] text-lg" />
                  <span>{serviceData?.duration} Min</span>
                </div>
              </div>
              <div className="pb-3 border-b border-b-slate-200 space-y-2">
                <div className="flex items-center gap-1 text-sm font-medium">
                  <TbCoinTakaFilled className="mt-[1.5px] text-lg text-slate-500" />
                  <h4 className="text-2xl text-cws-yellow font-bold">
                    {serviceData?.price}
                  </h4>
                </div>
                <p className="text-slate-600">{serviceData.description}</p>
              </div>
              <div>
                <h5 className="text-lg font-semibold text-slate-800">
                  Available Slots
                </h5>
                <div>
                  <div className="">
                    <label className="font-medium mt-4 mb-2 text-slate-600 block">
                      Select Date
                    </label>
                    <Select
                      defaultValue={selectedDate}
                      options={dateOptions}
                      onChange={onChange}
                    />
                  </div>
                  <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {!isServiceLoading && selectedSlotData?.slots?.length ? (
                      selectedSlotData?.slots?.map((item) => (
                        <button
                          key={item._id}
                          disabled={
                            !dateTimeValidator(selectedDate?.value as string) ||
                            item.isBooked === "booked" ||
                            item.isBooked === "canceled"
                          }
                          onClick={() =>
                            handleSelectSlot(
                              item._id,
                              `${item.startTime} - ${item.endTime}`
                            )
                          }
                          className={[
                            "flex items-center justify-center gap-2 px-4 py-1 rounded border transition-all border-blue-100 text-blue-800 bg-blue-50 cursor-pointer",
                            "hover:border-blue-300/70",
                            "active:bg-slate-200/60",
                            "disabled:bg-gray-100 disabled:text-gray-600 disabled:opacity-70 disabled:cursor-default disabled:border-gray-200 disabled:hover:border-gray-200",
                            `${
                              item._id === selectedSlot?.slotId
                                ? "!bg-blue-700 !text-white"
                                : ""
                            }`,
                          ].join(" ")}
                        >
                          {item._id === selectedSlot?.slotId ? (
                            <FaCircleCheck />
                          ) : (
                            <FaRegCircleCheck />
                          )}
                          <span>
                            {item.startTime} - {item.endTime}
                          </span>
                        </button>
                      ))
                    ) : (
                      <div className="flex items-center flex-col p-5 sm:col-span-3 md:col-span-2 lg:col-span-3">
                        <div className="w-40 h-28 overflow-hidden">
                          <img
                            className="w-full h-full object-contain"
                            src="https://img.freepik.com/free-vector/hand-drawn-no-data-concept_52683-127823.jpg"
                            alt="Empty Image"
                          />
                        </div>
                        <h3 className="text-xl text-slate-500 font-bold">
                          No available slots for the selected date.
                        </h3>
                      </div>
                    )}
                  </div>
                  {slotsData?.length < 1 ? (
                    <p className="text-slate-600 mt-3">No Slot Available</p>
                  ) : (
                    <p className="text-slate-600 mt-3">
                      <span className="font-medium">Note : </span> Please select
                      a slot for booking service.
                    </p>
                  )}

                  <div className="mt-5">
                    <Button
                      disabled={!selectedSlot}
                      onClick={() => setModalOpen(true)}
                      size="md"
                      className="bg-cws-yellow hover:bg-cws-yellow/80 active:bg-cws-yellow disabled:bg-cws-yellow/80"
                    >
                      Book this service
                    </Button>
                    <Modal isOpen={modalOpen} onOpenChange={setModalOpen}>
                      <ModalContent>
                        <ModalClose className="absolute right-4 top-4" />
                        <ModalHeader className="space-y-3">
                          <div>
                            <h4 className="text-slate-700 font-medium text-lg">
                              Vehicle Information
                            </h4>
                          </div>
                          <CWForm onSubmit={handleBooking}>
                            <div className="space-y-3 mb-5">
                              <CWInput
                                type="vehicleType"
                                name="text"
                                label="Vehicle Type"
                                placeholder="Enter your Vehicle Type"
                                rules={{
                                  required: "Vehicle Type is required",
                                }}
                              />
                              <CWInput
                                type="vehicleBrand"
                                name="text"
                                label="Vehicle Brand"
                                placeholder="Enter your Vehicle Brand"
                                rules={{
                                  required: "Vehicle Brand is required",
                                }}
                              />
                              <CWInput
                                type="vehicleModel"
                                name="text"
                                label="Vehicle Model"
                                placeholder="Enter your Vehicle Model"
                                rules={{
                                  required: "Vehicle Model is required",
                                }}
                              />
                              <CWInput
                                type="manufacturingYear"
                                name="text"
                                label="Vehicle Manufacturing"
                                placeholder="Enter your Vehicle Manufacturing"
                                rules={{
                                  required: "Vehicle Manufacturing is required",
                                }}
                              />
                              <CWInput
                                type="registrationPlate"
                                name="text"
                                label="Vehicle Registration Plate Number"
                                placeholder="Enter your Vehicle Registration Plate Number"
                                rules={{
                                  required:
                                    "Vehicle Registration Plate Number is required",
                                }}
                              />
                            </div>
                            <Button
                              type="submit"
                              className={`bg-cws-yellow hover:bg-cws-yellow/90 w-full`}
                            >
                              Continue Booking
                            </Button>
                          </CWForm>
                        </ModalHeader>
                      </ModalContent>
                    </Modal>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ServiceDetailsPage;
