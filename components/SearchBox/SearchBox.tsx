import React, { useState } from "react";
import { Formik, Form } from "formik";
import { brands } from "@/types/car";
import css from "./SearchBox.module.css";

interface SearchBoxProps {
	onFilter: (filters: SearchBox) => void;
}

interface SearchBox {
	brand: string;
	price: string;
	mileageFrom: string;
	mileageTo: string;
}
const SearchBox: React.FC<SearchBoxProps> = ({ onFilter }) => {
	const [showBrandDropdown, setShowBrandDropdown] = useState(false);
	const [showPriceDropdown, setShowPriceDropdown] = useState(false);
	const [focusedInput, setFocusedInput] = useState<string | null>(null);

	const priceRanges = [
		{ label: "30", value: "30" },
		{ label: "40", value: "40" },
		{ label: "50", value: "50" },
		{ label: "60", value: "60" },
		{ label: "70", value: "70" },
		{ label: "80", value: "80" },
	];

	const [savedValues, setSavedValues] = useState<SearchBox>({
		brand: "",
		price: "",
		mileageFrom: "",
		mileageTo: "",
	});

	return (
		<Formik
			initialValues={savedValues}
			enableReinitialize={true}
			onSubmit={(values, { setSubmitting }) => {
				setSavedValues(values);
				onFilter(values);

				setSubmitting(false);
			}}>
			{({ values, setFieldValue }) => (
				<Form className={css.container}>
					<div className={`${css.searchItem} ${css.searchItemBrand}`}>
						<span className={css.label}>Car brand</span>
						<button
							type="button"
							className={css.searchInput}
							onClick={() => setShowBrandDropdown(!showBrandDropdown)}>
							{values.brand || "Choose a brand"}
							<svg
								className={css.chevron}
								width="20"
								height="20"
								viewBox="0 0 20 20">
								<path
									d="M5 7.5L10 12.5L15 7.5"
									stroke="currentColor"
									strokeWidth="2"
									fill="none"
								/>
							</svg>
						</button>

						{showBrandDropdown && (
							<div className={css.dropdownMenu}>
								{brands.map((brand) => (
									<button
										key={brand}
										type="button"
										className={css.dropdownMenuItem}
										onClick={() => {
											setFieldValue("brand", brand);
											setShowBrandDropdown(false);
										}}>
										{brand}
									</button>
								))}
							</div>
						)}
					</div>

					<div className={`${css.searchItem} ${css.searchItemPrice}`}>
						<span className={css.label}>Price / 1 hour</span>
						<button
							type="button"
							className={css.searchInput}
							onClick={() => setShowPriceDropdown(!showPriceDropdown)}>
							{values.price ? `To $${values.price}` : "Choose a price"}
							<svg
								className={css.chevron}
								width="20"
								height="20"
								viewBox="0 0 20 20">
								<path
									d="M5 7.5L10 12.5L15 7.5"
									stroke="currentColor"
									strokeWidth="2"
									fill="none"
								/>
							</svg>
						</button>

						{showPriceDropdown && (
							<div className={css.dropdownMenu}>
								{priceRanges.map((range) => (
									<button
										key={range.value}
										type="button"
										className={css.dropdownMenuItem}
										onClick={() => {
											setFieldValue("price", range.value);
											setShowPriceDropdown(false);
										}}>
										{range.label}
									</button>
								))}
							</div>
						)}
					</div>

					<div className={css.searchItem}>
						<span className={css.label}>Car mileage / km</span>
						<div className={css.searchInput}>
							<input
								type="text"
								placeholder="From"
								value={
									values.mileageFrom
										? `From ${values.mileageFrom}`
										: ""
								}
								onChange={(e) => {
									const numericValue = e.target.value.replace(
										/\D/g,
										""
									);
									setFieldValue("mileageFrom", numericValue);
									setSavedValues((prev) => ({
										...prev,
										mileageFrom: numericValue,
									}));
								}}
								className={css.mileageInputFrom}
							/>

							<input
								type="text"
								placeholder="To"
								value={values.mileageTo ? `To ${values.mileageTo}` : ""}
								onChange={(e) => {
									const numericValue = e.target.value.replace(
										/\D/g,
										""
									);
									setFieldValue("mileageTo", numericValue);
									setSavedValues((prev) => ({
										...prev,
										mileageTo: numericValue,
									}));
								}}
								className={css.mileageInputTo}
							/>
						</div>
					</div>

					<button type="submit" className={css.searchButton}>
						Search
					</button>
				</Form>
			)}
		</Formik>
	);
};

export default SearchBox;
