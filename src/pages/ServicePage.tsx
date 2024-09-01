import { useGetAllServicesQuery } from "../redux/features/services/servicesApi";

const ServicePage = () => {
  const { data } = useGetAllServicesQuery(undefined);
  console.log(data);

  return (
    <div>
      <h1>Service Page</h1>
    </div>
  );
};

export default ServicePage;
