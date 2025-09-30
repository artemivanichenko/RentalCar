import Link from "next/link";
import type { Car } from "../../types/car";
import css from "./CarList.module.css";
import Image from "next/image";
import Icon from "../Icons/Icons";

interface CarListProps {
	cars: Car[];
	favorites: string[];
	onToggleFavorite: (carId: string) => void;
}

const CarsList = ({ cars, favorites, onToggleFavorite }: CarListProps) => {
	return (
		<div className={css.container}>
			<ul className={css.list}>
				{cars.map((car) => {
					const isFavorite = favorites.includes(car.id);
					return (
						<li key={car.id} className={css.listItem}>
							<div className={css.content}>
								<div>
									<div className={css.imageContainer}>
										<Image
											className={css.image}
											src={car.img}
											alt={`${car.brand} ${car.model}`}
											width={276}
											height={268}
										/>
										<button
											onClick={() => onToggleFavorite(car.id)}
											className={css.favoriteBtn}
											type="button">
											<Icon
												name={
													isFavorite
														? "heart-active"
														: "heart-default"
												}
											/>
										</button>
									</div>

									<div className={css.header}>
										<h3 className={css.title}>
											{car.brand}{" "}
											<span className={css.model}>{car.model}</span>,{" "}
											{car.year}
										</h3>
										<span className={css.price}>
											${car.rentalPrice}
										</span>
									</div>

									<div className={css.meta}>
										<span>
											{car.address
												.split(",")
												.slice(-2)
												.join(",")
												.trim()}
										</span>
										<span>{car.rentalCompany}</span>
										<span>{car.type}</span>
										<span>{car.mileage.toLocaleString()} km</span>
									</div>
								</div>

								<Link
									href={`/catalog/${car.id}`}
									className={css.readMoreBtn}>
									Read more
								</Link>
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default CarsList;
