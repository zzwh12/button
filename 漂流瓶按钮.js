export default class Button {
    constructor() {
      this.plugin = {
        name: "漂流瓶",
        dsc: "漂流瓶",
        priority: 100,
        rule: [
            {
                reg: '^#?(扔|丢)漂流瓶(.*)$',
                fnc: 'buttonCenter'
            },
            {
                reg: '^#?(捡|捞)?漂流瓶$',
                fnc: 'buttonCenter'
            }
        ]
      }
    }
    async buttonCenter(e){
      const list = [
        [
          { label: '丢漂流瓶', data: '/丢漂流瓶' },
          { label: '捞漂流瓶', callback: `/捞漂流瓶` },
        ]
      ]
      return Bot.Button(list)
    }
  }