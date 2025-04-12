import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FormState } from "@/types/formTypes";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUsers: builder.query<FormState[], void>({
      query: () => "user",
      providesTags: ["User"],
    }),
    addUser: builder.mutation<void, FormState>({
      query: (formData) => ({
        url: "user",
        method: "POST",
        body: buildFormData(formData),
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation<void, FormState>({
      query: (formData) => ({
        url: `user/${formData._id}`,
        method: "PUT",
        body: buildFormData(formData),
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

const buildFormData = (form: FormState) => {
  const formData = new FormData();
  Object.entries(form).forEach(([key, value]) => {
    formData.append(key, JSON.stringify(value));
  });
  if (form.employmentInfo.resume) {
    formData.append("resume", form.employmentInfo.resume[0]);
  }
  return formData;
};

export const {
  useGetUsersQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
