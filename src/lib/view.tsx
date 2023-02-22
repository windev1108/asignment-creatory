import axios from "axios";


export const getView = async ({ limit , offset} : { limit?: number, offset?: number}) => {
      const { data } = await axios.get(`/api/view?limit=${limit}&offset=${offset}`)
      return data
}