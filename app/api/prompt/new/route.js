import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const POST = async (req) => {
  const { userId, prompt, tag } = await req.json();

  try {
    await connectToDB();

    const saved_prompt = await Prompt.create({
      creator: userId,
      tag,
      prompt,
    });

    return new Response(JSON.stringify(saved_prompt), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
