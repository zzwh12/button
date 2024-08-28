export default class Button {
    constructor() {
      this.plugin = {
        name: "预估",
        dsc: "预估",
        priority: 101,
        rule: [
          {
            reg: '^#(原(神|石)|星(铁|琼))?(预估|盘点)$',
            fnc: 'buttonCenter'
          }
        ]
      }
    }
    async buttonCenter(e){
      const list = [
        [
          { label: '原石预估', callback: `/原石预估` },
          { label: '星琼预估', callback: `/星琼预估` },
        ]
      ]
      return Bot.Button(list)
    }
  }