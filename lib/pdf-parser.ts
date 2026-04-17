// eslint-disable-next-line @typescript-eslint/no-require-imports
const pdfParse = require("pdf-parse");

export interface PDFResult {
  text: string;
  numPages: number;
  info: {
    title?: string;
    author?: string;
  };
}

export async function extractTextFromPDF(buffer: Buffer): Promise<PDFResult> {
  const data = await pdfParse(buffer);

  return {
    text: data.text,
    numPages: data.numpages,
    info: {
      title: data.info?.Title || undefined,
      author: data.info?.Author || undefined,
    },
  };
}
