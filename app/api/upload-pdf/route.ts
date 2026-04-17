import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { extractTextFromPDF } from "@/lib/pdf-parser";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const title = formData.get("title") as string | null;

    if (!file) {
      return Response.json({ error: "No file provided" }, { status: 400 });
    }

    if (file.type !== "application/pdf") {
      return Response.json({ error: "Only PDF files are accepted" }, { status: 400 });
    }

    // 10MB limit
    if (file.size > 10 * 1024 * 1024) {
      return Response.json({ error: "File too large (max 10MB)" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await extractTextFromPDF(buffer);

    if (!result.text || result.text.trim().length < 50) {
      return Response.json(
        { error: "Could not extract enough text from this PDF. Try a different file." },
        { status: 400 }
      );
    }

    return Response.json({
      text: result.text,
      title: title || result.info.title || file.name.replace(/\.pdf$/i, ""),
      numPages: result.numPages,
    });
  } catch (error) {
    console.error("PDF upload error:", error);
    return Response.json({ error: "Failed to process PDF" }, { status: 500 });
  }
}
