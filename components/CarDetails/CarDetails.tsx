"use client";
import { Car } from "@/types/car";
import { useParams } from "next/navigation";
import { fetchCarById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { Formik, Form, Field, ErrorMessage, FieldProps } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import css from "./CarDetails.module.css";
import Icon from "../Icons/Icons";
import DatePicker from "../DatePicker/DatePicker";
import Image from "next/image";

// interface CarPreviewProps {
// 	car: Car;
// }

interface BookingFormValues {
	name: string;
	email: string;
	bookingDate: Date | null;
	comment: string;
}

const validationSchema = Yup.object({
	name: Yup.string()
		.min(2, "Name must be at least 2 characters")
		.required("Name is required"),
	email: Yup.string()
		.email("Invalid email address")
		.required("Email is required"),
	bookingDate: Yup.date()
		.nullable()
		.required("Booking date is required")
		.test(
			"is-future-or-today",
			"Booking date cannot be in the past",
			(value) => {
				if (!value) return true;
				const today = new Date();
				today.setHours(0, 0, 0, 0);
				return value >= today;
			}
		)
		.typeError("Please select a valid date"),
	comment: Yup.string().max(500, "Comment must be less than 500 characters"),
});
const CarDetails = () => {
	const { id } = useParams<{ id: string }>();
	const { data } = useQuery({
		queryKey: ["car", id],
		queryFn: () => fetchCarById(id),
		refetchOnMount: false,
	}) as { data: Car };

	const initialValues: BookingFormValues = {
		name: "",
		email: "",
		bookingDate: null,
		comment: "",
	};

	const handleSubmit = async (
		values: BookingFormValues,
		{ resetForm }: { resetForm: () => void }
	) => {
		try {
			await new Promise((resolve) => setTimeout(resolve, 1000));

			toast.success(
				`Booking successful! We'll contact you at ${values.email} soon.`,
				{
					duration: 4000,
					style: {
						background: "#10b981",
						color: "#fff",
					},
				}
			);

			resetForm();
		} catch {
			toast.error("Booking failed. Please try again.", {
				duration: 4000,
				style: {
					background: "#ef4444",
					color: "#fff",
				},
			});
		}
	};

	return (
		<div className={css.container}>
			<div className={css.leftColumn}>
				<div className={css.imageContainer}>
					<Image
						src={data.img}
						alt={`${data.brand} ${data.model}`}
						className={css.carImage}
						width={640}
						height={512}
					/>
				</div>

				<div className={css.bookingForm}>
					<h3 className={css.formTitle}>Book your car now</h3>
					<p className={css.formSubtitle}>
						Stay connected! We are always ready to help you.
					</p>

					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={handleSubmit}>
						{({ isSubmitting }) => (
							<Form className={css.orderForm}>
								<div className={css.formGroup}>
									<div className={css.inputForm}>
										<Field
											type="text"
											name="name"
											placeholder="Name*"
											className={css.formInput}
										/>
										<ErrorMessage
											name="name"
											component="span"
											className={css.errorMessage}
										/>
									</div>

									<div className={css.inputForm}>
										<Field
											type="email"
											name="email"
											placeholder="Email*"
											className={css.formInput}
										/>
										<ErrorMessage
											name="email"
											component="span"
											className={css.errorMessage}
										/>
									</div>

									<div className={css.inputForm}>
										<Field
											name="bookingDate"
											className={css.formInput}>
											{({ field, form }: FieldProps) => (
												<DatePicker
													value={
														field.value
															? new Date(field.value)
															: null
													}
													onChange={(date) => {
														form.setFieldValue(
															"bookingDate",
															date
														);
													}}
													placeholder="Booking date"
												/>
											)}
										</Field>
										<ErrorMessage
											name="bookingDate"
											component="span"
											className={css.errorMessage}
										/>
									</div>

									<div className={css.inputForm}>
										<Field
											as="textarea"
											name="comment"
											placeholder="Comment"
											className={css.formTextarea}
										/>
										<ErrorMessage
											name="comment"
											component="span"
											className={css.errorMessage}
										/>
									</div>
								</div>

								<button
									type="submit"
									className={css.submitBtn}
									disabled={isSubmitting}>
									{isSubmitting ? "Sending..." : "Send"}
								</button>
							</Form>
						)}
					</Formik>
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
						<div className={css.mileage}>
							Mileage: {data.mileage.toLocaleString()} km
						</div>
					</div>
					<span className={css.price}>${data.rentalPrice}</span>
					<p className={css.description}>{data.description}</p>
				</div>

				<div className={css.infoSection}>
					<div className={css.sectionItem}>
						<h2 className={css.sectionTitle}>Rental Conditions:</h2>
						<div className={css.subsection}>
							{data.rentalConditions.map((condition, index) => (
								<div
									key={index}
									style={{
										display: "flex",
										alignItems: "center",
										gap: "8px",
									}}>
									<Icon name="check" />
									<span className={css.sectionText}>{condition}</span>
								</div>
							))}
						</div>
					</div>

					<div className={css.sectionItem}>
						<h2 className={css.sectionTitle}>Car Specifications:</h2>
						<div className={css.subsection}>
							<div
								style={{
									display: "flex",
									alignItems: "center",
									gap: "8px",
								}}>
								<Icon name="calendar" />
								<span className={css.sectionText}>
									Year: {data.year}
								</span>
							</div>

							<div
								style={{
									display: "flex",
									alignItems: "center",
									gap: "8px",
								}}>
								<Icon name="car" />
								<span className={css.sectionText}>
									Type: {data.type}
								</span>
							</div>

							<div
								style={{
									display: "flex",
									alignItems: "center",
									gap: "8px",
								}}>
								<Icon name="fuel-pump" />
								<span className={css.sectionText}>
									Fuel Consumption: {data.fuelConsumption}
								</span>
							</div>

							<div
								style={{
									display: "flex",
									alignItems: "center",
									gap: "8px",
								}}>
								<Icon name="gear" />
								<span className={css.sectionText}>
									Engine Size: {data.engineSize}
								</span>
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
									<div
										key={index}
										style={{
											display: "flex",
											alignItems: "center",
											gap: "8px",
										}}>
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
