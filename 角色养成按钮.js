import Character from '../../../../miao-plugin/models/Character.js'
import { alias as alias_gs } from '../../../../miao-plugin/resources/meta-gs/character/alias.js'
import { alias as alias_sr } from '../../../../miao-plugin/resources/meta-sr/character/alias.js'
import { extraChars as extra_gs } from '../../../../miao-plugin/resources/meta-gs/character/extra.js'

const alias = {
  gs: {},
  sr: {}
}
refreshAlias()

/** 刷新别名列表 */
async function refreshAlias () {
  let custom_gs = {}
  try {
    // 尝试动态导入 customCharacters
    const { customCharacters } = await import('../../../../miao-plugin/config/character.js')
    custom_gs = customCharacters
  } catch (error) {
    const { customCharacters } = await import('../../../../miao-plugin/config/character_default.js')
    custom_gs = customCharacters
  }
  for (const origin_name in alias_gs) {
    if (alias_gs[origin_name]) {
      alias.gs[origin_name] = alias_gs[origin_name].split(',')
    } else {
      alias.gs[origin_name] = []
    }
    alias.gs[origin_name].push(origin_name)
  }
  for (const origin_name in extra_gs) {
    if (extra_gs[origin_name]) {
      alias.gs[origin_name] = extra_gs[origin_name].split(',')
    } else {
      alias.gs[origin_name] = []
    }
  }
  for (const origin_name in custom_gs) {
    if (!alias.gs[custom_gs[origin_name][0]]) {
      alias.gs[custom_gs[origin_name][0]] = custom_gs[origin_name]
    } else {
      alias.gs[custom_gs[origin_name][0]].push(...custom_gs[origin_name])
    }
  }

  for (const origin_name in alias_sr) {
    if (alias_sr[origin_name]) {
      alias.sr[origin_name] = alias_sr[origin_name].split(',')
    } else {
      alias.sr[origin_name] = []
    }
    alias.sr[origin_name].push(origin_name)
  }
}

/**
 * 在给定的文本中搜索与别名对象中任何别名匹配的字符串
 * @param {string} text 要搜索的文本
 * @param {boolean} isSr 是否为星铁
 * @returns {Promise<string|null>} 如果找到匹配的别名，则返回该别名；否则返回 null
 */

async function findCharacter (text, isSr) {
  const game = isSr ? 'sr' : 'gs'
  for (const origin_name in alias[game]) {
    for (const nickname of alias[game][origin_name]) {
      if (text.includes(nickname)) {
        return origin_name
      }
    }
  }
  return null
}
export default class Button {
    constructor() {
      this.plugin = {
        name: "角色养成",
        dsc: "角色养成",
        priority: 100,
        rule: [
          {
            reg: '^#*(星铁)?(.*)(养成|计算)([0-9]|,|，| )*$',
            fnc: 'buttonCenter'
          },
          {
            reg: '^#*(星铁)?角色(养成|计算|养成计算)$',
            fnc: 'buttonCenter'
          }
        ]
      }
    }
    async buttonCenter(e){
      const game = (e.game === 'sr' || e.isSr) ? '星铁' : ''
      const name = await findCharacter(e.raw_message, game)
    if (!name) return false
    let material = ''
    if (!game) {
      material = Character.get(name).getMaterials()
        .find(material => material.num == 168)
    }
      const list = [
        [
        { label: `${name}养成`, data: `/${game}${name}养成` },
        ],[
        { label: '更新面板', callback: `/${game}更新面板` },
        ]
      ]
      return Bot.Button(list)
    }
  }