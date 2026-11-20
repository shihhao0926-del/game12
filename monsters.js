const MonsterDictionary = {
    // === 基礎怪物 (Imagen 3.0 天堂1風格重繪版) ===
    'goblin': { 
        id: 'goblin', name: '哥布林', image: 'goblin.png', rawAsset: 'mon_goblin_raw.jpg', flipHoriz: true, scale: 0.68, 
        stats: { hp: 90, minDmg: 12, maxDmg: 18, hitRate: 74, pdef: 4, mdef: 5, speed: 90, exp: 25, aggroRange: 300, attackRange: 55, attackCooldown: 1200 }, 
        lootTable: { 'redwater': 0.3, 'sword': 0.05, 'armsreel': 0.01 } 
    },
    'werewolf': { 
        id: 'werewolf', name: '狼人', image: 'werewolf.png', rawAsset: 'mon_werewolf_raw.jpg', flipHoriz: false, scale: 0.82, 
        stats: { hp: 200, minDmg: 25, maxDmg: 35, hitRate: 80, pdef: 10, mdef: 10, speed: 130, exp: 80, aggroRange: 350, attackRange: 65, attackCooldown: 1000 }, 
        lootTable: { 'orangewater': 0.2, 'clothing': 0.05, 'armorreel': 0.01 } 
    },
    'orc': { 
        id: 'orc', name: '妖魔', image: 'orc.png', rawAsset: 'mon_orc_raw.jpg', flipHoriz: false, scale: 0.76, 
        stats: { hp: 120, minDmg: 10, maxDmg: 15, hitRate: 75, pdef: 5, mdef: 5, speed: 70, exp: 30, aggroRange: 250, attackRange: 60, attackCooldown: 1500 }, 
        lootTable: { 'redwater': 0.4, 'hat': 0.05, 'armsreel': 0.02 } 
    },
    'slime': { 
        id: 'slime', name: '史萊姆', image: 'slime.png', rawAsset: 'mon_slime_raw.jpg', flipHoriz: false, scale: 0.54, 
        stats: { hp: 80, minDmg: 5, maxDmg: 8, hitRate: 70, pdef: 2, mdef: 0, speed: 45, exp: 15, aggroRange: 150, attackRange: 45, attackCooldown: 2000 }, 
        lootTable: { 'redwater': 0.5 } 
    },
    
    // === 進階怪物 (Imagen 3.0 天堂1風格重繪版) ===
    'minotaur': { 
        id: 'minotaur', name: '牛頭人', image: 'minotaur.png', rawAsset: 'mon_minotaur_raw.jpg', flipHoriz: true,
        scale: 1.02,
        stats: { hp: 180, minDmg: 15, maxDmg: 35, hitRate: 80, pdef: 12, mdef: 10, speed: 55, exp: 80, aggroRange: 300, attackRange: 70, attackCooldown: 1800 }, 
        lootTable: { 'whitewater': 0.3, 'armsreel': 0.05, 'armorreel': 0.05 } 
    },
    'shelob': { 
        id: 'shelob', name: '夏洛伯', image: 'shelob.png', rawAsset: 'mon_shelob_raw.jpg', flipHoriz: true,
        scale: 0.92,
        stats: { hp: 80, minDmg: 8, maxDmg: 20, hitRate: 78, pdef: 8, mdef: 10, speed: 130, exp: 50, aggroRange: 350, attackRange: 55, attackCooldown: 900 }, 
        lootTable: { 'orangewater': 0.4, 'shoe': 0.05, 'armorreel': 0.02 } 
    },
    'skeleton_archer': { 
        id: 'skeleton_archer', name: '骷髏弓箭手', image: 'skeleton_archer.png', rawAsset: 'mon_skeleton_archer_raw.jpg', flipHoriz: false,
        scale: 0.76,
        isRanged: true,               // 標記為遠程怪
        projectile: 'eff_magicarrow', // 使用與妖精相同的魔法箭特效
        projScale: 0.25,              // 將魔法箭比例再縮小一半 (0.5 的一半)
        stats: { hp: 40, minDmg: 6, maxDmg: 18, hitRate: 76, pdef: 5, mdef: 5, speed: 60, exp: 40, aggroRange: 400, attackRange: 350, attackCooldown: 1800 }, 
        lootTable: { 'redwater': 0.3, 'bow': 0.1, 'armsreel': 0.03 } 
    },

    // === 骨龍之巢專屬龍族小怪 (Imagen 3.0 天堂1風格設計) ===
    'young_drake': {
        id: 'young_drake', name: '幼龍 ‧ 德雷克', image: 'young_drake.png', rawAsset: 'mon_young_drake_raw.jpg', flipHoriz: true,
        scale: 0.96, isLairMonster: true, dungeon: 'lair',
        stats: { hp: 260, minDmg: 18, maxDmg: 32, hitRate: 82, pdef: 12, mdef: 15, speed: 95, exp: 160, aggroRange: 340, attackRange: 65, attackCooldown: 1200 },
        lootTable: { 'orangewater': 0.45, 'whitewater': 0.25, 'armsreel': 0.06, 'armorreel': 0.06, 'sword': 0.06 }
    },
    'bone_wyvern': {
        id: 'bone_wyvern', name: '骸骨飛龍', image: 'bone_wyvern.png', rawAsset: 'mon_bone_wyvern_raw.jpg', flipHoriz: true,
        scale: 0.98, isLairMonster: true, dungeon: 'lair',
        isRanged: true,
        projectile: 'eff_firearrow',
        projScale: 0.52,
        stats: { hp: 220, minDmg: 16, maxDmg: 30, hitRate: 83, pdef: 10, mdef: 15, speed: 110, exp: 180, aggroRange: 380, attackRange: 280, attackCooldown: 1600 },
        lootTable: { 'orangewater': 0.40, 'bluewater': 0.30, 'armsreel': 0.07, 'armorreel': 0.07, 'bow': 0.06, 'wand': 0.06 }
    },
    'dragon_warrior': {
        id: 'dragon_warrior', name: '龍骨近衛', image: 'dragon_warrior.png', rawAsset: 'mon_dragon_warrior_raw.jpg', flipHoriz: false,
        scale: 1.04, isLairMonster: true, dungeon: 'lair',
        stats: { hp: 340, minDmg: 22, maxDmg: 42, hitRate: 85, pdef: 15, mdef: 20, speed: 85, exp: 240, aggroRange: 340, attackRange: 75, attackCooldown: 1350 },
        lootTable: { 'whitewater': 0.45, 'armsreel': 0.10, 'armorreel': 0.10, 'clothing': 0.08, 'gloves': 0.08 }
    },

    // === 惡魔之淵專屬惡魔族小怪 (Imagen 3.0 天堂1風格設計) ===
    'imp': {
        id: 'imp', name: '炎獄小魔', image: 'imp.png', rawAsset: 'mon_imp_raw.jpg', flipHoriz: true,
        scale: 0.84, dungeon: 'abyss',
        isRanged: true,
        projectile: 'eff_firearrow',
        projScale: 0.5,
        stats: { hp: 320, minDmg: 22, maxDmg: 38, hitRate: 86, pdef: 14, mdef: 20, speed: 115, exp: 260, aggroRange: 400, attackRange: 300, attackCooldown: 1500 },
        lootTable: { 'whitewater': 0.35, 'bluewater': 0.30, 'armsreel': 0.08, 'armorreel': 0.08, 'wand': 0.06 }
    },
    'hell_hound': {
        id: 'hell_hound', name: '地獄犬', image: 'hell_hound.png', rawAsset: 'mon_hell_hound_raw.jpg', flipHoriz: true,
        scale: 0.98, dungeon: 'abyss',
        stats: { hp: 400, minDmg: 26, maxDmg: 44, hitRate: 88, pdef: 16, mdef: 20, speed: 150, exp: 300, aggroRange: 380, attackRange: 65, attackCooldown: 1000 },
        lootTable: { 'whitewater': 0.45, 'grasswater': 0.20, 'armsreel': 0.08, 'armorreel': 0.08, 'shoe': 0.07 }
    },
    'demon_guard': {
        id: 'demon_guard', name: '深淵魔衛', image: 'demon_guard.png', rawAsset: 'mon_demon_guard_raw.jpg', flipHoriz: true,
        scale: 1.08, dungeon: 'abyss',
        stats: { hp: 520, minDmg: 32, maxDmg: 56, hitRate: 90, pdef: 20, mdef: 25, speed: 85, exp: 380, aggroRange: 340, attackRange: 80, attackCooldown: 1400 },
        lootTable: { 'whitewater': 0.50, 'armsreel': 0.12, 'armorreel': 0.12, 'sword': 0.08, 'clothing': 0.08 }
    },

    // === 火焰之谷專屬火焰系小怪 (Imagen 3.0 天堂1風格設計) ===
    'fire_spirit': {
        id: 'fire_spirit', name: '烈焰精靈', image: 'fire_spirit.png', rawAsset: 'mon_fire_spirit_raw.jpg', flipHoriz: false,
        scale: 0.90, dungeon: 'fire_valley',
        isRanged: true,
        projectile: 'eff_firearrow',
        projScale: 0.56,
        stats: { hp: 460, minDmg: 28, maxDmg: 48, hitRate: 90, pdef: 18, mdef: 30, speed: 115, exp: 380, aggroRange: 400, attackRange: 310, attackCooldown: 1450 },
        lootTable: { 'whitewater': 0.45, 'bluewater': 0.35, 'armsreel': 0.10, 'armorreel': 0.10, 'wand': 0.08 }
    },
    'lava_golem': {
        id: 'lava_golem', name: '熔岩巨像', image: 'lava_golem.png', rawAsset: 'mon_lava_golem_raw.jpg', flipHoriz: true,
        scale: 1.12, dungeon: 'fire_valley',
        stats: { hp: 680, minDmg: 38, maxDmg: 66, hitRate: 92, pdef: 25, mdef: 25, speed: 75, exp: 520, aggroRange: 340, attackRange: 80, attackCooldown: 1550 },
        lootTable: { 'whitewater': 0.55, 'armsreel': 0.14, 'armorreel': 0.14, 'hat': 0.08, 'gloves': 0.08 }
    },
    'fire_lizard': {
        id: 'fire_lizard', name: '火蜥蜴狂戰', image: 'fire_lizard.png', rawAsset: 'mon_fire_lizard_raw.jpg', flipHoriz: true,
        scale: 1.02, dungeon: 'fire_valley',
        stats: { hp: 560, minDmg: 34, maxDmg: 58, hitRate: 92, pdef: 20, mdef: 25, speed: 125, exp: 450, aggroRange: 370, attackRange: 72, attackCooldown: 1150 },
        lootTable: { 'whitewater': 0.50, 'grasswater': 0.25, 'armsreel': 0.12, 'armorreel': 0.12, 'sword': 0.09 }
    },

    // === Boss 怪 (Imagen 3.0 天堂1風格重繪版) ===
    'demon': { 
        id: 'demon', name: '惡魔', image: 'demon.png', rawAsset: 'mon_demon_raw.jpg', flipHoriz: true, scale: 1.25, isBoss: true, 
        stats: { hp: 1500, minDmg: 30, maxDmg: 60, hitRate: 92, pdef: 20, mdef: 30, speed: 80, exp: 1000, aggroRange: 500, attackRange: 300, attackCooldown: 1500 }, 
        lootTable: { 'whitewater': 1, 'armsreel': 0.5, 'wand': 0.2 } 
    },
    'death_knight': { 
        id: 'death_knight', name: '惡魔騎士', image: 'death_knight.png', rawAsset: 'mon_death_knight_raw.jpg', flipHoriz: false, scale: 1.35, isBoss: true, dungeon: 'abyss',
        stats: { hp: 2800, minDmg: 32, maxDmg: 64, hitRate: 95, pdef: 22, mdef: 30, speed: 90, exp: 3500, aggroRange: 520, attackRange: 330, attackCooldown: 1500 }, 
        lootTable: { 'whitewater': 1, 'armorreel': 0.7, 'armsreel': 0.5, 'sword': 0.25 } 
    },
    'bones_dragon': { 
        id: 'bones_dragon', name: '骨龍', image: 'bones_dragon.png', rawAsset: 'mon_bones_dragon_raw.jpg', flipHoriz: true, scale: 1.55, isBoss: true, isLairBoss: true, dungeon: 'lair',
        stats: { hp: 3500, minDmg: 45, maxDmg: 95, hitRate: 96, pdef: 25, mdef: 35, speed: 95, exp: 5000, aggroRange: 520, attackRange: 360, attackCooldown: 1800 }, 
        lootTable: { 'whitewater': 1, 'armsreel': 0.85, 'armorreel': 0.85 } 
    },
    'fire_qilin': {
        id: 'fire_qilin', name: '火焰麒麟獸', image: 'fire_qilin.png', rawAsset: 'mon_fire_qilin_raw.jpg', flipHoriz: true, scale: 1.50, isBoss: true, dungeon: 'fire_valley',
        stats: { hp: 4200, minDmg: 48, maxDmg: 98, hitRate: 98, pdef: 28, mdef: 40, speed: 105, exp: 6000, aggroRange: 540, attackRange: 360, attackCooldown: 1550 },
        lootTable: { 'whitewater': 1, 'armsreel': 0.90, 'armorreel': 0.90, 'sword': 0.35, 'wand': 0.35, 'bow': 0.35 }
    }
};