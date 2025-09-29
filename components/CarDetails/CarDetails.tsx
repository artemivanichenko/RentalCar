import { Car } from "@/types/car";
import Link from "next/link";
import { useParams } from "next/navigation";
import { fetchCarById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import css from "./CarDetails.module.css";
import Icon from "../Icons/Icons";

interface CarPreviewProps {
	car: Car;
}

const CarDetails = ({ car }: CarPreviewProps) => {
	const { id } = useParams<{ id: string }>();
	const { data } = useQuery({
		queryKey: ["car", id],
		queryFn: () => fetchCarById(id),
		refetchOnMount: false,
	}) as { data: Car };

	return (
		<div className={css.container}>
			<div className={css.leftColumn}>
				<div className={css.imageContainer}>
					<img
						src={data.img}
						alt={`${data.brand} ${data.model}`}
						className={css.carImage}
					/>
				</div>

				<div className={css.bookingForm}>
					<h3 className={css.formTitle}>Book your car now</h3>
					<p className={css.formSubtitle}>
						Stay connected! We are always ready to help you.
					</p>
					<div className={css.orderForm}>
						<div className={css.formGroup}>
							<div className={css.inputForm}>
								<input
									type="text"
									placeholder="Name*"
									className={css.formInput}
								/>
							</div>

							<div className={css.inputForm}>
								<input
									type="email"
									placeholder="Email*"
									className={css.formInput}
								/>
							</div>

							<div className={css.inputForm}>
								<input
									type="text"
									placeholder="Booking date"
									className={css.formInput}
								/>
							</div>

							<div className={css.inputForm}>
								<textarea
									placeholder="Comment"
									className={css.formTextarea}></textarea>
							</div>
						</div>
						<button className={css.submitBtn}>Send</button>
					</div>
				</div>
			</div>

			<div className={css.rightColumn}>
				<div className={css.carInfo}>
					<h1 className={css.carTitle}>
						{data.brand} {data.model}, {data.year}
						<span className={css.carId}>Id: {data.id.slice(-6)}</span>
					</h1>
					<div className={css.carMeta}>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								gap: "4px",
							}}>
							<Icon name="location" />
							Kyiv, Ukraine
						</div>
						<div className={css.mileage}>Mileage: {data.mileage} km</div>
					</div>
					<span className={css.price}>${data.rentalPrice}</span>
					<p className={css.description}>{data.description}</p>
				</div>

				<div className={css.infoSection}>
					<div className={css.sectionItem}>
						<h2 className={css.sectionTitle}>Rental Conditions:</h2>
						<div className={css.subsection}>
							{data.rentalConditions.map((condition, index) => (
								<div key={index}>
									<Icon name="check" />
									<span className={css.sectionText}>{condition}</span>
								</div>
							))}
						</div>
					</div>

					<div className={css.sectionItem}>
						<div className={css.sectionItem}>
							<h2 className={css.sectionTitle}>Car Specifications:</h2>
							<div className={css.subsection}>
								<div>
									<Icon name="calendar" />
									<span className={css.sectionText}>
										Year: {data.year}
									</span>
								</div>

								<div>
									<Icon name="car" />
									<span className={css.sectionText}>
										Type: {data.type}
									</span>
								</div>
								<div>
									<Icon name="fuel-pump" />
									<span className={css.sectionText}>
										Fuel Consumption: {data.fuelConsumption}
									</span>
								</div>
								<div>
									<Icon name="gear" />
									<span className={css.sectionText}>
										Engine Size: {data.engineSize}
									</span>
								</div>
							</div>
						</div>
					</div>

					<div className={css.sectionItem}>
						<h2 className={css.sectionTitle}>
							Accessories and functionalities:
						</h2>
						<div className={css.subsection}>
							{[...data.accessories, ...data.functionalities].map(
								(feature, index) => (
									<div key={index}>
										<Icon name="check" />
										<span className={css.sectionText}>{feature}</span>
									</div>
								)
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CarDetails;
