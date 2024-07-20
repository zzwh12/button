export default class Button {
    constructor () {
      this.plugin = {
        name: 'zzz-plugin',
        dsc: 'zzz-plugin',
        priority: 100,
        rule: [
          {
            reg: /^#?(%|％|绝区零|绝区)(.+)面板$/,
            fnc: 'refreshPanel'
          },
          {
            reg: /^#?(%|％|绝区零|绝区)((刷新|更新)面板|面板(刷新|更新))$/,
            fnc: 'refreshPanel'
          },
          {
            reg: /^#?(%|％|绝区零|绝区)面板(列表)?$/,
            fnc: 'refreshPanel',
          }
        ]
      }
    }
    
  refreshPanel(){
    const button = [
      { label: '更新面板', callback: `/绝区零更新面板` },
      { label: '绑定UID', data: `/绝区零绑定` },
      { label: '扫码绑定', callback: `/扫码绑定` },
    ]
    return Bot.Button(button)
  }
}