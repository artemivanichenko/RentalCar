import { useState, useEffect } from "react";

export const useFavorites = () => {
	const [favorites, setFavorites] = useState<string[]>([]);

	useEffect(() => {
		const saved = localStorage.getItem("favorites");
		if (saved) {
			setFavorites(JSON.parse(saved));
		}
	}, []);

	const toggleFavorite = (carId: string) => {
		setFavorites((prev) => {
			const newFavorites = prev.includes(carId)
				? prev.filter((id) => id !== carId)
				: [...prev, carId];

			localStorage.setItem("favorites", JSON.stringify(newFavorites));
			return newFavorites;
		});
	};

	const isFavorite = (carId: string) => favorites.includes(carId);

	return { favorites, toggleFavorite, isFavorite };
};
