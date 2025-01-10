export default class Button {
    constructor () {
      this.plugin = {
        // 插件名称
        name: '通用按钮',
        // 描述
        dsc: '通用按钮',
        // 按钮优先级
        priority: 5100,
        rule: [
          {
            /** 命令正则匹配 */
            reg: '',
            /** 执行方法 */
            fnc: 'test'
          },
        ]
      }
    }
   
    /** 执行方法 */
    test (e) {
      if (e.button)
        return e.button
      else {   
        if (!e.raw_message) return false    
        const button = [
          { label: '+1', callback: `${command}` },
        ]
        return Bot.Button(button)
      }
    }
   }