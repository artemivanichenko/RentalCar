import {
	HydrationBoundary,
	QueryClient,
	dehydrate,
} from "@tanstack/react-query";
import React from "react";
import { Metadata } from "next";
import { fetchCarById } from "@/lib/api";
import CarDetailsClient from "./CarDetails.client";

interface CarDetailsProps {
	params: Promise<{ id: string }>;
}

export const generateMetadata = async ({
	params,
}: CarDetailsProps): Promise<Metadata> => {
	const { id } = await params;
	const car = await fetchCarById(id);
	const title = `Car: ${car.brand}`;
	const description = car.description.slice(0, 100);

	return {
		title: title,
		description: description,
		openGraph: {
			title: title,
			description: description,
			url: `changelink/car/${id}`,
			siteName: "NoteHub",
			images: [
				{
					url: "changelinkhttps://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
					width: 1200,
					height: 630,
					alt: title,
				},
			],
			type: "website",
		},
		twitter: {
			card: "summary_large_image",
			title: title,
			description: description,
			images: ["https://ac.goit.global/fullstack/react/og-meta.jpg"],
		},
	};
};

const NotesDetails = async ({ params }: CarDetailsProps) => {
	const { id } = await params;
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery({
		queryKey: ["car", id],
		queryFn: () => fetchCarById(id),
	});
	return (
		<div>
			<HydrationBoundary state={dehydrate(queryClient)}>
				<CarDetailsClient />
			</HydrationBoundary>
		</div>
	);
};

export default NotesDetails;
