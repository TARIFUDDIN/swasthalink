// src/app/api/ai-symptoms/route.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { symptoms, language = "english" } = await request.json();
    
    // Use the updated model name
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `Act as a medical assistant for rural Indian patients. The user has described these symptoms: ${symptoms}

Please provide a comprehensive but easy-to-understand analysis in ${language} with the following structure:

1. **Possible Conditions**: List 2-3 most likely common conditions (but emphasize this is NOT a diagnosis)
2. **Immediate First Aid**: Practical advice for temporary relief
3. **Home Remedies**: Traditional, safe home remedies common in Indian households
4. **When to See a Doctor**: Clear red flags and when to seek immediate medical attention
5. **Prevention Tips**: How to avoid similar issues in future

IMPORTANT GUIDELINES:
- Use simple language suitable for people with limited medical knowledge
- Focus on practical advice that can be implemented in rural settings
- Mention if any symptoms could be serious and require urgent care
- Always emphasize that this is not a substitute for professional medical advice
- Include culturally appropriate examples and remedies
- Structure the response with clear headings and bullet points for readability

Format the response in HTML-like tags but without actual HTML:
<header>Health Advice</header>
<section>[content]</section>
<subsection>[subheading]</subsection>
<point>[bullet point]</point>
<warning>[important warning]</warning>
<doctor>[when to see doctor]</doctor>`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return NextResponse.json({ advice: text });
  } catch (error) {
    console.error('AI API Error:', error);
    return NextResponse.json(
      { error: "Failed to get symptom analysis. Please try again later." },
      { status: 500 }
    );
  }
}