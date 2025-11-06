import { GoogleGenAI } from "@google/genai";

export const generateMatchSummary = async (playerName: string, timeAndDay: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return Promise.resolve(`Resumo indisponível. API Key não configurada. Mas a partida de ${playerName} (${timeAndDay}) promete ser lendária!`);
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `Crie um resumo divertido e épico para uma partida de futebol (pelada) agendada por ${playerName} para ${timeAndDay}. Use um tom de narrador esportivo empolgado. Fale sobre a expectativa para o jogo, os craques em campo e como o gramado aguarda ansiosamente por jogadas lendárias. Seja breve, criativo e motivador.`;
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return `Ocorreu um erro ao gerar o resumo da partida. Mas não se preocupe, o jogo de ${playerName} (${timeAndDay}) ainda será inesquecível!`;
  }
};
