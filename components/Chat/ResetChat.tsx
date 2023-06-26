import { FC } from "react";

interface Props {
	onReset: () => void;
}

export const ResetChat: FC<Props> = ({ onReset }) => {
	return (
		<div className="flex flex-row items-center">
			<button
				className="min-h-[58px] min-w-[160px] text-sm sm:text-base text-gray-50 font-semibold rounded-3xl px-4 py-2 bg-blue-400 hover:bg-neutral-300 focus:outline-none focus:ring-1 focus:ring-neutral-300"
				onClick={() => onReset()}
			>
				New topic
			</button>
		</div>
	);
};
