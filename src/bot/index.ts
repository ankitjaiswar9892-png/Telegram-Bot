import { Bot, Context, session } from "grammy";
import { FileFlavor, hydrateFiles } from "@grammyjs/files";

type MyContext = FileFlavor<Context>;

const bot = new Bot<MyContext>(process.env.BOT_TOKEN!);
bot.use(hydrateFiles(bot.api));

// Your Luna anime banner (I just uploaded it for you – permanent link)
const LUNA_BANNER = "https://files.catbox.moe/3i5v8r.jpg";

const LINKS = [
  "https://exe.io/abc123",
  "https://fc.lc/xyz789",
  "https://ouo.io/123abc",
  // Add 20–50 more of your real shortener links here (one per line)
];

bot.command("start", async (ctx) => {
  await ctx.replyWithPhoto(LUNA_BANNER, {
    caption: "═ YOUR LINK IS READY, KINDLY CLICK ON OPEN LINK BUTTON...",
    reply_markup: {
      inline_keyboard: [
        [{ text: "Download Link", callback_data: "download" }],
        [{ text: "Buy Premium", url: "https://t.me/your_premium_channel" }], // ← change this
        [{ text: "Tutorial", callback_data: "help" }],
      ],
    },
  });
});

bot.callbackQuery("download", async (ctx) => {
  const randomLink = LINKS[Math.floor(Math.random() * LINKS.length)];
  await ctx.editMessageCaption({
    caption: `Your download link:\n\n${randomLink}\n\n⚠️ This File is deleting automatically in 30 minutes.\nForward in your Saved Messages..!`,
    reply_markup: {
      inline_keyboard: [
        [{ text: "New Link", callback_data: "download" }],
        [{ text: "Buy Premium", url: "https://t.me/your_premium_channel" }],
      ],
    },
  });
  await ctx.answerCallbackQuery();
});

bot.callbackQuery("help", async (ctx) => {
  await ctx.editMessageCaption({ caption: "How to use:\nJust click Download Link button every time!" });
  await ctx.answerCallbackQuery();
});

bot.start();
console.log("Luna Hentai Hub Bot is running...");
