import {
  BaseQueryApi,
  BaseQueryFn,
  DefinitionType,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logout, setUser } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 401) {
    const refreshTokenReq = await fetch(
      "http://localhost:5000/api/auth/refresh-token",
      { method: "POST", credentials: "include" }
    );
    const refreshToken = await refreshTokenReq.json();

    if (refreshToken?.data?.accessToken) {
      const user = (api.getState() as RootState).auth.user;
      api.dispatch(setUser({ user, token: refreshToken?.data?.accessToken }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  tagTypes: ["services", "booking", "user", "review", "slot"],
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
});
