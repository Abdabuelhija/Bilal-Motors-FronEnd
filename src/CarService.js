import axios from "axios";
const API = "https://64620338491f9402f4b02aa1.mockapi.io/Cars";



export async function fetchAllCars() {
  const response = await axios.get(`${API}`);
  return response.data;
}

export const getCarById = async (id) => {
  try {
    const response = await axios.get(`${API}/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export async function addCar(car) {
  const searchCar = await axios.get(`${API}?carNumber=${car.carNumber}`);
  if(searchCar.data[0]){
    console.log("the car already exist.");
    return false;
  }
  else{
    const response = await axios.post(`${API}`, car);
    return true ;
  }
}



export const updateCarById = async (id, carData) => {
  try {
    const response = await axios.put(`${API}/${id}`, carData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const markCarAsSold = async (id, carData) => {
  try {
    const response = await axios.put(`${API}/${id}`, { ...carData, isSold: true });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};






