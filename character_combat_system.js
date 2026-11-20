/**
 * 《天堂1》風格角色屬性階梯查表 (Breakpoint System)、職業範本與戰鬥結算系統
 * 支援 JavaScript (Browser Global / ES Module) 與 TypeScript JSDoc 型別推導
 */

/**
 * @typedef {'knight' | 'elf' | 'mage'} JobId
 *
 * @typedef {Object} BaseAttributes
 * @property {number} str - 力量 (影響近戰傷害與近戰命中)
 * @property {number} dex - 敏捷 (影響遠距傷害、遠距命中、PDEF 與敏捷防禦除數)
 * @property {number} con - 體質 (影響升級 HP 成長紅利)
 * @property {number} int - 智力 (影響魔法攻擊加成 MB、魔法命中與 INT>=25 減免 MP 消耗)
 * @property {number} wis - 精神 (影響升級 MP 成長紅利與 MDEF%)
 * @property {number} cha - 魅力 (預留屬性，暫不實作)
 *
 * @typedef {Object} ClassTemplate
 * @property {JobId} id
 * @property {string} name
 * @property {BaseAttributes} initialStats
 * @property {number} hpDie          - 升級 HP 成長骰子最大值 (例如 1d10 為 10)
 * @property {number} mpDie          - 升級 MP 成長骰子最大值 (例如 1d2 為 2)
 * @property {number} meleeHitCoef   - 近戰命中係數
 * @property {number} rangedHitCoef  - 遠距命中係數
 * @property {number} magicHitCoef   - 魔法命中係數
 * @property {number} baseMdef       - 職業基礎魔防 (%)
 * @property {number} baseSpeed      - 基礎移動速度
 * @property {string} defaultWeapon  - 初始武器 ID
 */

/** 2. 職業基礎設定 (Class Definitions) */
const ClassDefinitions = {
    knight: {
        id: 'knight',
        name: '騎士',
        initialStats: { str: 16, dex: 12, con: 14, int: 8, wis: 9, cha: 12 },
        hpDie: 10,          // 1d10
        mpDie: 2,           // 1d2
        meleeHitCoef: 1.0,
        rangedHitCoef: 0.33,
        magicHitCoef: 0.25,
        baseMdef: 0,        // 0%
        baseSpeed: 180,
        defaultWeapon: 'sword',
        allowedWeaponCategory: 'sword',
        allowedWeaponLabel: '劍類武器',
        maxMagicTier: 2,    // 騎士可學 1~2 級魔法
        magicLevelStep: 8   // 8級學1級、16級學2級
    },
    elf: {
        id: 'elf',
        name: '妖精',
        initialStats: { str: 11, dex: 15, con: 12, int: 12, wis: 12, cha: 9 },
        hpDie: 8,           // 1d8
        mpDie: 4,           // 1d4
        meleeHitCoef: 0.5,
        rangedHitCoef: 1.0,
        magicHitCoef: 0.33,
        baseMdef: 15,       // 15%
        baseSpeed: 220,
        defaultWeapon: 'bow',
        allowedWeaponCategory: 'bow',
        allowedWeaponLabel: '弓類武器',
        maxMagicTier: 4,    // 妖精可學 1~4 級魔法
        magicLevelStep: 6   // 6級學1級，每升6級可學下一階 (6 / 12 / 18 / 24)
    },
    mage: {
        id: 'mage',
        name: '法師',
        initialStats: { str: 8, dex: 7, con: 12, int: 16, wis: 16, cha: 8 },
        hpDie: 4,           // 1d4
        mpDie: 6,           // 1d6
        meleeHitCoef: 0.33,
        rangedHitCoef: 0.33,
        magicHitCoef: 1.0,
        baseMdef: 10,       // 10%
        baseSpeed: 160,
        defaultWeapon: 'wand',
        allowedWeaponCategory: 'staff',
        allowedWeaponLabel: '杖類武器',
        maxMagicTier: 10,   // 法師可學全部魔法
        magicLevelStep: 4   // 4級學1級，每升4級可學下一階 (4 / 8 / 12 / 16 / 20 / 24 / 28 / 32 / 36 / 40)
    }
};

/**
 * 3. 屬性階梯對照表 (Attribute Breakpoint Tables)
 */
const AttributeBreakpoints = {
    /**
     * STR / DEX 表 (影響物理傷害與命中)
     * - 9~12:  傷害 +0, 命中 +0
     * - 13~14: 傷害 +1, 命中 +1
     * - 15~16: 傷害 +2, 命中 +2
     * - 17:    傷害 +3, 命中 +3
     * - 18:    傷害 +5, 命中 +4
     * - 19:    傷害 +6, 命中 +5
     * - 20:    傷害 +7, 命中 +6
     * - >20:   每超過 1 點額外 +1 傷害、+1 命中
     * @param {number} val
     * @returns {{ dmgBonus: number, hitBonus: number }}
     */
    getStrDexBonus(val) {
        const v = Math.floor(val || 0);
        if (v <= 12) return { dmgBonus: 0, hitBonus: 0 };
        if (v <= 14) return { dmgBonus: 1, hitBonus: 1 };
        if (v <= 16) return { dmgBonus: 2, hitBonus: 2 };
        if (v === 17) return { dmgBonus: 3, hitBonus: 3 };
        if (v === 18) return { dmgBonus: 5, hitBonus: 4 };
        if (v === 19) return { dmgBonus: 6, hitBonus: 5 };
        if (v === 20) return { dmgBonus: 7, hitBonus: 6 };
        const extra = v - 20;
        return { dmgBonus: 7 + extra, hitBonus: 6 + extra };
    },

    /**
     * CON / WIS 表 (影響升級紅利與魔防)
     * - 9~11:  HP +0, MP +0, MDEF +0%
     * - 12~13: HP +1, MP +1, MDEF +2%
     * - 14~15: HP +2, MP +1, MDEF +5%
     * - 16:    HP +4, MP +2, MDEF +10%
     * - 17:    HP +5, MP +3, MDEF +15%
     * - 18:    HP +7, MP +5, MDEF +25%
     * - >18:   延伸成長
     * @param {number} val
     * @returns {{ hpBonus: number, mpBonus: number, mdefBonus: number }}
     */
    getConWisBonus(val) {
        const v = Math.floor(val || 0);
        if (v <= 11) return { hpBonus: 0, mpBonus: 0, mdefBonus: 0 };
        if (v <= 13) return { hpBonus: 1, mpBonus: 1, mdefBonus: 2 };
        if (v <= 15) return { hpBonus: 2, mpBonus: 1, mdefBonus: 5 };
        if (v === 16) return { hpBonus: 4, mpBonus: 2, mdefBonus: 10 };
        if (v === 17) return { hpBonus: 5, mpBonus: 3, mdefBonus: 15 };
        if (v === 18) return { hpBonus: 7, mpBonus: 5, mdefBonus: 25 };
        const extra = v - 18;
        return {
            hpBonus: 7 + extra,
            mpBonus: 5 + Math.floor((extra + 1) / 2),
            mdefBonus: 25 + extra * 5
        };
    },

    /**
     * INT 表 (影響魔法攻擊力 MB 與 魔法命中)
     * - 9~11:  MB +0, 魔法命中 +0
     * - 12~14: MB +1, 魔法命中 +1
     * - 15~17: MB +3, 魔法命中 +2
     * - 18~24: MB +5, 魔法命中 +4
     * - >=25:  MB +10, 魔法命中 +8 (附加效果：所有法術 MP 消耗 -2)
     * @param {number} val
     * @returns {{ mb: number, magicHit: number, mpCostReduction: number }}
     */
    getIntBonus(val) {
        const v = Math.floor(val || 0);
        if (v <= 11) return { mb: 0, magicHit: 0, mpCostReduction: 0 };
        if (v <= 14) return { mb: 1, magicHit: 1, mpCostReduction: 0 };
        if (v <= 17) return { mb: 3, magicHit: 2, mpCostReduction: 0 };
        if (v <= 24) return { mb: 5, magicHit: 4, mpCostReduction: 0 };
        const extra = Math.floor((v - 25) / 2);
        return { mb: 10 + extra, magicHit: 8 + extra, mpCostReduction: 2 };
    },

    /**
     * 敏捷防禦等級除數 (DexDivisor)
     * - DEX <= 12: 8
     * - DEX 13~15: 6
     * - DEX 16~17: 5
     * - DEX >= 18: 4
     * @param {number} dex
     * @returns {number}
     */
    getDexDivisor(dex) {
        const d = Math.floor(dex || 0);
        if (d <= 12) return 8;
        if (d <= 15) return 6;
        if (d <= 17) return 5;
        return 4;
    }
};

/**
 * 4. 戰鬥與防禦計算公式 & 結算函式 (Combat Formulas & Resolution)
 */
const CombatSystem = {
    /**
     * 擲骰 1 ~ maxSides
     * @param {number} maxSides
     */
    rollDie(maxSides) {
        return Math.floor(Math.random() * maxSides) + 1;
    },

    /**
     * 計算升級 HP 增加量 = Random(1, HP成長骰子最大值) + CON_Bonus
     * @param {JobId} jobId
     * @param {number} con
     */
    rollLevelUpHp(jobId, con) {
        const tpl = ClassDefinitions[jobId] || ClassDefinitions.knight;
        const conBonus = AttributeBreakpoints.getConWisBonus(con).hpBonus;
        return Math.max(1, this.rollDie(tpl.hpDie) + conBonus);
    },

    /**
     * 計算升級 MP 增加量 = Random(1, MP成長骰子最大值) + WIS_Bonus
     * @param {JobId} jobId
     * @param {number} wis
     */
    rollLevelUpMp(jobId, wis) {
        const tpl = ClassDefinitions[jobId] || ClassDefinitions.knight;
        const wisBonus = AttributeBreakpoints.getConWisBonus(wis).mpBonus;
        return Math.max(1, this.rollDie(tpl.mpDie) + wisBonus);
    },

    /**
     * 計算近戰命中率 = Math.floor(等級 * 近戰命中係數) + STR_命中加成 + 武器命中加成
     */
    calcMeleeHit(level, jobId, effStr, weaponHitBonus = 0) {
        const tpl = ClassDefinitions[jobId] || ClassDefinitions.knight;
        const strHit = AttributeBreakpoints.getStrDexBonus(effStr).hitBonus;
        return Math.floor(level * tpl.meleeHitCoef) + strHit + weaponHitBonus;
    },

    /**
     * 計算遠距命中率 = Math.floor(等級 * 遠距命中係數) + DEX_命中加成 + 武器命中加成
     */
    calcRangedHit(level, jobId, effDex, weaponHitBonus = 0) {
        const tpl = ClassDefinitions[jobId] || ClassDefinitions.knight;
        const dexHit = AttributeBreakpoints.getStrDexBonus(effDex).hitBonus;
        return Math.floor(level * tpl.rangedHitCoef) + dexHit + weaponHitBonus;
    },

    /**
     * 計算魔法命中率 = Math.floor(等級 * 魔法命中係數) + INT_命中加成
     */
    calcMagicHit(level, jobId, effInt) {
        const tpl = ClassDefinitions[jobId] || ClassDefinitions.knight;
        const intHit = AttributeBreakpoints.getIntBonus(effInt).magicHit;
        return Math.floor(level * tpl.magicHitCoef) + intHit;
    },

    /**
     * 計算近戰傷害 = 武器亂數傷害 + 武器強化值 + STR_傷害加成 (+ 額外Buff增傷)
     */
    calcMeleeDamage(wpnRandDmg, wpnEnchant, effStr, extraBuffDmg = 0) {
        const strDmg = AttributeBreakpoints.getStrDexBonus(effStr).dmgBonus;
        return Math.max(1, wpnRandDmg + wpnEnchant + strDmg + extraBuffDmg);
    },

    /**
     * 計算遠距傷害 = 弓箭亂數傷害 + 武器強化值 + DEX_傷害加成 (+ 額外Buff增傷)
     */
    calcRangedDamage(bowRandDmg, wpnEnchant, effDex, extraBuffDmg = 0) {
        const dexDmg = AttributeBreakpoints.getStrDexBonus(effDex).dmgBonus;
        return Math.max(1, bowRandDmg + wpnEnchant + dexDmg + extraBuffDmg);
    },

    /**
     * 計算魔法傷害 = 法術基礎傷害 * (1 + (INT_MB / 10))
     */
    calcMagicDamage(baseSpellDamage, effInt) {
        const mb = AttributeBreakpoints.getIntBonus(effInt).mb;
        return Math.max(1, Math.round(baseSpellDamage * (1 + mb / 10)));
    },

    /**
     * 計算角色總物理防禦 (PDEF) = 防具PDEF總和 + Math.floor(DEX / 3) + Math.floor(等級 / DexDivisor)
     */
    calcTotalPdef(level, effDex, armorPdefSum = 0, buffDefDelta = 0) {
        const dexDivisor = AttributeBreakpoints.getDexDivisor(effDex);
        return Math.max(0, armorPdefSum + Math.floor(effDex / 3) + Math.floor(level / dexDivisor) + buffDefDelta);
    },

    /**
     * 計算角色總魔法防禦 (MDEF %) = 職業基礎魔防(%) + Math.floor(等級 / 2) + WIS_MDEF加成(%) + 裝備MDEF(%)
     */
    calcTotalMdef(level, jobId, effWis, equipMdefSum = 0) {
        const tpl = ClassDefinitions[jobId] || ClassDefinitions.knight;
        const wisMdef = AttributeBreakpoints.getConWisBonus(effWis).mdefBonus;
        return Math.max(0, tpl.baseMdef + Math.floor(level / 2) + wisMdef + equipMdefSum);
    },

    /**
     * 【戰鬥結算邏輯 1 & 2：物理攻擊結算】
     * 1. 物理閃避判定：實際命中率(%) = Clamp(攻擊方命中率 - 防守方PDEF, 5, 95)
     * 2. 物理傷害減免：若命中，最終受到傷害 = Math.max(1, 攻擊方實際傷害 - Math.floor(防守方PDEF / 5))
     * @param {number} attackerHit
     * @param {number} rawDamage
     * @param {number} defenderPdef
     * @returns {{ isHit: boolean, hitChance: number, finalDamage: number }}
     */
    resolvePhysicalAttack(attackerHit, rawDamage, defenderPdef = 0) {
        const hitChance = Math.max(5, Math.min(95, Math.round(attackerHit - defenderPdef)));
        const roll = Math.random() * 100;
        if (roll >= hitChance) {
            return { isHit: false, hitChance, finalDamage: 0 };
        }
        const dmgReduction = Math.floor(Math.max(0, defenderPdef) / 5);
        const finalDamage = Math.max(1, Math.round(rawDamage - dmgReduction));
        return { isHit: true, hitChance, finalDamage };
    },

    /**
     * 【戰鬥結算邏輯 3：魔法攻擊結算】
     * 3. 魔法傷害減免：必中，最終魔法傷害 = 攻擊方魔法傷害 * (1 - 防守方MDEF%)。
     *    若 MDEF >= 100%，傷害減半並免疫負面狀態。
     * @param {number} attackerMagicDamage
     * @param {number} defenderMdefPct
     * @returns {{ isHit: true, finalDamage: number, immuneToDebuff: boolean }}
     */
    resolveMagicAttack(attackerMagicDamage, defenderMdefPct = 0) {
        const mdef = Math.max(0, defenderMdefPct || 0);
        if (mdef >= 100) {
            return {
                isHit: true,
                finalDamage: Math.max(1, Math.floor(attackerMagicDamage * 0.5)),
                immuneToDebuff: true
            };
        }
        const finalDamage = Math.max(1, Math.round(attackerMagicDamage * (1 - mdef / 100)));
        return {
            isHit: true,
            finalDamage,
            immuneToDebuff: false
        };
    },

    /**
     * 檢查職業與等級是否可學習指定階位 (tier) 的魔法
     * - 騎士：可學 1~2 級 (8級學1級、16級學2級)
     * - 妖精：可學 1~4 級 (6級學1級，每升6級學下一階)
     * - 法師：可學全部魔法 (4級學1級，每升4級學下一階)
     * @param {JobId} jobId
     * @param {number} tier
     * @param {number} playerLevel
     */
    getMagicLearnRequirement(jobId, tier, playerLevel = 1) {
        const tpl = ClassDefinitions[jobId] || ClassDefinitions.knight;
        const maxTier = tpl.maxMagicTier || 2;
        const step = tpl.magicLevelStep || 8;
        const reqLevel = tier * step;
        if (tier > maxTier) {
            return {
                allowedByClass: false,
                reqLevel,
                meetsLevel: false,
                canLearn: false,
                className: tpl.name,
                maxTier,
                reason: `${tpl.name}僅可學習 1 ~ ${maxTier} 級魔法`
            };
        }
        const meetsLevel = playerLevel >= reqLevel;
        return {
            allowedByClass: true,
            reqLevel,
            meetsLevel,
            canLearn: meetsLevel,
            className: tpl.name,
            maxTier,
            reason: meetsLevel ? '' : `${tpl.name}學習 ${tier} 級魔法需達到 Lv.${reqLevel} (目前 Lv.${playerLevel})`
        };
    },

    /**
     * 檢查角色職業是否可裝備該武器
     * - 騎士限制使用劍類武器 (sword)
     * - 妖精限制使用弓類武器 (bow)
     * - 法師限制使用杖類武器 (staff)
     * @param {JobId} jobId
     * @param {Object} itemData
     */
    canClassEquipWeapon(jobId, itemData) {
        if (!itemData || itemData.type !== 'weapon') return { allowed: true, reason: '' };
        const tpl = ClassDefinitions[jobId] || ClassDefinitions.knight;
        if (Array.isArray(itemData.allowedClasses) && !itemData.allowedClasses.includes(jobId)) {
            return {
                allowed: false,
                reason: `${tpl.name}僅可使用【${tpl.allowedWeaponLabel}】，無法裝備${itemData.name}！`
            };
        }
        if (itemData.weaponCategory && tpl.allowedWeaponCategory && itemData.weaponCategory !== tpl.allowedWeaponCategory) {
            return {
                allowed: false,
                reason: `${tpl.name}僅可使用【${tpl.allowedWeaponLabel}】，無法裝備${itemData.name}！`
            };
        }
        return { allowed: true, reason: '' };
    }
};

/**
 * 角色類別 (LineageCharacter Class) — 封裝屬性、職業成長與戰鬥面板計算
 */
class LineageCharacter {
    /**
     * @param {JobId} jobId
     */
    constructor(jobId = 'knight') {
        const tpl = ClassDefinitions[jobId] || ClassDefinitions.knight;
        this.playerClass = tpl.id;
        this.level = 1;
        this.exp = 0;
        this.maxExp = 100;
        this.statPoints = 0;

        this.str = tpl.initialStats.str;
        this.dex = tpl.initialStats.dex;
        this.con = tpl.initialStats.con;
        this.int = tpl.initialStats.int;
        this.wis = tpl.initialStats.wis;
        this.cha = tpl.initialStats.cha;

        // Lv.1 基礎 HP 與 MP
        this.maxHp = 40 + this.con * 3 + AttributeBreakpoints.getConWisBonus(this.con).hpBonus * 2;
        this.hp = this.maxHp;
        this.maxMp = (jobId === 'mage' ? 60 : (jobId === 'elf' ? 35 : 18)) + this.wis * 3;
        this.mp = this.maxMp;
    }

    /** 升級處理 */
    levelUp() {
        this.level++;
        this.maxExp = Math.floor(this.maxExp * 1.5);
        this.statPoints += 1;
        const hpGain = CombatSystem.rollLevelUpHp(this.playerClass, this.con);
        const mpGain = CombatSystem.rollLevelUpMp(this.playerClass, this.wis);
        this.maxHp += hpGain;
        this.hp = this.maxHp;
        this.maxMp += mpGain;
        this.mp = this.maxMp;
        return { hpGain, mpGain };
    }
}

window.ClassDefinitions = ClassDefinitions;
window.AttributeBreakpoints = AttributeBreakpoints;
window.CombatSystem = CombatSystem;
window.LineageCharacter = LineageCharacter;
