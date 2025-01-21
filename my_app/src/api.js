import axios from 'axios';
import {table_api} from "./apiEndpoints"
export const fetchData = async () => {
    try {
      const response = await axios.get(table_api);
      if (response["status"] === 200) {
        return response.data;
      } else {
        return [];
      }
    } catch (err) {
      return err.message;
    } 
  };