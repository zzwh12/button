export default class Button {
    constructor() {
      this.plugin = {
        name: "刷新CD",
        dsc: "刷新CD",
        priority: 100,
        rule: [
          {
            reg: '^#(刷新|清除|clean-)(CD|cd)\s*([1-9][0-9]{8})?$',
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
          { label: `刷新CD`, callback: `/刷新CD` },
        ],[
          { label: '获取小助手记录', callback: `/获取小助手记录` }
        ]
      ]
      return Bot.Button(list)
    }
  }