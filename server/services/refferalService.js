import { Groq } from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export const generateReferralMessage = async ({ job, profile }) => {
  const prompt = `
You are an API that generates HIGH-QUALITY LinkedIn referral messages.

Return ONLY valid JSON.
Do NOT add explanations, headings, markdown, or extra text.

The JSON format must be exactly:
{
  "connectionMessage": "string",
  "referralMessage": "string"
}

RULES:
- connectionMessage must be professional, warm, and specific
- connectionMessage should be 2–3 sentences
- connectionMessage must NOT include resume link or job link
- referralMessage should be detailed and well-written (4–6 sentences)
- referralMessage MUST include the job link naturally
- referralMessage MAY include resume link
- Do NOT sound generic, robotic, or spammy
- Avoid vague phrases like "excited to connect" unless justified

STYLE GUIDANCE (IMPORTANT):

Example of a GOOD connection message:
"Hi John, I came across your profile while exploring backend opportunities at MongoDB. I’m a student developer working with Node.js and MongoDB, and I really liked your journey with the backend team. I’d love to connect and learn from your experience."

Example of a GOOD referral request message:
"Thanks for connecting, John. I recently came across the Backend Developer Intern opening at MongoDB and felt the role strongly aligns with my interests in backend development. I’ve been working with Node.js, Express, and MongoDB, and have built projects like a MERN-based internship tracker and a real-time chat application. After reviewing the job description, I felt my experience matched well with the responsibilities mentioned. If you’re open to it, I’d truly appreciate a referral for this role. Here’s the job link for reference: <job_link>. I’m also sharing my resume here in case it helps: <resume_link>."

Now generate messages in a SIMILAR tone and quality for the following applicant and job.

APPLICANT DETAILS:
Name: ${profile.firstName}
Career Objective: ${profile.careerObjective}
Skills: ${profile.skills}
Projects: ${profile.projects}
GitHub: ${profile.githubLink}
Resume Link: ${profile.resumeDriveLink}

JOB DETAILS:
Role: ${job.title}
Company: ${job.company}
Job Link: ${job.link}

JOB DESCRIPTION:
${job.descriptionHtml}

`;

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.4,
    max_completion_tokens: 500,
    top_p: 1,
    stream: false
  });

  const raw = completion.choices[0].message.content;

  return JSON.parse(raw);
};
