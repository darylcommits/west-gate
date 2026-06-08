import { supabase } from '../lib/supabase';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

// Fetch a summary of available properties to give the AI context
const getPropertyContext = async () => {
  try {
    const { data } = await supabase
      .from('properties')
      .select('name, price, price_label, property_type, status, city, province, bedrooms, bathrooms, lot_area, floor_area')
      .neq('status', 'off_market')
      .order('is_featured', { ascending: false })
      .limit(20);

    if (!data || data.length === 0) return 'No properties currently listed.';

    return data.map(p => {
      const price = p.price_label || (p.price > 0 ? `₱${(p.price / 1000000).toFixed(1)}M` : 'Contact for Price');
      const type = p.property_type?.replace(/_/g, ' ');
      const details = [
        p.bedrooms ? `${p.bedrooms} bed` : null,
        p.bathrooms ? `${p.bathrooms} bath` : null,
        p.lot_area ? `${p.lot_area} sqm lot` : null,
        p.floor_area ? `${p.floor_area} sqm floor` : null,
      ].filter(Boolean).join(', ');

      return `- ${p.name} | ${type} | ${price} | ${p.city}, ${p.province} | Status: ${p.status}${details ? ` | ${details}` : ''}`;
    }).join('\n');
  } catch {
    return 'Property data temporarily unavailable.';
  }
};

const SYSTEM_PROMPT = (propertyList) => `You are a friendly and professional real estate AI assistant for West Gate Realty Services, a trusted real estate agency based in Ilocos Norte, Philippines. Your name is "West AI".

Your role is to:
- Answer questions about West Gate Realty Services and the properties we offer
- Help visitors find the right property based on their needs
- Provide information about locations, property types, pricing, and features
- Guide users to contact us or book a viewing
- Answer general real estate questions in the Philippine context

Company Information:
- Name: West Gate Realty Services
- Location: Laoag City, Ilocos Norte, Philippines
- Tagline: "Turning Dreams to Reality"
- Services: Property sales, marketing, and transaction management across Ilocos Norte
- Contact: Visitors can use the Contact page to reach us

Current Available Properties:
${propertyList}

Guidelines:
- Be concise, warm, and professional
- Always encourage users to view our Properties page or Contact Us for more information
- If asked about something outside real estate or West Gate, politely redirect to our services
- Format prices in Philippine Peso (₱)
- If a specific property is not in the list above, say it may no longer be available and suggest checking our full listings
- Keep responses under 200 words unless a detailed answer is truly necessary`;

export const chatWithAI = async (messages) => {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;

  if (!apiKey || apiKey === 'your_groq_api_key_here') {
    throw new Error('Groq API key is not configured. Please add VITE_GROQ_API_KEY to your environment variables.');
  }

  const propertyList = await getPropertyContext();

  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama-3.1-8b-instant',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT(propertyList) },
        ...messages,
      ],
      temperature: 0.7,
      max_tokens: 400,
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error?.message || `Groq API error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || 'Sorry, I could not generate a response. Please try again.';
};
