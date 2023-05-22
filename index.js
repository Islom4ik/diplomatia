const { Telegraf } = require('telegraf');
require('dotenv').config()
const bot = new Telegraf(process.env.BOT_TOKEN);
bot.telegram.setWebhook(`https://diplomatia-production.up.railway.app`, {max_connections: 50});


bot.start(async ctx => {
    try {
        console.log(ctx);
        await ctx.reply('Мой функционал работает только в группе "ДИПЛОМАТИЯ"')
    } catch (e) {
        console.error(e);
    }
});

bot.help(async ctx => {
    try {
        console.log(ctx);
        await ctx.reply('Мой функционал работает только в группе "ДИПЛОМАТИЯ"')
    } catch (e) {
        console.error(e);
    }
});


bot.on("channel_post", async ctx => {
    try {
        if(ctx.update.channel_post.chat.id == -1001588629410 || ctx.update.channel_post.chat.id == -1001974175255) {
            if(ctx.update.channel_post.audio) {
                await ctx.deleteMessage(ctx.update.channel_post.message_id)
                if(ctx.update.channel_post.audio.length > 1) {
                    for (let i = 0; i < ctx.update.channel_post.audio.length; i++) {
                        try {
                            if(i.thumbnail) {
                                await ctx.replyWithAudio(i.file_id)
                            }else {
                                const audiolink = await ctx.tg.getFileLink(i.file_id)
                                if(i.performer) {
                                    await ctx.replyWithAudio({url: audiolink.href}, {title: i.title, performer: i.performer, thumb: {source: './mainava.jpg'}})
                                }else if(!i.performer && !i.title){
                                    await ctx.replyWithAudio({url: audiolink.href}, {title: i.file_name, performer: 'Дипломатия', thumb: {source: './mainava.jpg'}})
                                }else {
                                    await ctx.replyWithAudio({url: audiolink.href}, {title: i.title, performer: 'Дипломатия', thumb: {source: './mainava.jpg'}})
                                }
                            } 
                        } catch (e) {
                            console.error(e);
                        }
                    }
                }else {
                    if(ctx.update.channel_post.audio.thumbnail) {
                        await ctx.replyWithAudio(ctx.update.channel_post.audio.file_id)
                    }else {
                        const audiolink = await ctx.tg.getFileLink(ctx.update.channel_post.audio.file_id)
                        if(ctx.update.channel_post.audio.performer) {
                            await ctx.replyWithAudio({url: audiolink.href}, {title: ctx.update.channel_post.audio.title, performer: ctx.update.channel_post.audio.performer, thumb: {source: './mainava.jpg'}})
                        }else if(!ctx.update.channel_post.audio.performer && !ctx.update.channel_post.audio.title){
                            await ctx.replyWithAudio({url: audiolink.href}, {title: ctx.update.channel_post.audio.file_name, performer: 'Дипломатия', thumb: {source: './mainava.jpg'}})
                        }else {
                            await ctx.replyWithAudio({url: audiolink.href}, {title: ctx.update.channel_post.audio.title, performer: 'Дипломатия', thumb: {source: './mainava.jpg'}})
                        }
                    }
                }
                
            }
        }
    } catch (e) {
       console.error(e); 
    }
})

bot.startWebhook('/', null, 3000);

// bot.launch({dropPendingUpdates: true});
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));