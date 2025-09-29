import css from "./LoadMore.module.css";

interface LoadMoreProps {
	onClick: () => void;
	isLoading?: boolean;
}

const LoadMore = ({ onClick, isLoading = false }: LoadMoreProps) => {
	return (
		<div className={css.loadMoreSection}>
			<button onClick={onClick} disabled={isLoading} className={css.button}>
				{isLoading ? "Loading..." : "Load more"}
			</button>
		</div>
	);
};

export default LoadMore;
