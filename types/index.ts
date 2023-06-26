export enum OpenAIModel {
	DAVINCI_TURBO = "gpt-3.5-turbo",
}

export interface Message {
	role: Role;
	content: { text: String; visualizations: [] };
}

export type Role = "assistant" | "user";
