import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: AI VIP Concierge Assistant
  app.post('/api/concierge', async (req, res) => {
    try {
      const { prompt } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
        const ai = new GoogleGenAI({ apiKey });
        const systemInstruction = `
Eres Concierge VIP de AeroGuard, la plataforma de seguridad ejecutiva y concierge para el Sr. Marco Valerio, ejecutivo VIP.
Tu tono es impecablemente profesional, discreto, elegante, servicial y enfocado en la seguridad y el confort del usuario.
Responde siempre en español.
Mantén las respuestas concisas (2 a 4 oraciones) y menciona aspectos de logística, escolta blindada o confirmación cuando sea relevante.
`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            systemInstruction,
            temperature: 0.7,
          },
        });

        const reply = response.text || 'Entendido, Sr. Valerio. He notificado al equipo de logística táctica para atender su solicitud de inmediato.';
        return res.json({ reply });
      }

      // Fallback response if GEMINI_API_KEY is not supplied
      let fallbackReply = `Buenas noches, Sr. Valerio. He recibido su instrucción sobre "${prompt}". He ajustado el itinerario y notificado al equipo de escolta blindada en Nueva York.`;
      if (prompt.toLowerCase().includes('vuelo') || prompt.toLowerCase().includes('cambiar')) {
        fallbackReply = 'Con gusto, Sr. Valerio. He coordinado con la aerolínea en la Terminal FBO para reagendar su asiento en First Class sin penalizaciones. La ruta táctica se ha actualizado.';
      } else if (prompt.toLowerCase().includes('reserva') || prompt.toLowerCase().includes('restaurante') || prompt.toLowerCase().includes('mesa')) {
        fallbackReply = 'Su reserva VIP ha sido procesada con éxito. El restaurant dispone de salón privado con entrada discreta y escolta en perímetro.';
      }

      return res.json({ reply: fallbackReply });
    } catch (err: any) {
      console.error('Error in concierge API:', err);
      return res.json({
        reply: 'Entendido, Sr. Valerio. He notificado a su asistente personal y al equipo de seguridad táctica para coordinar la solicitud.',
      });
    }
  });

  // Health check endpoint
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'AeroGuard VIP' });
  });

  // Vite middleware in development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`AeroGuard VIP Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
