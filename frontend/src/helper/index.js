import axios from "axios";

export async function useFetchTodos(){
    
    const alltodo = await axios.get('http://localhost:3030/api/v1/todos/show',
      {
        headers:{
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      }
    );
    return alltodo.data.allTodos;
   
  }
   



