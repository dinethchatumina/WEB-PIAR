 Copyright (C) 2022.
 Licensed under the  GPL-3.0 License;
 You may not use this file except in compliance with the License.
 It is supplied in the hope that it may be useful.
 * @project_name : Secktor-Md
 * @author : @samapndey001 <https://github.com/SamPandey001>
 * @description : Secktor,A Multi-functional whatsapp bot.
 * @version 0.0.6
 **/

 const { cmd, parseJid,getAdmin,tlang } = require("../lib/");
 const eco = require('discord-mongoose-economy')
 const ty = eco.connect(mongodb);
cmd(
  {
    pattern: "deltic",
    desc: "deletes TicTacToe running session.",
    filename: __filename,
    category: "game",
  },
  async (Void,citel,text,{isCreator}) => {
        if (!citel.isGroup) return citel.reply(tlang().group);
        const groupMetadata = citel.isGroup ? await Void.groupMetadata(citel.chat).catch((e) => {}) : "";
        const participants = citel.isGroup ? await groupMetadata.participants : "";
        const groupAdmins = await getAdmin(Void, citel)
        const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
        if(!isAdmins && !isCreator) return citel.reply('This command is only for Group Admin and my owner.')
         this.game = this.game ? this.game : false
         if (
        Object.values(this.game).find(
          (room) =>
            room.id.startsWith("tictactoe")
        )
      ) {
        delete this.game
        return citel.reply(`_Successfully Deleted running TicTacToe game._`);
        } else {
              return citel.reply(`there No TicTacToe game👾 is running.`)
                    
        }
  })
  
