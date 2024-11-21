import {
  createBot,
  createProvider,
  createFlow,
  MemoryDB,
} from "@builderbot/bot";
import { BaileysProvider } from "@builderbot/provider-baileys";
import z from "zod";

const bodySchemaMessage = z.object({
  number: z.string().min(9),
  message: z.string().min(4),
});

const main = async () => {
  const adapterDB = new MemoryDB();
  const adapterFlow = createFlow([]);
  const adapterProvider = createProvider(BaileysProvider);

  const { handleCtx, httpServer } = await createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });

  httpServer(4500);

  adapterProvider.server.post(
    "/v1/messages",
    handleCtx(async (bot, req, res) => {
      const { number, message } = req.body;

      //   const { success, error } = bodySchemaMessage.safeParse({
      //     number,
      //     message,
      //   });
      //   if (success) {
      //     res.json({ errors: error.errors });
      //   }

      await bot.sendMessage(number, message, {});
      return res.end("send");
    })
  );
};

main();
