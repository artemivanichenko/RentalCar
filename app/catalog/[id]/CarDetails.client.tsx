"use client";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { fetchCarById } from "@/lib/api";
import CarDetails from "@/components/CarDetails/CarDetails";

const CarDetailsClient = () => {
	const { id } = useParams<{ id: string }>();
	const { data, isLoading, error } = useQuery({
		queryKey: ["car", id],
		queryFn: () => fetchCarById(id),
		refetchOnMount: false,
	});
	return (
		<>
			{data && <CarDetails car={data} />}
			{isLoading && <p>Loading...</p>}
			{error && <p>Error 😅</p>}
		</>
	);
};

export default CarDetailsClient;
