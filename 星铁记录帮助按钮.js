/*/自行【#添加全局*记录帮助】或【#添加全局/星铁记录帮助】
文本：
星穹铁道抽卡记录链接获取教程

方法一：

需要下载软件操作，手机端比较麻烦

方法二：

手机端简单，通过网页云星铁获取，但需要你云星铁有免费时长或畅玩卡

把获取到的链接艾特QQbot一同发送即可】
/*/
export default class Button {
    constructor() {
      this.plugin = {
        name: "星铁记录帮助",
        dsc: "星铁记录帮助",
        priority: 90,
        rule: [
          {
            reg: '^#*星铁记录帮助$',
            fnc: 'buttonCenter'
          }
        ]
      }
    }
    async buttonCenter(e){
      const list = [
        [
          { label: '方法一' , link: 'https://mp.weixin.qq.com/s/FFHTor5DiG3W_rfQVs3KJQ'},
          { label: '方法二' , link: 'https://docs.qq.com/doc/DWmhNd1lubXdET0dM'},
        ]
      ]
      return Bot.Button(list)
    }
  }