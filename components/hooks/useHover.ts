import { useState } from "react";

const useHover = (defaultHover: boolean) => {
	const [isHovered, setIsHovered] = useState(defaultHover);

	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	return { isHovered, handleMouseEnter, handleMouseLeave };
};

export default useHover;
