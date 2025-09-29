"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCars } from "@/lib/api";
import CarsList from "@/components/CarList/CarList";
import SearchBox from "@/components/SearchBox/SearchBox";

interface FilterValues {
	brand: string;
	price: string;
	mileageFrom: string;
	mileageTo: string;
}

const CarsClient = () => {
	const [filters, setFilters] = useState<FilterValues>({
		brand: "",
		price: "",
		mileageFrom: "",
		mileageTo: "",
	});

	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["cars", filters],
		queryFn: () =>
			fetchCars(
				filters.brand || undefined,
				filters.price || undefined,
				filters.mileageFrom || undefined,
				filters.mileageTo || undefined,
				12, // limit
				1 // page
			),
	});

	const handleFilter = (newFilters: FilterValues) => {
		setFilters(newFilters);
	};

	if (isLoading) {
		return (
			<div style={{ padding: "20px", textAlign: "center" }}>
				<h2>Loading cars...</h2>
			</div>
		);
	}

	if (isError) {
		return (
			<div style={{ padding: "20px", textAlign: "center", color: "red" }}>
				<h2>Error loading cars</h2>
				<p>{error instanceof Error ? error.message : "Unknown error"}</p>
			</div>
		);
	}

	return (
		<div>
			<SearchBox onFilter={handleFilter} />
			<div>
				{data && data.length > 0 ? (
					<CarsList cars={data} />
				) : (
					<p>No cars found with current filters</p>
				)}
			</div>
		</div>
	);
};

export default CarsClient;
