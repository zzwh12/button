export default class Button {
    constructor() {
      this.plugin = {
        name: "星铁深渊按钮",
        dsc: "星铁深渊按钮",
        priority: 101,
        rule: [
            {
              reg: '^#?(星铁)?(深渊|忘却(之庭)?|(混沌)?回忆)',
              fnc: 'buttonCenter'
            },
            {
              reg: '^#?(星铁)?(模拟宇宙|宇宙|模拟)',
              fnc: 'buttonCenter'
            },
            {
              reg: '^#?(星铁)?(虚构叙事|构事|狗屎|虚构|虚狗|叙事)',
              fnc: 'buttonCenter'
            },
            {
              reg: '^#?(星铁)?上期(深渊|忘却(之庭)?|(混沌)?回忆)',
              fnc: 'buttonCenter'
            }
        ]
      }
    }
    async buttonCenter(e){
      const game = (e.game === 'sr' || e.isSr) ? '星铁' : ''
      const list = [
        [
          { label: '忘却之庭', callback: `/${game}忘却之庭` },
          { label: '模拟宇宙', callback: `/${game}模拟宇宙` },
        ],[
          { label: '虚构叙事', callback: `/${game}虚构叙事` },
          { label: '上期深渊', callback: `/${game}上期深渊` },
        ],[
          { label: '扫码绑定', callback: `/扫码绑定` },
          { label: '刷新CK', callback: `/刷新ck` },
        ]
      ]
      return Bot.Button(list)
    }
  }