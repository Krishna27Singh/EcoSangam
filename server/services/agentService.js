import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanMessage } from "langchain/schema";
import nodemailer from "nodemailer";

const llm = new ChatOpenAI({ temperature: 0.3 });

export const forwardToGovt = async (report) => {
  const message = new HumanMessage(
    `You are an AI that drafts environmental violation summaries for officials.
    
    Generate a formal message for the Ministry of Environment and CPCB based on:
    - Name: ${report.name}
    - Email: ${report.email}
    - Location: ${report.location}
    - Description: ${report.description}
    `
  );

  const response = await llm.call([message]);

  const outputText = response.text;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "info-moef@gov.in, info@cpcb.nic.in",
    subject: `Environmental Report by ${report.name}`,
    text: outputText,
  };

  await transporter.sendMail(mailOptions);
};
