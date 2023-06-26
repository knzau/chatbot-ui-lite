import { Message } from "@/types";
import { IconArrowUp, IconSend } from "@tabler/icons-react";
import { FC, KeyboardEvent, useEffect, useRef, useState } from "react";

interface Props {
	onSend: (message: Message) => void;
}

export const ChatInput: FC<Props> = ({ onSend }) => {
	const [content, setContent] = useState<string>();

	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const value = e.target.value;
		if (value.length > 4000) {
			alert("Message limit is 4000 characters");
			return;
		}

		setContent(value);
	};

	const handleSend = () => {
		if (!content) {
			alert("Please enter a message");
			return;
		}
		onSend({ role: "user", content: { text: content, visualizations: [] } });
		setContent("");
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSend();
		}
	};

	useEffect(() => {
		if (textareaRef && textareaRef.current) {
			textareaRef.current.style.height = "inherit";
			textareaRef.current.style.height = `${textareaRef.current?.scrollHeight}px`;
		}
	}, [content]);

	return (
		<div className="relative w-full">
			<textarea
				ref={textareaRef}
				className="min-h-[50px] rounded-3xl pl-4 pr-12 py-4 w-full focus:outline-none focus:ring-1 focus:ring-neutral-300 border-none border-neutral-200 drop-shadow-md"
				style={{ resize: "none" }}
				placeholder="Type a message..."
				value={content}
				rows={1}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
			/>

			<button onClick={() => handleSend()}>
				<IconSend className="absolute right-2 bottom-5 h-8 w-8 hover:cursor-pointer rounded-full p-1 bg-blue-400 text-white hover:opacity-80" />
			</button>
		</div>
	);
};
