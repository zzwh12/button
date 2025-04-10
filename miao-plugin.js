/* 原作者：[风间叶](https://github.com/xiaoye12123/), [Lain.](https://github.com/Zyy955/), [夜](https://github.com/yeyeyye-eee) */
import Character from '../../../../miao-plugin/models/Character.js'

export default class Button {
  constructor () {
    this.plugin = {
      name: 'miao-plugin',
      dsc: 'miao-plugin',
      priority: 101,
      rule: [
        {
          reg: '^#?(喵喵)?(命令|帮助|菜单|help|说明|功能|指令|使用说明)$',
          fnc: 'help'
        },
        {
          reg: /^#(星铁|原神)?获取游戏角色详情( )?(\d{9})?$/,
          fnc: 'profile'
        },
        {
          reg: /^#(星铁|原神)?(更新)?(全部)?面板(更新)?( )?(\d{9})?$/,
          fnc: 'profile'
        },
        {
          reg: /^#?(原神|星铁|绝区零)?(删除|解绑)uid(\s|\+)*([0-9]{1,2})?$/i,
          fnc: 'bingUid'
        },
        {
          reg: /^#(原神|星铁|绝区零)?绑定(uid)?(\s|\+)*((1[0-9]|[1-9])[0-9]{8}|[1-9][0-9]{7})$/i,
          fnc: 'bingUid'
        },
        {
          reg: /^#(原神|星铁|绝区零)?(我的)?(uid)?(\s|\+)*[0-9]{0,2}$/i,
          fnc: 'bingUid'
        },
        {
          reg: /^#?(原神|星铁)?(群|群内)?(排名|排行)?(最强|最高|最高分|最牛|第一)+.+/,
          fnc: 'rank'
        },
        {
          reg: /^#?(原神|星铁)?(群|群内)?(.*)(排名|排行)(榜)?$/,
          fnc: 'rank'
        },
        {
          reg: /^#*([^#]+)\s*(详细|详情|面板|面版|圣遗物|武器[1-7]|伤害([1-9]+\d*)?)\s*(\d{9})*(.*[换变改].*)?$/,
          fnc: 'detail'
        },
        {
          reg: /^(#(原神|星铁)?(角色|查询|查询角色|角色查询|人物)[ |0-9]*$)|(^(#*uid|#*UID)\+*[1|2|5-9][0-9]{8}$)|(^#[+|＋]*[1|2|5-9][0-9]{8})/,
          fnc: 'avatarList'
        },
        {
          reg: '#喵喵角色卡片',
          fnc: 'avatarList'
        },
        {
          reg: '#喵喵(扩展)WIKI',
          fnc: 'tip'
        },
        {
          reg: /.*(攻略|天赋|技能|行迹|命座|命之座|星魂|资料|图鉴|素材|材料|天赋)[0-9]?$/,
          fnc: 'tip'
        }
      ]
    }
  }

  // 全局缓存对象，用于记录按钮是否已发送
  static buttonSentCache = {}

  help (){
    const button = [
      { label: '圣遗物', data: '#圣遗物列表', style: 4 },
      { label: '深渊', data: '#喵喵深渊', style: 4 },
      { label: '练度统计', data: '#原神练度统计', style: 4 },

      { label: '体力', data: '#体力', style: 4 },
      { label: '今日素材', data: '#今日素材', style: 4 },
      { label: '签到', data: '#签到', style: 4 },

      { label: '绑定uid', data: '#绑定', style: 4 },
      { label: '米游社扫码', data: '#扫码登录', style: 4 },
      { label: '更新面板', data: '#更新面板', style: 4 }
    ]
    return Bot.Button(button, 3)
  }

  profile (e) {
    const maxButtons = 12
    const roleList = e?.newChar ? (Object.keys(e.newChar).slice(0, maxButtons) || []) : []
    let game;
    if (e.game === 'sr' || e.isSr) {
        game = '星铁';
    } else if (e.game === 'zzz' || e.iszzz) {
        game = '绝区零';
    } else {
        game = '原神';
    }    
    const button = []

    const list = [
      { label: '扫码登录', data: '#扫码登录', style: 4 },
      { label: '更新面板', data: `#${game}更新面板`, style: 4 },
      { label: '绑定uid', data: `#${game}绑定`, style: 4 }
    ]
    button.push(...Bot.Button(list))

    const list2 = []
    for (let role of roleList) { list2.push({ label: role, data: `#${game}${role}面板`, style: 1 }) }
    button.push(...Bot.Button(list2, 3))

    Button.buttonSentCache[cacheKey] = true
    
    return button
  }

  bingUid (e) {
    let game;
    if (e.game === 'sr' || e.isSr) {
      game = '星铁';
    } else if (e.game === 'zzz' || e.iszzz) {
        game = '绝区零';
    } else {
        game = '原神';
    }
    const list = [
      { label: '扫码登录', data: '#扫码绑定', style: 4 }
    ]
    const list2 = [
      { label: '更新面板', data: `#${game}更新面板`, style: 4 },
      { label: '绑定uid', data: `#${game}绑定`, style: 4 }
    ]
    const button = []
    button.push(...Bot.Button(list))
    button.push(...Bot.Button(list2))
    return button
  }

  async rank (e) {
    let role = e.msg.replace(/(#|星铁|原神|喵喵|最强|最高分|第一|词条|双爆|双暴|极限|最高|最多|最牛|圣遗物|评分|群内|群|排名|排行|面板|面版|详情|榜)/g, '')
    const char = Character.get(role)
    let game;
    if (e.game === 'sr' || e.isSr) {
        game = '星铁';
    } else if (e.game === 'zzz' || e.iszzz) {
        game = '绝区零';
    } else {
        game = '';
    }
    if (!char) {
      if (e.msg.match(/#(最强|最高分)(面板|排行)/)) {
        role = ''
      } else return false
    }
    const list = [
      { label: `最强${role ? role : '面板'}`, data: `#最强${role}`, style: 4 },
      { label: `最高分${role ? role : '面板'}`, data: `#最高分${role}`, style: 4 },

      { label: '最强排行', data: `#最强${role}排行`, style: 4 },
      { label: '最高分排行', data: `#最高分${role}排行`, style: 4 },

      { label: `${role ? role : '更新'}面板`, data: `#${game}${role ? role : '更新'}面板`, style: 4 }
    ]
    return Bot.Button(list, 2)
  }

  async detail (e) {
    const char = Character.get(e.avatar)
    let game;
    if (e.game === 'sr' || e.isSr) {
        game = '星铁';
    } else if (e.game === 'zzz' || e.iszzz) {
        game = '绝区零';
    } else {
        game = '';
    }
    if (/(详情|详细|面板)更新$/.test(e.raw_message) || (/更新/.test(e.raw_message) && /(详情|详细|面板)$/.test(e.raw_message))) {
      const button = this.profile(e)
      return button
    } else {
      if (!char.name) return false
      const button = []
      const list = [
        { label: `${char.name}攻略`, data: `#${game}${char.name}攻略`, style: 4 },
        { label: `${char.name}排行`, data: `#${game}${char.name}排行`, style: 4 },

        { label: `${char.name}面板`, data: `#${game}${char.name}面板`, style: 4 },
        { label: '极限面板', data: `#${game}${char.name}极限面板`, style: 4 }
      ]
      button.push(...Bot.Button(list, 2))
      const list2 = [
        { label: '绑定uid', data: `#${game}绑定`, style: 4 },
        { label: '扫码登录', data: '#扫码登录', style: 4 },
        { label: '更新面板', data: `#${game}更新面板`, style: 4 }
      ]
      button.push(...Bot.Button(list2))
      return button
    }
  }

  avatarList(e) {
    const game = (e.game === 'sr' || e.isSr) ? '星铁' : ''
    const list = [
      { label: '深渊', data: `#${game}深渊`, style: 4 },
      { label: '探索', data: `#${game}探索`, style: 4 },
      { label: game == '星铁' ? '星琼' : '原石', data: `#${game == '星铁' ? '星琼' : '原石'}`, style: 4 },
      { label: '练度统计', data: `#${game}练度统计`, style: 4 },
      { label: '体力', data: '#体力', style: 4 }
    ]
    const button = Bot.Button(list, 3)
    return button
  }
  
  async tip (e) {
    const role = e.msg
    .replace(/(攻略|天赋|技能|行迹|命座|命之座|星魂|资料|图鉴|素材|材料|天赋)[0-9]?/, '')
    .replace(/#|星铁|原神|喵喵/g, '')
    const char = e.char || Character.get(role)
    const game = (char.game === 'sr') ? '星铁' : ''
    if (!char) return false
    let material = ''
    if (!game) {
      material = char.getMaterials()
      .find(material => material.num == 168)
    }
    const list = [
      
      [
        { label: `${char.name}面板`, callback: `#${game}${char.name}面板`, style: 4 },
        { label: `${char.name}图鉴`, callback: `#${game}${char.name}图鉴`, style: 4 }
        
      ],
      [
        { label: `${char.name}天赋`, callback: `#${game}${char.name}天赋`, style: 4 },
        { label: `${char.name}命座`, callback: `#${game}${char.name}命座`, style: 4 }
      ],
      [
        { label: `${char.name}材料`, callback: `#${game}${char.name}材料`, style: 4 },
        { label: `${char.name}攻略`, callback: `#${game}${char.name}攻略`, style: 4 }
      ]
    ]
    
    if (material) {
      list.push([
        { label: '材料统计', data: `#${game}${char.name}材料`, style: 4 },
        { label: '今日素材', data: '#今日素材', style: 4 }
      ])
      list.push([
        { label: `${material.label}点位`, data: `#${material.label}在哪里`, style: 4 }
      ])
    }
    if (!game) {
      list[0].push({ label: '参考面板', data: `#${game}${char.name}参考面板`, style: 4 })
      list[3].push({ label: '图鉴', data: `#${game}${char.name}图鉴`, style: 4 })
      list[4].push({ label: `${char.name}照片`, style: 4 })
    }
    return Bot.Button(list, list.length)
  }
}

// 每2秒清除一次缓存
setInterval(() => {
  Button.buttonSentCache = {}
}, 2000)