import { sendEmail, SendEmailProps } from "@/lib/email.utils";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const reqData = (await req.json()) as SendEmailProps;

    const result = await sendEmail({ ...reqData });

    return Response.json({
      accepted: result.accepted,
    });
  } catch (err) {
    console.error(err);
    return Response.json(
      { message: "Unable to send Mail" },
      {
        statusText: "Internal Server Error",
        status: 500,
      },
    );
  }
}
