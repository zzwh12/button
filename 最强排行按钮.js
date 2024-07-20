export default class Button {
    constructor() {
      this.plugin = {
        name: "最强排行",
        dsc: "最强排行",
        priority: 100,
        rule: [
          {
            reg: '^#最强排行$',
            fnc: 'buttonCenter'
          },
          {
            reg: '^#最高分排行$',
            fnc: 'buttonCenter'
          }
        ]
      }
    }
    async buttonCenter(e){
      const game = (e.game === 'sr' || e.isSr) ? '星铁' : ''
      let role = (e.msg, game)
    if (!role) {
      if (e.msg.match(/#(最强|最高分)(面板|排行)/)) {
        role = ''
      } else return false
    }
      const list = [
        [
        { label: '最强排行', callback: `/最强排行` },
        { label: '最高分排行', callback: `/最高分排行` },
        ],[
        { label: '更新面板', callback: `/${game}更新面板` },
        { label: '极限面板', callback: `/${e.game === 'sr' ? '星铁' : '原神'}${role}极限面板`, },
        ]
      ]
      return Bot.Button(list)
    }
  }