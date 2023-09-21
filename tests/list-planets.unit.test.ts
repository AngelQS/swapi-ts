import axios from "axios";

async function fetchData() {
  try {
    const { SW_API_URL, SW_LIST_PLANETS_ENDPOINT } = process.env;
    const url = `${SW_API_URL}${SW_LIST_PLANETS_ENDPOINT}?page=1`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

describe('fetchData', () => {
  it('debería devolver los datos correctamente', async () => {
    const { SW_API_URL, SW_LIST_PLANETS_ENDPOINT } = process.env;
    const url = `${SW_API_URL}${SW_LIST_PLANETS_ENDPOINT}?page=1`;
    const mockResponse = { data: null };
    axios.get = jest.fn().mockResolvedValue(mockResponse);

    const data = await fetchData();
    expect(data).toEqual(mockResponse.data);
    expect(axios.get).toHaveBeenCalledWith(url);
  });

  it('debería manejar errores correctamente', async () => {
    const { SW_API_URL, SW_LIST_PLANETS_ENDPOINT } = process.env;
    const url = `${SW_API_URL}${SW_LIST_PLANETS_ENDPOINT}?page=1`;
    const mockError = new Error('Error de invocación');
    axios.get = jest.fn().mockRejectedValue(mockError);

    await expect(fetchData()).rejects.toThrow(mockError);
    expect(axios.get).toHaveBeenCalledWith(url);
  });
});