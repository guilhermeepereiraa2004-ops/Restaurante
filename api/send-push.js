export default async function handler(req, res) {
  // Apenas aceita método POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  const appId = process.env.VITE_ONESIGNAL_APP_ID;
  const restApiKey = process.env.VITE_ONESIGNAL_REST_API_KEY;

  if (!appId || !restApiKey) {
    return res.status(500).json({ error: 'Configuração do OneSignal incompleta nas variáveis de ambiente do servidor.' });
  }

  const { headings, contents, role, subscriptionIds } = req.body;

  const payload = {
    app_id: appId,
    headings: { en: headings, pt: headings },
    contents: { en: contents, pt: contents },
  };

  // Filtrar destinatários
  if (subscriptionIds && subscriptionIds.length > 0) {
    payload.include_subscription_ids = subscriptionIds;
  } else if (role) {
    payload.filters = [
      { field: "tag", key: "role", relation: "=", value: role }
    ];
  } else {
    payload.included_segments = ["All"];
  }

  try {
    const response = await fetch("https://onesignal.com/api/v1/notifications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${restApiKey}`
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: result.errors || 'Erro ao enviar notificação no OneSignal.' });
    }

    return res.status(200).json({ success: true, result });
  } catch (err) {
    console.error("Erro no envio do push serverless:", err);
    return res.status(500).json({ error: err.message });
  }
}
