import Link from "next/link";
import css from "./page.module.css";

export default function Home() {
	return (
		<section className={css.hero}>
			<div className={css.container}>
				<h1 className={css.title}>Find your perfect rental car</h1>
				<p className={css.description}>
					Reliable and budget-friendly rentals for any journey
				</p>
				<Link href="/catalog" className={css.link}>
					View Catalog
				</Link>
			</div>
		</section>
	);
}
