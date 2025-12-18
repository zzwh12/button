export default class Button {
    constructor() {
      this.plugin = {
        name: "星铁深渊按钮",
        dsc: "星铁深渊按钮",
        priority: 101,
        rule: [
            {
              reg: '^#?星铁[上周|上期|往期|本期]*(深渊|忘却(之庭)?|(混沌)?回忆)[ |0-9]*$',
              fnc: 'srbutton'
            },
            {
              reg: '^#?星铁[上周|上期|往期|本期]*(模拟宇宙|宇宙|模拟)[ |0-9]*$',
              fnc: 'srbutton'
            },
            {
              reg: '^#?星铁[上周|上期|往期|本期]*(虚构叙事|构事|狗屎|虚构|虚狗|叙事)[ |0-9]*$',
              fnc: 'srbutton'
            },
            {
              reg: '^#?星铁[上周|上期|往期|本期]*(差分(宇宙)*|(差分(宇宙)*)*(周期|常规)演算)[ |0-9]*$',
              fnc: 'srbutton'
            },
            {
              reg: '^#?星铁(货币战争|货币|战争)[ |0-9]*$',
              fnc: 'srbutton'
            },
            {
              reg: '^#?星铁[上期|往期|本期]*(异相仲裁|异相|仲裁|异向|异向仲裁)[上期|往期|本期]*[ |0-9]*$',
              fnc: 'srbutton'
            }
        ]
      }
    }
    async srbutton(e){
      const game = (e.game === 'sr' || e.isSr) ? '星铁' : ''
      const list = [
        [
          { label: '忘却之庭', callback: `/${game}忘却之庭` },
          { label: '模拟宇宙', callback: `/${game}模拟宇宙` },
        ],[
          { label: '虚构叙事', callback: `/${game}虚构叙事` },
          { label: '差分宇宙', callback: `/${game}差分宇宙` },
        ],[
          { label: '货币战争', callback: `/${game}货币战争` },
          { label: '异相仲裁', callback: `/${game}异相仲裁` },
        ],[
          { label: '扫码绑定', callback: `/扫码绑定` },
          { label: '刷新CK', callback: `/刷新ck` },
        ]
      ]
      return Bot.Button(list)
    }
  }