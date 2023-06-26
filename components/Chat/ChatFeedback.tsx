import React from "react";
import { IconThumbUp, IconThumbDown, IconCopy, IconDownload } from "@tabler/icons-react";

const ChatFeedback = ({ onLike, onDislike, onCopy, onDownload }) => {
	return (
		<div className="flex flex-row items-center bg-slate-50 rounded-md drop-shadow-md max-w-[180px] justify-around absolute right-0 bottom-[70px] ">
			<button
				className="max-h-[40px] max-w-[40px] rounded-l-md  h-[35px] px-2 border-r-[1px] border-gray-400 hover:bg-gray-200"
				onClick={() => onLike()}
			>
				<IconThumbUp color="#2c2929" size={22} stroke={1} />
			</button>
			<button
				className="max-h-[40px] max-w-[40px] h-[35px] px-2  border-r-[1px] border-gray-300  hover:bg-gray-100"
				onClick={() => onDislike()}
			>
				<IconThumbDown color="#2c2929" size={22} stroke={1} />
			</button>
			<button
				className="max-h-[40px] max-w-[40px] h-[35px] px-2  border-r-[1px] border-gray-300  hover:bg-gray-100"
				onClick={() => onCopy()}
			>
				<IconCopy color="#2c2929" size={22} stroke={1} />
			</button>
			<button
				className="max-h-[40px] max-w-[40px] rounded-r-md h-[35px] border-gray-300 px-2   hover:bg-gray-100"
				onClick={() => onDownload()}
			>
				<IconDownload color="#2c2929" size={22} stroke={1} />
			</button>
		</div>
	);
};

export default ChatFeedback;
