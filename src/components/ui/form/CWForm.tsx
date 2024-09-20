import { ReactNode } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

type TFormProps = {
  onSubmit: SubmitHandler<any>;
  children: ReactNode;
  defaultValues?: Record<string, any>;
};

const CWForm = ({ onSubmit, children, defaultValues }: TFormProps) => {
  const methods = useForm({ defaultValues });
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default CWForm;

// import { ReactNode } from "react";
// import {
//   FieldValues,
//   FormProvider,
//   Resolver,
//   SubmitHandler,
//   useForm,
// } from "react-hook-form";

// type TFormConfig = {
//   defaultValues?: Record<string, unknown>;
//   resolver?: Resolver<FieldValues>;
// };

// type TFormProps = {
//   onSubmit: SubmitHandler<any>;
//   children: ReactNode;
// } & TFormConfig;

// const CWForm = ({
//   onSubmit,
//   children,
//   defaultValues,
//   resolver,
// }: TFormProps) => {
//   const formConfig: TFormConfig = {};

//   if (defaultValues) {
//     formConfig["defaultValues"] = defaultValues;
//   }

//   const methods = useForm({ defaultValues });

//   if (resolver) {
//     formConfig["resolver"] = resolver;
//   }

//   return (
//     <FormProvider {...methods}>
//       <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
//     </FormProvider>
//   );
// };

// export default CWForm;
