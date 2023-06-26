"use client";
import { Message } from "@/types";
import { FC } from "react";
import dynamic from "next/dynamic";
import useHover from "../hooks/useHover";
import ChatFeedback from "./ChatFeedback";
import { onCopy, onDislike, onDownload, onLike } from "@/utils";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

interface Props {
	message: Message;
	isFirst: boolean;
}

export const ChatMessage: FC<Props> = ({ message, isFirst }) => {
	const { content, role } = message;
	const { text, visualizations } = content;
	console.log({ content });

	const plotMapLayout = {
		width: 500,
		height: 400,
	};

	const mapLayout = {
		mapbox: {
			style: "open-street-map", // Set the Leaflet map style here
			center: { lat: 38, lon: -95 }, // Set the initial center of the map
		},
	};

	interface Props {
		onSend: (message: Message) => void;
	}

	const { isHovered, handleMouseEnter, handleMouseLeave } = useHover(false);
	console.log({ isFirst });

	return (
		<div className={`flex flex-col ${message.role === "assistant" ? "items-start" : "items-end"}`}>
			<div
				className={`flex items-center ${
					message.role === "assistant" ? "bg-white text-neutral-900" : "bg-blue-400 text-white"
				} rounded-2xl px-3 py-2 max-w-[100%] whitespace-pre-wrap`}
				style={{ overflowWrap: "anywhere" }}
			>
				{!!text ? (
					<div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="relative">
						{isHovered && message.role === "assistant" && !isFirst && (
							<ChatFeedback
								onLike={onLike}
								onDislike={onDislike}
								onCopy={onCopy}
								onDownload={onDownload}
							/>
						)}
						{content.text}
					</div>
				) : (
					""
				)}
			</div>
			<div
				className={`flex my-4 flex-col justify-center  rounded-2xl px-3 py-2 max-w-[67%] whitespace-pre-wrap`}
				style={{ overflowWrap: "anywhere" }}
			>
				{(visualizations || []).map((visualData: any, i) => {
					if (visualData[0].type === "scattermapbox") {
						return (
							<Plot
								key={i}
								data={visualData}
								layout={{ ...plotMapLayout, ...mapLayout }}
								className="my-6"
							/>
						);
					}
					return <Plot key={i} data={visualData} layout={plotMapLayout} className="my-6" />;
				})}
			</div>
		</div>
	);
};
