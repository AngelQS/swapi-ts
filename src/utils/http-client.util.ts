import axios from "axios";
import ServiceException from "../exceptions/service-exception";

export async function makeRequest(url: string, method: string, body: object | null) {
  try {
    const axiosResponse = await axios({
      url, method, data: body,
    });
  
    const data = axiosResponse.data;
    return data;
  } catch (error: any) {
    const statusCode = error?.response?.status;
    const errorMessage = error?.response?.data?.detail;
    throw new ServiceException(statusCode, "ERR-053", errorMessage);
  }
};
