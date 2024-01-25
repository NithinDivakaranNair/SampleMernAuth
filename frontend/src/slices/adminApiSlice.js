import { apiSlice } from './apiSlice';
const ADMIN_URL = "/api/admin";

export const adminapiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginadmin: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/login`,
        method: 'POST',
        body: data,
      }),
    }),

    logoutadmin:builder.mutation({
      query:(data)=>({
        url:`${ADMIN_URL}/logoutAdmin`,
        method:"POST"
      })
    }),



    deleteUser: builder.mutation({
      query: (id, data) => ({
        url: `${ADMIN_URL}/user/${id}`,
        method: 'DELETE',
        body: data,
      }),
    }),

    editUser: builder.mutation({
      query: ( data) => ({
        url: `${ADMIN_URL}/user`,
        method: 'PUT',
        body: data,
      }),
    }),

    CreateUser: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/adduser`,
        method: 'POST',
        body: data,
      }),
    }),   


  }),
});

// Correctly import the generated hook with the 'use' prefix
export const { useDeleteUserMutation,useEditUserMutation,useLoginadminMutation,useLogoutadminMutation,useCreateUserMutation } = adminapiSlice;
