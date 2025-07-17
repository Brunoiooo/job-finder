import { ChatCompletionTool } from "openai/resources";

export const schema: Array<ChatCompletionTool> = [
  {
    type: "function",
    function: {
      name: "ocen_oferte_freelance",
      description:
        "Zwraca true, jeśli oferta jest godna uwagi, false jeśli powinna być odrzucona",
      parameters: {
        type: "object",
        properties: {
          isWorthy: {
            type: "boolean",
            description: "Czy oferta jest godna uwagi?",
          },
        },
        required: ["isWorthy"],
      },
    },
  },
];
