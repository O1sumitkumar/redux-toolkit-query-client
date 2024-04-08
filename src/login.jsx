import { useState } from "react";
import { useLoginMutation } from "./apiSlice.js";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const navigateTo = useNavigate();
  const [login, { data: res, isLoading: loginLoading }] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await login(loginData);
    console.log(response);
    if (response.data) {
      navigateTo("/tasks");
    } else {
      // Handle unsuccessful login
    }
  };

  console.log(res, loginLoading);

  return (
    <div className="flex h-screen flex-grow items-center justify-center bg-gray-900 p-4">
      <div className="task-app w-full max-w-md rounded-lg bg-gray-800 px-6 pb-2 pt-6 text-gray-200 shadow-lg">
        <div className="mb-6 flex items-center">
          {/* <svg
            className="h-8 w-8 stroke-current text-indigo-700"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg> */}
          <h4 className="py-6 text-lg font-semibold w-full text-center">
            Login Here...!!
          </h4>
        </div>
        <form
          onSubmit={(e) => handleSubmit(e)}
          //   className="my-2 flex h-8 w-full items-center rounded border-2 border-solid border-gray-700 px-2 text-sm font-medium"
        >
          {/* <svg
            className="h-5 w-5 fill-current text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg> */}
          <div className="flex flex-col">
            <div className="my-2 flex h-8 w-full items-center rounded border-2 border-solid border-gray-700 px-2 text-sm font-medium">
              <input
                className=" h-8 w-full flex-grow  text-center bg-transparent font-medium focus:outline-none"
                type="email"
                placeholder="Enter email or username"
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
                value={loginData.email}
                required
              />
            </div>
            <div className="my-2 flex h-8 w-full items-center rounded border-2 border-solid border-gray-700 px-2 text-sm font-medium">
              <input
                className=" h-8 w-full flex-grow text-center bg-transparent font-medium focus:outline-none"
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
                value={loginData.password}
                required
              />
            </div>
            <div className="my-6 flex h-8 w-full items-center rounded border-2 border-solid border-blue-700 px-2 text-sm font-medium text-center">
              <button className=" h-8 w-full flex-grow text-center bg-transparent font-medium focus:outline-none">
                Log In
              </button>
            </div>
          </div>
          {/* <button className="text-indigo-400">Add</button> */}
        </form>
        <div className="tasks-container overflow-auto">
          {/* {isLoading ? (
            <p className="text-center">Loading...</p>
          ) : (
            false && (
              <p className="text-center">
                {error.message || "Something went wrong"}
              </p>
            )
          )} */}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
