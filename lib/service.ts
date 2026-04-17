import axios from "axios";

export const nextServer = axios.create({
  baseURL: "http://localhost:3001/api",
  withCredentials: true,
});

// "use client";

// api.interceptors.response.use(
//   (response) => response, // якщо все добре, повертаємо відповідь

//   async (error) => {
//     const originalRequest = error.config; // оригінальний запит, який впав
//     console.log("ssss");
//     if (error.response?.status === 401) {
//       console.log("401");
//       try {
//         await api.post("/auth/refresh");

//         console.log("refreshed ");

//         return api(originalRequest);
//       } catch (error) {
//         window.location.href = "/sign-in";
//         console.log("err");
//         return Promise.reject(error);
//       }
//     }
//     return Promise.reject(error);
//   },
// );
