import {
  Label,
  Radio,
  Slider,
  Input,
} from "keep-react";
import { useGetAllServicesQuery } from "../redux/features/services/servicesApi";
import { ChangeEvent, useState } from "react";
import { TService } from "../types/service.types";
import ServiceCardDetails from "../components/ui/servicePage/ServiceCardDetails";

const priceRanges = [
  { label: "0-50", priceRange: [0, 50] },
  { label: "50-100", priceRange: [50, 100] },
  { label: "100-150", priceRange: [100, 150] },
  { label: "150-200", priceRange: [150, 200] },
  { label: "200-250", priceRange: [200, 250] },
];

const ServicePage = () => {
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState<number[] | []>([0, 250]);
  const { data: services, isLoading: isServiceLoading } =
    useGetAllServicesQuery([
      { name: "name", value: search },
      { name: "priceRange", value: priceRange },
      { name: "sort", value: sort },
    ]);
  console.log(isServiceLoading);

  const onPriceValueChange = (value: number[]) => {
    setTimeout(() => {
      setPriceRange(value);
    }, 300);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.id;
    setTimeout(() => {
      if (name === "search") setSearch(e.target.value);
    }, 300);

    if (name === "sort") setSort(value);

    if (name === "priceRange")
      setPriceRange(value.split(",").map((item) => Number(item)));
  };

  return (
    <>
      <section className="bg-slate-100 py-8">
        <div className="container flex flex-col items-center ">
          <h2 className="text-4xl font-bold">All Services</h2>
        </div>
      </section>
      <section className="bg-slate-50">
        <div className="container">
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <div>
              <div className=" border border-slate-200">
                <div className="bg-white p-5 pb-0">
                  <h4 className="text-lg font-semibold border-b border-b-slate-200 pb-2 mb-4">
                    Search Service
                  </h4>
                  <Input
                    name="search"
                    placeholder="Write service name..."
                    onChange={(e) => handleChange(e)}
                    className="focus-visible:!ring-0 focus-visible:!ring-offset-0 focus-visible:border-purple-800"
                  />
                </div>
                <div className="bg-white p-5 pb-0">
                  <h4 className="text-lg font-semibold border-b border-b-slate-200 pb-2 mb-4">
                    Price Range
                  </h4>
                  <Slider
                    onValueChange={onPriceValueChange}
                    min={0}
                    max={250}
                    defaultValue={[0, 250]}
                  />
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-slate-700">{priceRange[0]}</span>
                    <span className="text-slate-700">{priceRange[1]}</span>
                  </div>
                  <div className="flex flex-col gap-2 mt-2">
                    {priceRanges?.map((range) => (
                      <fieldset
                        key={range.label}
                        className="flex items-center gap-2"
                      >
                        <Radio
                          onChange={(e) => handleChange(e)}
                          id={String(range.priceRange)}
                          name="priceRange"
                        />
                        <Label htmlFor={String(range.priceRange)}>
                          {range.label}
                        </Label>
                      </fieldset>
                    ))}
                  </div>
                </div>
                <div className="bg-white p-5">
                  <h4 className="text-lg font-semibold border-b border-b-slate-200 pb-2 mb-4">
                    Sort service by
                  </h4>
                  <div className="flex flex-col gap-2">
                    <fieldset className="flex items-center gap-2">
                      <Radio
                        defaultChecked={sort === "price"}
                        onChange={(e) => handleChange(e)}
                        id="price"
                        name="sort"
                      />
                      <Label htmlFor="price">Price</Label>
                    </fieldset>
                    <fieldset className="flex items-center gap-2">
                      <Radio
                        defaultChecked={sort === "duration"}
                        onChange={(e) => handleChange(e)}
                        id="duration"
                        name="sort"
                      />
                      <Label htmlFor="duration">Duration</Label>
                    </fieldset>
                  </div>
                </div>
              </div>
            </div>
            {services?.data?.length < 1 && !isServiceLoading ? (
              <div className="col-span-3 text-center ">
                <h1 className="text-4xl">No data found</h1>
              </div>
            ) : (
              <div className="md:col-span-2 gap-5 lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {isServiceLoading
                  ? Array.from({ length: 6 })?.map((_, id) => (
                      <div
                        key={id}
                        className="bg-white space-y-2 w-full h-full animate-pulse p-5 border border-slate-200"
                      >
                        <div className="w-full h-60 sm:h-40 bg-gray-100"></div>
                        <div className="flex items-center gap-2 w-1/2">
                          <div className="w-full h-5 bg-gray-100"></div>
                          <div className="w-full h-5 bg-gray-100"></div>
                        </div>
                        <div className="w-full h-7 bg-gray-100"></div>
                        <div className="space-y-1">
                          <div className="w-full h-3 bg-gray-100"></div>
                          <div className="w-full h-3 bg-gray-100"></div>
                          <div className="w-full h-3 bg-gray-100"></div>
                        </div>
                      </div>
                    ))
                  : services?.data?.map((service: TService) => (
                      <div key={service._id}>
                        <ServiceCardDetails service={service} />
                      </div>
                    ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicePage;
