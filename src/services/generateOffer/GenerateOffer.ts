import prismaClient from "@/lib/prismaClient";
import OpenAI from "openai";

export class GenerateOffer {
  async Start(id: bigint) {
    try {
      const { source, summary } = await prismaClient.job.findUniqueOrThrow({
        where: {
          id,
        },
        select: {
          source: true,
          summary: true,
        },
      });

      const prompts = await prismaClient.prompt.findMany({
        where: {
          source,
        },
        orderBy: {
          order: "asc",
        },
        select: {
          content: true,
        },
      });

      const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] =
        prompts.map((x) => {
          return {
            content: x.content,
            role: "system",
          };
        });

      messages.push({
        content: summary,
        role: "user",
      });

      const response = await new OpenAI().chat.completions.create({
        messages,
        model: process.env.OPENAI_API_MODEL ?? 'gpt-5'
      });

      if (!response.choices[0].message.content)
        throw new Error("response.choices[0].message.content is null.");

      await prismaClient.job.update({
        where: {
          id,
        },
        data: {
          offer: response.choices[0].message.content,
        },
      });
    } catch (error) {
      console.error(
        error instanceof Error ? error.message : "Coś poszło nie tak..."
      );
    }
  }
}
