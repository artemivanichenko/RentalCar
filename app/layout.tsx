import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "modern-normalize";
import "./globals.css";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import Header from "@/components/Header/Header";
import { Toaster } from "react-hot-toast";

const manrope = Manrope({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	variable: "--font-manrope",
	display: "swap",
});
export const metadata: Metadata = {
	title: "RentalCar - Find Your Perfect Rental Car",
	description:
		"Reliable and budget-friendly car rentals for any journey. Browse our catalog of quality vehicles with flexible rental conditions and competitive prices.",
	keywords: [
		"car rental",
		"rent a car",
		"vehicle rental",
		"affordable car rental",
		"rental cars",
	],
	authors: [{ name: "Your Name" }],
	openGraph: {
		title: "RentalCar - Find Your Perfect Rental Car",
		description: "Reliable and budget-friendly car rentals for any journey",
		type: "website",
		locale: "en_US",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${manrope.variable}`}>
				<TanStackProvider>
					<Header />
					{children}
				</TanStackProvider>
			</body>
		</html>
	);
}
