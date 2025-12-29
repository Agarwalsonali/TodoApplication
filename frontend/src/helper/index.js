import axios from "axios";

export async function useFetchTodos() {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/v1/todos/show`,
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );

  return response.data; 
}
