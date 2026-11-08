const MonsterDictionary = {
    // === 基礎怪物 (Imagen 3.0 天堂1風格重繪版) ===
    'goblin': { 
        id: 'goblin', name: '哥布林', image: 'goblin.png', rawAsset: 'mon_goblin_raw.jpg', flipHoriz: true, scale: 0.68, 
        stats: { hp: 90, minDmg: 12, maxDmg: 18, speed: 90, exp: 25, aggroRange: 300, attackRange: 55, attackCooldown: 1200 }, 
        lootTable: { 'redwater': 0.3, 'sword': 0.05, 'armsreel': 0.01 } 
    },
    'werewolf': { 
        id: 'werewolf', name: '狼人', image: 'werewolf.png', rawAsset: 'mon_werewolf_raw.jpg', flipHoriz: false, scale: 0.82, 
        stats: { hp: 200, minDmg: 25, maxDmg: 35, speed: 130, exp: 80, aggroRange: 350, attackRange: 65, attackCooldown: 1000 }, 
        lootTable: { 'orangewater': 0.2, 'clothing': 0.05, 'armorreel': 0.01 } 
    },
    'orc': { 
        id: 'orc', name: '妖魔', image: 'orc.png', rawAsset: 'mon_orc_raw.jpg', flipHoriz: false, scale: 0.76, 
        stats: { hp: 120, minDmg: 10, maxDmg: 15, speed: 70, exp: 30, aggroRange: 250, attackRange: 60, attackCooldown: 1500 }, 
        lootTable: { 'redwater': 0.4, 'hat': 0.05, 'armsreel': 0.02 } 
    },
    'slime': { 
        id: 'slime', name: '史萊姆', image: 'slime.png', rawAsset: 'mon_slime_raw.jpg', flipHoriz: false, scale: 0.54, 
        stats: { hp: 80, minDmg: 5, maxDmg: 8, speed: 45, exp: 15, aggroRange: 150, attackRange: 45, attackCooldown: 2000 }, 
        lootTable: { 'redwater': 0.5 } 
    },
    
    // === 進階怪物 (Imagen 3.0 天堂1風格重繪版) ===
    'minotaur': { 
        id: 'minotaur', name: '牛頭人', image: 'minotaur.png', rawAsset: 'mon_minotaur_raw.jpg', flipHoriz: true,
        scale: 1.02,
        stats: { hp: 180, minDmg: 15, maxDmg: 35, speed: 55, exp: 80, aggroRange: 300, attackRange: 70, attackCooldown: 1800 }, 
        lootTable: { 'whitewater': 0.3, 'armsreel': 0.05, 'armorreel': 0.05 } 
    },
    'shelob': { 
        id: 'shelob', name: '夏洛伯', image: 'shelob.png', rawAsset: 'mon_shelob_raw.jpg', flipHoriz: true,
        scale: 0.92,
        stats: { hp: 80, minDmg: 8, maxDmg: 20, speed: 130, exp: 50, aggroRange: 350, attackRange: 55, attackCooldown: 900 }, 
        lootTable: { 'orangewater': 0.4, 'shoe': 0.05, 'armorreel': 0.02 } 
    },
    'skeleton_archer': { 
        id: 'skeleton_archer', name: '骷髏弓箭手', image: 'skeleton_archer.png', rawAsset: 'mon_skeleton_archer_raw.jpg', flipHoriz: false,
        scale: 0.76,
        isRanged: true,               // 標記為遠程怪
        projectile: 'eff_magicarrow', // 使用與妖精相同的魔法箭特效
        projScale: 0.25,              // 將魔法箭比例再縮小一半 (0.5 的一半)
        stats: { hp: 40, minDmg: 6, maxDmg: 18, speed: 60, exp: 40, aggroRange: 400, attackRange: 350, attackCooldown: 1800 }, 
        lootTable: { 'redwater': 0.3, 'bow': 0.1, 'armsreel': 0.03 } 
    },

    // === Boss 怪 (Imagen 3.0 天堂1風格重繪版) ===
    'demon': { 
        id: 'demon', name: '惡魔', image: 'demon.png', rawAsset: 'mon_demon_raw.jpg', flipHoriz: true, scale: 1.25, isBoss: true, 
        stats: { hp: 1500, minDmg: 30, maxDmg: 60, speed: 80, exp: 1000, aggroRange: 500, attackRange: 300, attackCooldown: 1500 }, 
        lootTable: { 'whitewater': 1, 'armsreel': 0.5, 'wand': 0.2 } 
    },
    'death_knight': { 
        id: 'death_knight', name: '死亡騎士', image: 'death_knight.png', rawAsset: 'mon_death_knight_raw.jpg', flipHoriz: false, scale: 1.25, isBoss: true, 
        stats: { hp: 2000, minDmg: 40, maxDmg: 80, speed: 90, exp: 2000, aggroRange: 500, attackRange: 350, attackCooldown: 1200 }, 
        lootTable: { 'whitewater': 1, 'armorreel': 0.5, 'sword': 0.2 } 
    },
    'bones_dragon': { 
        id: 'bones_dragon', name: '骨龍', image: 'bones_dragon.png', rawAsset: 'mon_bones_dragon_raw.jpg', flipHoriz: true, scale: 1.50, isBoss: true, 
        stats: { hp: 3500, minDmg: 50, maxDmg: 120, speed: 100, exp: 5000, aggroRange: 600, attackRange: 400, attackCooldown: 2000 }, 
        lootTable: { 'whitewater': 1, 'armsreel': 0.8, 'armorreel': 0.8 } 
    }
};