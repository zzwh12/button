export default class Button {
    constructor() {
      this.plugin = {
        name: "获取小助手记录",
        dsc: "获取小助手记录",
        priority: 100,
        rule: [
            {
              reg: '^#?(获取|更新)(提瓦特)?小助手(抽卡|祈愿)?(记录|历史)( *|"+NEWLINE+"*)(https.*)?',
              fnc: 'buttonCenter'
            }
        ]
      }
    }
    async buttonCenter(e){
      const list = [
        [
          { label: '扫码绑定', callback: `/扫码绑定` },
          { label: '更新记录', callback: `/更新抽卡记录` },
          { label: `集录记录`, callback: `/集录记录` },
        ],[
          { label: '全部记录', callback: `/全部记录` },
          { label: '角色记录', callback: `/角色记录` },
          { label: '武器记录', callback: `/武器记录` },
        ],[
          { label: '全部统计', callback: `/全部统计` },
          { label: '角色统计', callback: `/角色统计` },
          { label: '武器统计', callback: `/武器统计` },
        ],[
          { label: '获取小助手记录', callback: `/获取小助手记录` },
        ]
      ]
      return Bot.Button(list)
    }
  }