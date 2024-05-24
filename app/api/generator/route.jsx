import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI(process.env.ABC);
export async function POST(req) {
  const { description } = await req.json();

  console.log("hdaskjdhsakjdhsajkdhasjhdkjashdk : ", description);
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: getPrompt(description) }],
    model: "gpt-3.5-turbo",
    temperature: 0.9,
  });

  console.log(completion.choices[0].message.content);
  let res = completion.choices[0].message.content;
  return NextResponse.json(res);
}



const getPrompt = (description) => {
  return `Please fill all the fields following the profession: ${description}, suggest a career objective for the about me section for this profession, list of most relevant skills(one word each, max 6) for this profession, list of suitable tasks(one phrase per task max, 5) for this profession, job experience(max 3) for this profession and education(max3) for this profession, in a json object. You have to return only a JSON object. Below is the expected JSON format:
  {
    "objective": "",
    "skills": [],
    "tasks": [],
    "experience:": [{role,company,date}],
    "education:": [{course,school,date}],
  }



  profession: ${description}
  ps: ALL FIELDS ARE REQUIRED (role,company,date,course,school,date, etc included)
  `;
};
// const getPrompt = (profession) => {
  // return `You're a CV generator, someone who wants to create a CV it's giving you a profession. So for the description below, suggest a career objective for the about me section, list of most relevant skills(max 6), list of suitable tasks(one phrase per task max, 5), job experience(max 3) and education(max3) in a json object. You have to return only a JSON object. Below is the expected JSON format:
  // {
    // "objective": "",
    // "skills": [],
    // "tasks": [],
    // "experience:": [{role,company,date}],
    // "education:": [{course,school,date}],
  // }

  // Below its an example of what the object would look like but remember to use the description provided:
  // {
    // objective: string,
    // experience: [
        // {
            // role: string,
            // company: string,
            // date: '2023-Present',
        // },
        // {
            // role: string,
            // company: string,
            // date: '2022-Present',
        // },
        // {
            // role: string,
            // company: string,
            // date: '2021-Present',
        // },
    // ],
    // skills: [
        // string, string, string, string, string, string,
    // ],
    // education: [
        // {
            // course: string,
            // school: string,
            // date: '2023-Present',
        // },
        // {
            // course: string,
            // school: string,
            // date: '2019-2024',
        // },
        // {
            // course: string,
            // school: string,
            // date: '2016-2019',
        // },
    // ],
    // tasks: [
      // 'string', 'string', 'string', 'string', 'string'
    // ],
  // }

  // profession: ${profession}
  // ps: REMEMBER TO USE the profession provided, and if you don't know the answer, just put an empty string, all fields REQUIRED.
  // ps2: Don't do IT fields, do specfically the field of the profession that is given to you
  // `;
// };
