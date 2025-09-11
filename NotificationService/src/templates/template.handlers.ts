import fs from "fs/promises";
import path from "path";
import Handlebars from "handlebars";
import { InternalServerError } from "../utils/app.error";

export async function renderMailTemplate(
  templateId: string,
  params: Record<string, any>
): Promise<string> {
  const templatePath = path.join(__dirname, "mailers", `${templateId}.hbs`);
  try {
    const content = await fs.readFile(templatePath, "utf8");
    const finalTemplate = Handlebars.compile(content);
    return finalTemplate(params);
  } catch (err) {
    throw new InternalServerError(`${templateId},template not found!`);
  }
}
