import axios from "axios";

export async function useFetchTodos() {
  const response = await axios.get(
    "http://localhost:4000/api/v1/todos/show",
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );

  return response.data; 
}
