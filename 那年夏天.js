/*/自行【#添加全局那年夏天】
文本：
记忆中的回忆
/*/
export default class Button {
    constructor() {
      this.plugin = {
        name: "那年夏天",
        dsc: "记忆中的回忆",
        priority: 95,
        rule: [
          {
            reg: '^#*那年夏天$',
            fnc: 'buttonCenter'
          }
        ]
      }
    }
    async buttonCenter(e){
      const list = [
        [
          { label: '小电视' , link: 'https://wxurl.cn/36C'},
          { label: '小掌机' , link: 'https://wxurl.cn/U0T'},
          { label: '小霸王' , link: 'http://yx.1dly.cn/'},
        ]
      ]
      return Bot.Button(list)
    }
  }