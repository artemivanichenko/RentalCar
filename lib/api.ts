import { ApiResponse, Car } from "@/types/car";
import axios from "axios";

const axiosInst = axios.create({
	baseURL: "https://car-rental-api.goit.global",
});

export const fetchCars = async (
	brand?: string,
	rentalPrice?: string,
	minMileage?: string,
	maxMileage?: string,
	limit?: number,
	page?: number
): Promise<Car[]> => {
	try {
		const params: Record<string, string> = {};

		if (brand) params.brand = brand;
		if (rentalPrice) params.rentalPrice = rentalPrice;
		if (minMileage) params.minMileage = minMileage;
		if (maxMileage) params.maxMileage = maxMileage;
		if (limit) params.limit = limit.toString();
		if (page) params.page = page.toString();

		const response = await axiosInst.get<ApiResponse>("/cars", {
			params: params,
		});

		return response.data.cars;
	} catch (error) {
		console.error("Error fetching cars:", error);
		throw error;
	}
};

export const fetchCarById = async (id: string): Promise<Car> => {
	const response = await axiosInst.get<Car>(`/cars/${id}`);
	return response.data;
};
