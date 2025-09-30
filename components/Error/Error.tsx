import css from "./Error.module.css";

const Error = () => {
	return (
		<div className={css.errorContainer}>
			<div className={css.spinner}></div>
			<p>Error Loading cars...</p>
		</div>
	);
};

export default Error;
