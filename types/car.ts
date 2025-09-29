export interface Car {
	id: string;
	year: string;
	brand: string;
	model: string;
	type: string;
	img: string;
	description: string;
	fuelConsumption: string;
	engineSize: string;
	accessories: string[];
	functionalities: string[];
	rentalPrice: string;
	rentalCompany: string;
	address: string;
	rentalConditions: string[];
	mileage: number;
}

export interface ApiResponse {
	cars: Car[];
	total: number;
	page: number;
	totalPages: number;
}

export type CarsTag =
	| "Aston Martin"
	| "Audi"
	| "BMW"
	| "Bentley"
	| "Buick"
	| "Chevrolet"
	| "Chrysler"
	| "GMC"
	| "HUMMER"
	| "Hyundai"
	| "Kia"
	| "Lamborghini"
	| "Land Rover"
	| "Lincoln"
	| "MINI"
	| "Mercedes-Benz"
	| "Mitsubishi"
	| "Nissan"
	| "Pontiac"
	| "Subaru"
	| "Volvo";

export const brands = [
	"Aston Martin",
	"Audi",
	"BMW",
	"Bentley",
	"Buick",
	"Chevrolet",
	"Chrysler",
	"GMC",
	"HUMMER",
	"Hyundai",
	"Kia",
	"Lamborghini",
	"Land Rover",
	"Lincoln",
	"MINI",
	"Mercedes-Benz",
	"Mitsubishi",
	"Nissan",
	"Pontiac",
	"Subaru",
	"Volvo",
] as const;
