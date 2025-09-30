"use client";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { fetchCarById } from "@/lib/api";
import CarDetails from "@/components/CarDetails/CarDetails";
import Loader from "@/components/Loader/Loader";
import Error from "@/components/Error/Error";

const CarDetailsClient = () => {
	const { id } = useParams<{ id: string }>();
	const { data, isLoading, error } = useQuery({
		queryKey: ["car", id],
		queryFn: () => fetchCarById(id),
		refetchOnMount: false,
	});

	if (isLoading) return <Loader />;
	if (error) return <Error />;
	if (!data) return <Error />;

	return <CarDetails />;
};

export default CarDetailsClient;
