import {
	HydrationBoundary,
	QueryClient,
	dehydrate,
} from "@tanstack/react-query";
import React from "react";
import Catalog from "./Catalog.client";

const Cars = () => {
	const queryClient = new QueryClient();
	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<Catalog />
		</HydrationBoundary>
	);
};

export default Cars;
