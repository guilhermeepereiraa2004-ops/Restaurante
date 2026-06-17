import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Middleware de desenvolvimento para simular a endpoint /api/send-push do Vercel
const apiDevPlugin = (env) => ({
  name: 'api-dev-plugin',
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      if (req.url === '/api/send-push' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
          body += chunk;
        });
        req.on('end', async () => {
          try {
            const parsedBody = JSON.parse(body);
            const appId = env.VITE_ONESIGNAL_APP_ID;
            const restApiKey = env.VITE_ONESIGNAL_REST_API_KEY;

            if (!appId || !restApiKey) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Configuração do OneSignal incompleta no ambiente de desenvolvimento local.' }));
              return;
            }

            const { headings, contents, role, subscriptionIds } = parsedBody;

            const payload = {
              app_id: appId,
              headings: { en: headings, pt: headings },
              contents: { en: contents, pt: contents },
            };

            if (subscriptionIds && subscriptionIds.length > 0) {
              payload.include_subscription_ids = subscriptionIds;
            } else if (role) {
              payload.filters = [
                { field: "tag", key: "role", relation: "=", value: role }
              ];
            } else {
              payload.included_segments = ["All"];
            }

            const response = await fetch("https://onesignal.com/api/v1/notifications", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Basic ${restApiKey}`
              },
              body: JSON.stringify(payload)
            });

            const result = await response.json();

            res.statusCode = response.status;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(result));
          } catch (e) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: e.message }));
          }
        });
      } else {
        next();
      }
    });
  }
});

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      react(),
      tailwindcss(),
      apiDevPlugin(env)
    ],
  };
});

