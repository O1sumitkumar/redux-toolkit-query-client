// the below code fragment can be found in:
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "todoApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
  }),
  tagTypes: ["Tasks"],
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: (userId) => ({
        url: "/tasks",
        body: userId,
        transformResponse: (tasks) => tasks.reverse(),
      }),
      providesTags: ["Tasks"],
    }),
    login: builder.mutation({
      query: (payload) => ({
        url: "/login",
        method: "POST",
        body: payload,
      }),
    }),

    addTask: builder.mutation({
      query: (payload) => ({
        url: "/tasks",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Tasks"],
      async onQueryStarted(task, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          api.util.updateQueryData("getTasks", undefined, (draft) => {
            draft.unshift({ id: crypto.randomUUID(), ...task });
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    updateTask: builder.mutation({
      query: ({ id, ...updatedTask }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body: updatedTask,
      }),
      invalidatesTags: ["Tasks"],
      async onQueryStarted(
        { id, ...updatedTask },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          api.util.updateQueryData("getTasks", undefined, (tasksList) => {
            const taskIndex = tasksList.findIndex((el) => el.id === id);
            tasksList[taskIndex] = { ...tasksList[taskIndex], ...updatedTask };
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tasks"],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          api.util.updateQueryData("getTasks", undefined, (tasksList) => {
            const taskIndex = tasksList.findIndex((el) => el.id === id);
            tasksList.splice(taskIndex, 1);
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetTasksQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useLoginMutation,
} = api;
