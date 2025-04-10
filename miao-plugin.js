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
    const cacheKey = `${e.group_id}-${e.user_id}-profile`
    if (Button.buttonSentCache[cacheKey]) {
        return []
    }
    let game = ''
    if (e.game === 'sr' || e.isSr) {
        game = '星铁'
    } else if (e.game === 'zzz' || e.isSr) {
        game = '绝区零'
    }
    const maxButtons = 12
    const roleList = e?.newChar ? (Object.keys(e.newChar).slice(0, maxButtons) || []) : []

    const button = []

    const list = [
      { label: '扫码登录', data: '#扫码登录', style: 4 },
      { label: '更新面板', data: `#${game}更新面板`, style: 4 },
      { label: '绑定uid', data: `#${game}绑定`, style: 4 }
    ]
    button.push(...Bot.Button(list))

    const list2 = []
    for (let role of roleList)
      list2.push({ label: role, callback: `#${game ? game + '' : ''}${role}面板`, style: 1 })
    button.push(...Bot.Button(list2, 3))

    Button.buttonSentCache[cacheKey] = true
    
    return button
  }

  bingUid(e) {
    let game = ''
    if (e.game === 'sr' || e.isSr) {
        game = '星铁'
    } else if (e.game === 'zzz' || e.isSr) {
        game = '绝区零'
    }
    const list = [
      [
        { label: '原神绑定UID', data: `#绑定`, style: 4 },
        { label: '原神切换UID', data: `#uid`, style: 4 },
        { label: '原神删除UID', data: `#删除uid`, style: 4 },
      ],[
        { label: '星铁绑定UID', data: `#星铁绑定`, style: 4 },
        { label: '星铁切换UID', data: `#星铁uid`, style: 4 },
        { label: '星铁删除UID', data: `#星铁删除uid`, style: 4 },
      ],[
        { label: '绝区零绑定UID', data: `#绝区零绑定`, style: 4 },
        { label: '绝区零切换UID', data: `#绝区零uid`, style: 4 },
        { label: '绝区零删除UID', data: `#绝区零删除uid`, style: 4 },
      ]
    ]
    const list2 = [
      { label: '更新面板', callback: `#${game ? game + '更新面板' : '更新面板'}`, style: 4 },
      { label: '扫码绑定', callback: '#扫码绑定', style: 4 }
    ]
    const button = []
    button.push(...Bot.Button(list))
    button.push(...Bot.Button(list2))
    return button
  }

  async rank (e) {
    let role = e.msg.replace(/(#|星铁|原神|喵喵|最强|最高分|第一|词条|双爆|双暴|极限|最高|最多|最牛|圣遗物|评分|群内|群|排名|排行|面板|面版|详情|榜)/g, '')
    const char = Character.get(role)
    const game = (char.game === 'sr') ? '星铁' : ''
    if (!char) {
      if (e.msg.match(/#(最强|最高分)(面板|排行)/)) {
        role = ''
      } else return false
    }
    const list = [
      [
      { label: `最强${role}排行`, callback: `#最强${role}排行`, style: 4 },
      { label: `最高分${role}排行`, callback: `#最高分${role}排行`, style: 4 },
      ],[
      { label: `最强${ (role == '') ? '面板' : role }`, callback: `#${game}最强${role}`, style: 4 },
      { label: `最高分${ (role == '') ? '面板' : role }`, callback: `#${game}最高分${role}`, style: 4 },
      ],[
      { label: '最强排行', callback: `#最强排行`, style: 4 },
      { label: '最高分排行', callback: `#最高分排行`, style: 4 },
      ],[
      { label: `${role}面板`, callback: `#${e.game === 'sr' ? '星铁' : ''}${role}面板`, style: 4 },
      { label: `极限${role}`, callback: `#${game}${role}极限面板`, style: 4 },
    ]
    ]
    return Bot.Button(list, 2)
  }

  async detail (e) {
    const char = Character.get(e.avatar)
    const game = (char.game === 'sr') ? '星铁' : ''
    if (/(详情|详细|面板)更新$/.test(e.raw_message) || (/更新/.test(e.raw_message) && /(详情|详细|面板)$/.test(e.raw_message))) {
      const button = this.profile(e)
      return button
    } else {
      if (!char.name) return false
      const button = []
      const list = [
        [
        { label: `最强${char.name}`, callback: `#${e.game === 'sr' ? '星铁' : ''}最强${char.name}`, },
        { label: `极限${char.name}`, callback: `#${e.game === 'sr' ? '星铁' : '原神'}${char.name}极限面板`, },
      ],[
        { label: `${char.name}攻略`, callback: `#${e.game === 'sr' ? '星铁' : ''}${char.name}攻略`, },
        { label: `${char.name}排行`, callback: `#${e.game === 'sr' ? '星铁' : ''}${char.name}排行`, },
      ],[
        { label: `${char.name}天赋`, callback: `#${e.game === 'sr' ? '星铁' : ''}${char.name}天赋`, },
        { label: `${char.name}命座`, callback: `#${e.game === 'sr' ? '星铁' : ''}${char.name}命座`, },
      ],[
        { label: `${char.name}面板`, callback: `#${e.game === 'sr' ? '星铁' : '原神'}${char.name}面板`, },
        { label: `面板更换`, data: `#${game}${char.name}面板换`, },
        { label: `${char.name}COS`, callback: `#${e.game === 'sr' ? '星铁' : '原神'}cos${char.name}`, },
      ],
      ]
      button.push(...Bot.Button(list, 3))
      const list2 = [
        { label: '更新面板', callback: `#${game}更新面板` },
        { label: '绑定UID', data: `#${game}绑定` },
        { label: '扫码绑定', callback: `#扫码绑定` },
      ]
      button.push(...Bot.Button(list2))
      return button
    }
  }

  avatarList(e) {
    const game = (e.game === 'sr' || e.isSr) ? '星铁' : ''
    const list = [
      [
        { label: '角色', callback: `#${game}角色` },
        { label: '探索', callback: `#探索` },
      ],[
        { label: '深渊', callback: `#${game}深渊` },
        { label: '武器', callback: '#武器' },
      ],[
        { label: '原石', callback: `#原石` },
        { label: '星琼', callback: `#星琼` },
      ],[
        { label: '原石统计', callback: `#原石统计` },
        { label: '星琼统计', callback: `#${game}星琼统计` },
      ],[
        { label: '扫码绑定', callback: `#扫码绑定` },
        { label: '刷新CK', callback: `#刷新ck` },
      ]
    ]
    const button = Bot.Button(list,3)
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