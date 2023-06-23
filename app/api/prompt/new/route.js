import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req) => {
  try {
    const { userID, prompt, tag } = await req.json();
    await connectToDB();
    const newPrompt = new Prompt({
      creator: userID,
      tag,
      prompt,
    });

    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (err) {
    console.log(err);
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
