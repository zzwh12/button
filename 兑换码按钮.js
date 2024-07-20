export default class Button {
    constructor() {
      this.plugin = {
        name: "兑换码",
        dsc: "兑换码",
        priority: 100,
        rule: [
          {
            reg: /^(#|\*)?(原神|星铁|崩铁|崩三|崩坏三|崩坏3)?(直播|前瞻)?兑换码$/,
            fnc: 'buttonCenter'
          }
        ]
      }
    }
    async buttonCenter(e){
      const list = [
        [
          { label: '原神兑换码', callback: `/原神兑换码` },
          { label: '星铁兑换码', callback: `/星铁兑换码` },
        ]
    ]
    return Bot.Button(list)
  }
}