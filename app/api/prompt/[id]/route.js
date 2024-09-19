import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(params.id).populate("creator");

    if (!prompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error fetching the prompts", { status: 500 });
  }
};

export const PATCH = async (req, { params }) => {
  try {
    const { prompt, tag } = await req.json();

    await connectToDB();

    const update_prompt = await Prompt.findOneAndUpdate(
      { _id: params.id },
      { $set: { prompt, tag } },
      { new: true }
    ).populate("creator");

    if (!update_prompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    return new Response("Prompt Updated Successfully", { status: 200 });
  } catch (error) {
    return new Response("Error updating the prompt", { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();

    await Prompt.findByIdAndDelete(params.id);

    return new Response("Prompt Deleted Successfully", { status: 200 });
  } catch (error) {
    return new Response("Error deleting the prompt", { status: 500 });
  }
};
