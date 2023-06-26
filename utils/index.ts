import { Message, OpenAIModel } from "@/types";
import { createParser, ParsedEvent, ReconnectInterval } from "eventsource-parser";

export const OpenAIStream = async (messages: Message[]) => {
	const encoder = new TextEncoder();
	const decoder = new TextDecoder();

	const res = await fetch("https://api.openai.com/v1/chat/completions", {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
		},
		method: "POST",
		body: JSON.stringify({
			model: OpenAIModel.DAVINCI_TURBO,
			messages: [
				{
					role: "system",
					content: `You are a helpful, friendly, assistant.`,
				},
				...messages,
			],
			max_tokens: 800,
			temperature: 0.0,
			stream: true,
		}),
	});

	if (res.status !== 200) {
		throw new Error("OpenAI API returned an error");
	}

	const stream = new ReadableStream({
		async start(controller) {
			const onParse = (event: ParsedEvent | ReconnectInterval) => {
				if (event.type === "event") {
					const data = event.data;

					if (data === "[DONE]") {
						controller.close();
						return;
					}

					try {
						const json = JSON.parse(data);
						const text = json.choices[0].delta.content;
						const queue = encoder.encode(text);
						controller.enqueue(queue);
					} catch (e) {
						controller.error(e);
					}
				}
			};

			const parser = createParser(onParse);

			for await (const chunk of res.body as any) {
				parser.feed(decoder.decode(chunk));
			}
		},
	});

	return stream;
};

export const mockVisualizations = {
	type: "scattermapbox",
	lat: [37.7749, 34.0522, 40.7128],
	lon: [-122.4194, -118.2437, -74.006],
	mode: "markers",
	marker: {
		size: 10,
		color: "rgb(255, 0, 0)",
	},

	type: "table",
	header: {
		values: [["<b>City</b>"], ["<b>Population</b>"]],
		align: ["center"],
		line: { width: 1, color: "black" },
		fill: { color: "grey" },
		font: { family: "Arial", size: 12, color: "white" },
	},
	cells: {
		values: [
			["San Francisco", "Los Angeles", "New York City"],
			[883305, 3977683, 8537673],
		],
		align: ["center"],
		line: { color: "black", width: 1 },
		font: { family: "Arial", size: 11, color: ["black"] },
	},
	type: "pie",
	labels: ["Apple", "Orange", "Banana"],
	values: [40, 30, 20],
};

export const defaultText = `Hi there! I'm Chatbot UI, an AI assistant. I can help you with things like answering questions, providing information, and helping with tasks. How can I help you?`;

export const mockResponseData = {
	visualizations: [
		[
			{
				type: "scattermapbox",
				lat: [37.7749, 34.0522, 40.7128],
				lon: [-122.4194, -118.2437, -74.006],
				mode: "markers",
				marker: {
					size: 10,
					color: "rgb(255, 0, 0)",
				},
			},
		],
		[
			{
				type: "table",
				header: {
					values: [["<b>City</b>"], ["<b>Population</b>"]],
					align: ["center"],
					line: { width: 1, color: "black" },
					fill: { color: "grey" },
					font: { family: "Arial", size: 12, color: "white" },
				},
				cells: {
					values: [
						["San Francisco", "Los Angeles", "New York City"],
						[883305, 3977683, 8537673],
					],
					align: ["center"],
					line: { color: "black", width: 1 },
					font: { family: "Arial", size: 11, color: ["black"] },
				},
			},
		],
		[
			{
				type: "pie",
				labels: ["Apple", "Orange", "Banana"],
				values: [40, 30, 20],
			},
		],
	],
	text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut aliquam sollicitudin magna at ultricies. Fusce maximus, nunc id eleifend accumsan, magna tellus lacinia urna, in tincidunt mauris nulla sit amet tellus. Integer tincidunt ipsum non nunc interdum facilisis.",
};
