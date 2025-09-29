"use client";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Loading from "@/app/loading";
import { fetchCarById } from "@/lib/api";
import Link from "next/link";
import css from "./page.module.css";
import CarDetails from "@/components/CarDetails/CarDetails";
import { useRouter } from "next/router";

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
