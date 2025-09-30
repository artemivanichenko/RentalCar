"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCars } from "@/lib/api";
import CarsList from "@/components/CarList/CarList";
import SearchBox from "@/components/SearchBox/SearchBox";
import { Car } from "@/types/car";
import LoadMore from "@/components/LoadMore/LoadMore";
import { useFavorites } from "@/hooks/useFavorites";
import Loader from "@/components/Loader/Loader";
import Error from "@/components/Error/Error";

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
	const [page, setPage] = useState(1);
	const [allCars, setAllCars] = useState<Car[]>([]);
	const { favorites, toggleFavorite } = useFavorites();

	const { data, isLoading, isError } = useQuery({
		queryKey: ["cars", filters, page],
		queryFn: async () => {
			const newCars = await fetchCars(
				filters.brand || undefined,
				filters.price || undefined,
				filters.mileageFrom || undefined,
				filters.mileageTo || undefined,
				12, // limit всегда 12
				page // текущая страница
			);
			if (page === 1) {
				setAllCars(newCars);
			} else {
				setAllCars((prev) => [...prev, ...newCars]);
			}

			return newCars;
		},
	});

	const handleFilter = (newFilters: FilterValues) => {
		setFilters(newFilters);
		setPage(1);
		setAllCars([]);
	};
	const handleLoadMore = () => {
		setPage((prev) => prev + 1);
	};

	if (isLoading && page === 1) {
		return <Loader />;
	}

	if (isError) {
		return <Error />;
	}
	const hasMore = data && data.length === 12;
	return (
		<div>
			<SearchBox onFilter={handleFilter} />

			{allCars.length > 0 ? (
				<>
					<CarsList
						cars={allCars}
						favorites={favorites}
						onToggleFavorite={toggleFavorite}
					/>

					{hasMore && (
						<LoadMore onClick={handleLoadMore} isLoading={isLoading} />
					)}
				</>
			) : (
				<p>No cars found</p>
			)}
		</div>
	);
};

export default CarsClient;
