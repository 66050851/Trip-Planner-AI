export const DEFAULT_CHAT_MODEL = "gpt-4o-mini";

export const titleModel = {
  description: "Fast model for title generation",
  id: "gpt-4o-mini",
  name: "GPT-4o Mini",
  provider: "openai",
};

export type ModelCapabilities = {
  tools: boolean;
  vision: boolean;
  reasoning: boolean;
};

export type ChatModel = {
  id: string;
  name: string;
  provider: string;
  description: string;
  gatewayOrder?: string[];
  reasoningEffort?: "none" | "minimal" | "low" | "medium" | "high";
};

export const chatModels: ChatModel[] = [
  {
    description: "Fast and intelligent model for daily tasks",
    id: "gpt-4o-mini",
    name: "GPT-4o Mini",
    provider: "openai",
  },
  {
    description: "Flagship high-intelligence model",
    id: "gpt-4o",
    name: "GPT-4o",
    provider: "openai",
  },
];

export async function getCapabilities(): Promise<
  Record
> {
  return {
    "gpt-4o-mini": { reasoning: false, tools: true, vision: true },
    "gpt-4o": { reasoning: false, tools: true, vision: true },
  };
}

export const isDemo = process.env.IS_DEMO === "1";

type GatewayModel = {
  id: string;
  name: string;
  type?: string;
  tags?: string[];
};

export type GatewayModelWithCapabilities = ChatModel & {
  capabilities: ModelCapabilities;
};

export async function getAllGatewayModels(): Promise<
  GatewayModelWithCapabilities[]
> {
  return chatModels.map((m) => ({
    ...m,
    capabilities: { reasoning: false, tools: true, vision: true },
  }));
}

export function getActiveModels(): ChatModel[] {
  return chatModels;
}

export const allowedModelIds = new Set(chatModels.map((m) => m.id));

export const modelsByProvider = chatModels.reduce(
  (acc, model) => {
    if (!acc[model.provider]) {
      acc[model.provider] = [];
    }
    acc[model.provider].push(model);
    return acc;
  },
  {} as Record
);

export type ModelAvailability = "healthy" | "impacted" | "unknown";

export async function getModelAvailability(
  modelId: string
): Promise {
  return "healthy";
}