<<<<<<< HEAD
//代码源于：[xyz]https://gitee.com/xyzqwefd
//import Panel from "../../../../zzz-plugin/apps/panel.js";
//import { rulePrefix } from '../../../../zzz-plugin/lib/common.js';

export default class Button {
  constructor () {
    this.plugin = {
      name: 'zzz-plugin',
      dsc: 'zzz-plugin',
      priority: 95,
      rule: [
        {
          reg: `#绝区零更新面板|#绝区零面板更新|#绝区零刷新面板|#绝区零面板刷新$`,
          fnc: 'profile1',
        },
        {
          reg: '#绝区零帮助|%帮助$',
          fnc: 'help',
        },
        {
          reg: `#绝区零(.*)面板(.*)$`,
          fnc: 'handleRule',
        },
      ]
    }
  }
  
  profile1(e) {
    const roleList = global.zzzroleList
    const button = []

    const list3 = [
      { label: `更新面板`, callback: `/绝区零更新面板`, style: 4 },
      { label: '绑定UID', data: `/绝区零绑定`, style: 4 },
      { label: '扫码绑定', callback: `/扫码绑定`, style: 4 },
    ]
    button.push(...Bot.Button(list3))

    const list1 = []
    for (let role of roleList) {
      list1.push({ label: role, callback: `/绝区零${role}面板`, style: 3 })
    if (list1.length === 12) {
      break // 一旦达到12个按钮，停止添加更多
  }
}
    button.push(...Bot.Button(list1, 3))
    return button
  }

  handleRule (e) {
    const charName = e.msg.replace(/#绝区零|面板/g, '')
    let game = ''
    if (e.game === 'sr' || e.isSr) {
        game = '星铁'
    } else if (e.game === 'zzz' || e.isSr) {
        game = '绝区零'
    }

    const button = []
    const list =[
      [
        { label: `更新面板`, callback: `/绝区零更新面板`, style: 4 },
        { label: '绑定UID', data: `/绝区零绑定`, style: 4 },
        { label: '扫码绑定', callback: `/扫码绑定`, style: 4 },
      ]
    ]
    button.push(...Bot.Button(list, 3))
    const list2 = [
      [
        { label: `${charName}面板`, callback: `/绝区零${charName}面板`, style: 3 },
        { label: `${charName}攻略`,callback:`/绝区零${charName}攻略`, style: 4 },
      ],[
        { label: `绝区零帮助`,callback:`/绝区零帮助`, style: 4 },
      ]
   ]
   button.push(...Bot.Button(list2))
   return button
  }

  help () {
    const button = [
      [
        { label: '签到', callback: `/签到`, style: 4 },
        { label: '体力', callback: `/体力`, style: 4 },
        { label: '深渊', callback: `/绝区零深渊`, style: 4 },
      ],[
        { label: '个人信息', callback: `/绝区零个人信息`, style: 4 },
        { label: '练度统计', callback: `/绝区零练度统计`, style: 4 },
        { label: '上期深渊', callback: `/绝区零上期深渊`, style: 4 },
      ],[
        { label: '更新面板', callback: `/绝区零更新面板`, style: 4 },
        { label: `绑定UID`, data: `/绝区零绑定`, style: 4 },
        { label: '扫码绑定', callback: `/扫码绑定`, style: 4 },
      ],[
        { label: '更新抽卡记录', callback: `/绝区零更新抽卡记录`, style: 4 },
      ]
=======
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
>>>>>>> e1101a4238ab1f6330eab0bf595f0314318842af
    ]
    return Bot.Button(button)
  }
}