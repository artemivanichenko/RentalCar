"use client";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import css from "./DatePicker.module.css";

interface DatePickerProps {
	value: Date | null;
	onChange: (date: Date | null) => void;
	placeholder?: string;
}

const DatePicker = ({ value, onChange, placeholder }: DatePickerProps) => {
	return (
		<ReactDatePicker
			selected={value}
			onChange={onChange}
			dateFormat="dd/MM/yyyy"
			placeholderText={placeholder}
			className={css.formInput}
			calendarClassName={css.calendar}
			wrapperClassName={css.wrapper}
			popperPlacement="right-end"
		/>
	);
};

export default DatePicker;
