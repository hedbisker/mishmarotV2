import axios from 'axios';
import { AxiosResponse } from 'axios';

const BASE_URL = 'http://localhost:12403';
const LOGIN_ENDPOINT = '/login.asp';
const LOGOUT_ENDPOINT = '/logout.asp';
const UPDATE_BOOKING_ENDPOINT = '/updateBooking.asp';
const READ_CARS = '/readCars.asp';

export const login = async (username: string): Promise<AxiosResponse> => {
    return axios.post(BASE_URL+LOGIN_ENDPOINT,"login,"+username);
};


export const logout = async (): Promise<AxiosResponse> => {
    return axios.post(BASE_URL+LOGOUT_ENDPOINT,"logout");
};

export const updateBooking = async (key: string, quantityForChange: number): Promise<AxiosResponse> => {
    return axios.post(BASE_URL+UPDATE_BOOKING_ENDPOINT,"updateBooking,"+key + "," + quantityForChange);
};


export const readCars = async (): Promise<AxiosResponse> => {
    return axios.get(BASE_URL+READ_CARS)
};
