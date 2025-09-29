import iconData from "@/public/icons.json";

interface IconProps {
	name:
		| "calendar"
		| "car"
		| "check"
		| "down"
		| "fuel-pump"
		| "gear"
		| "heart-active"
		| "heart-default"
		| "location"
		| "up";
	className?: string;
}

const Icon = ({ name, className = "" }: IconProps) => {
	const icon = iconData.icons.find((icon) => icon.tags?.[0] === name);

	if (!icon) return null;

	return (
		<svg width={16} height={16} viewBox="0 0 1024 1024" className={className}>
			{icon.paths.map((path, index) => (
				<path
					key={index}
					d={path}
					fill={icon.attrs?.[index]?.fill || "currentColor"}
				/>
			))}
		</svg>
	);
};

export default Icon;
