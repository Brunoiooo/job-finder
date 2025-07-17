import prismaClient from "@/lib/prismaClient";
import OpenAI from "openai";
import { schema } from "./schema";

export class IgnoreOffer {
  constructor(private readonly id: bigint) {}

  async Start() {
    try {
      const { summary } = await prismaClient.job.findUniqueOrThrow({
        where: {
          id: this.id,
        },
        select: {
          summary: true,
        },
      });

      const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = (
        await prismaClient.ignorePrompt.findMany({
          orderBy: {
            order: "asc",
          },
          select: {
            content: true,
          },
        })
      ).map((x) => {
        return {
          content: x.content,
          role: "system",
        };
      });

      messages.push({
        role: "user",
        content: summary,
      });

      const response = await new OpenAI().chat.completions.create({
        tools: schema,
        tool_choice: {
          type: "function",
          function: { name: "ocen_oferte_freelance" },
        },
        messages,
        model: process.env.OPENAI_API_MODEL ?? "gpt-3.5-turbo",
      });

      console.log(
        JSON.parse(
          response.choices[0]?.message?.tool_calls?.[0].function.arguments ?? ""
        )
      );

      const _arguments =
        response.choices[0]?.message?.tool_calls?.[0].function.arguments;
      if (!_arguments) throw new Error("Wrond response.");

      const json = JSON.parse(_arguments).isWorthy;
      if (json === false)
        await prismaClient.job.update({
          where: {
            id: this.id,
          },
          data: {
            ignored: true,
          },
        });
    } catch (error) {
      console.error(
        error instanceof Error ? error.message : "Coś poszło nie tak..."
      );
    }
  }
}
