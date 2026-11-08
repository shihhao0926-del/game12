window.ItemDict = {
    // ==========================================
    // 消耗品 (Potions & Buffs)
    // ==========================================
    'redwater': { name: '紅色藥水', image: 'redwater.png', scale: 0.08, type: 'potion', stackable: true, price: 50, desc: '恢復少量體力 (約 30 HP)' },
    'orangewater': { name: '橘色藥水', image: 'orangewater.png', scale: 0.08, type: 'potion', stackable: true, price: 150, desc: '恢復中量體力 (約 80 HP)' },
    'whitewater': { name: '白色藥水', image: 'whitewater.png', scale: 0.08, type: 'potion', stackable: true, price: 500, desc: '恢復大量體力 (約 150 HP)' },
    'bluewater': { name: '藍色藥水', image: 'bluewater.png', scale: 0.08, type: 'potion_buff', stackable: true, price: 1000, desc: '提升魔力恢復速度' },
    'grasswater': { name: '加速藥水 (一階)', image: 'grasswater.png', scale: 0.08, type: 'potion_buff', stackable: true, price: 300, desc: '提升移動與攻擊速度 (持續30秒)' },
    'bravepotion': { name: '勇敢藥水 (騎士)', image: 'bravewater.png', scale: 0.08, type: 'potion_buff', stackable: true, price: 1000, desc: '騎士專用，大幅提升攻擊速度' },
    'elvenwafer': { name: '精靈餅乾 (妖精)', image: 'elfcookies.png', scale: 0.08, type: 'potion_buff', stackable: true, price: 1500, desc: '妖精專用，提升移動與攻擊速度' },

    // ==========================================
    // 卷軸 (Scrolls)
    // ==========================================
    'armsreel': { name: '對武器施法的卷軸 (武卷)', image: 'armsreel.png', scale: 0.08, type: 'scroll_weapon', stackable: true, price: 3000, desc: '永久強化武器，提升攻擊力' },
    'armorreel': { name: '對防具施法的卷軸 (防卷)', image: 'armorreel.png', scale: 0.08, type: 'scroll_armor', stackable: true, price: 1500, desc: '永久強化防具，提升防禦力' },
    'teleportscroll': { name: '傳送回家的卷軸 (回卷)', image: 'homereel.png', scale: 0.08, type: 'scroll_misc', stackable: true, price: 200, desc: '傳送回說話之島村莊安全廣場' },

    // ==========================================
    // 武器 (Weapons) - 安定值通常為 6
    // ==========================================
    /* 近戰武器 */
    'dagger': { name: '匕首', image: 'dagger.png', scale: 0.08, type: 'weapon', equipSlot: 'weapon', weaponType: 'melee', stackable: false, minDmg: 4, maxDmg: 4, safeEnchant: 6, baseSpeed: 450, price: 1000 },
    'sword': { name: '長劍', image: 'sword.png', scale: 0.08, type: 'weapon', equipSlot: 'weapon', weaponType: 'melee', stackable: false, minDmg: 8, maxDmg: 12, safeEnchant: 6, baseSpeed: 550, price: 2000 },
    'rapier': { name: '細劍', image: 'rapier.png', scale: 0.08, type: 'weapon', equipSlot: 'weapon', weaponType: 'melee', stackable: false, minDmg: 11, maxDmg: 6, safeEnchant: 6, baseSpeed: 500, price: 8000 },
    'katana': { name: '武士刀', image: 'katana.png', scale: 0.08, type: 'weapon', equipSlot: 'weapon', weaponType: 'melee', stackable: false, minDmg: 10, maxDmg: 12, safeEnchant: 6, baseSpeed: 500, price: 15000 },
    'greatsword': { name: '雙手劍', image: 'two_hand_sword.png', scale: 0.08, type: 'weapon', equipSlot: 'weapon', weaponType: 'melee', stackable: false, minDmg: 14, maxDmg: 20, safeEnchant: 6, baseSpeed: 650, price: 10000 },
    
    /* 遠程武器 */
    'bow': { name: '十字弓', image: 'bow.png', scale: 0.08, type: 'weapon', equipSlot: 'weapon', weaponType: 'ranged', stackable: false, minDmg: 3, maxDmg: 8, safeEnchant: 6, baseSpeed: 450, price: 2000 },
    'yumibow': { name: '尤米弓', image: 'yumibow.png', scale: 0.08, type: 'weapon', equipSlot: 'weapon', weaponType: 'ranged', stackable: false, minDmg: 6, maxDmg: 10, safeEnchant: 6, baseSpeed: 450, price: 25000 },
    
    /* 魔法武器 */
    'wand': { name: '瑪那魔杖', image: 'wand.png', scale: 0.08, type: 'weapon', equipSlot: 'weapon', weaponType: 'magic', stackable: false, minDmg: 2, maxDmg: 5, safeEnchant: 6, baseSpeed: 700, price: 2000 },
    'crystalwand': { name: '水晶魔杖', image: 'crystalwand.png', scale: 0.08, type: 'weapon', equipSlot: 'weapon', weaponType: 'magic', stackable: false, minDmg: 3, maxDmg: 6, safeEnchant: 6, baseSpeed: 700, price: 10000 },
    'powerstaff': { name: '力杖', image: 'powerwand.png', scale: 0.08, type: 'weapon', equipSlot: 'weapon', weaponType: 'melee', stackable: false, minDmg: 9, maxDmg: 12, strBonus: 3, safeEnchant: 6, baseSpeed: 600, price: 8000, desc: '力量 +3' }, 

    // ==========================================
    // 防具 (Armor) - 安定值通常為 4，精靈製品為 6
    // ==========================================
    /* 頭盔 */
    'hat': { name: '鐵盔', image: 'hat.png', scale: 0.08, type: 'armor', equipSlot: 'helmet', stackable: false, def: 2, mr: 1, safeEnchant: 4, price: 1000 },
    'knightvisor': { name: '騎士面甲', image: 'knightarmor.png', scale: 0.08, type: 'armor', equipSlot: 'helmet', stackable: false, def: 3, mr: 0, safeEnchant: 4, price: 8000 },
    
    /* 盔甲 */
    'clothing': { name: '金屬盔甲', image: 'clothing.png', scale: 0.08, type: 'armor', equipSlot: 'armor', stackable: false, def: 5, mr: 0, safeEnchant: 4, price: 2500 },
    'magerobe': { name: '法師長袍', image: 'robe.png', scale: 0.08, type: 'armor', equipSlot: 'armor', stackable: false, def: 2, mr: 10, safeEnchant: 4, price: 5000 },
    'elvenchain': { name: '精靈鏈甲', image: 'elfarmor.png', scale: 0.08, type: 'armor', equipSlot: 'armor', stackable: false, def: 6, mr: 5, safeEnchant: 6, price: 15000 },
    
    /* 手套 */
    'gloves': { name: '鋼鐵手套', image: 'gloves.png', scale: 0.8, type: 'armor', equipSlot: 'gloves', stackable: false, def: 1, mr: 0, safeEnchant: 4, price: 1000 },
    'powergloves': { name: '力量手套', image: 'powergloves.png', scale: 0.08, type: 'armor', equipSlot: 'gloves', stackable: false, def: 1, mr: 0, strBonus: 2, safeEnchant: 4, price: 30000, desc: '力量 +2' },
    
    /* 鞋子 */
    'shoe': { name: '鋼鐵長靴', image: 'shoe.png', scale: 0.08, type: 'armor', equipSlot: 'shoes', stackable: false, def: 2, mr: 0, safeEnchant: 4, price: 1200 },
    'ironboots': { name: '長靴', image: 'boots.png', scale: 0.08, type: 'armor', equipSlot: 'shoes', stackable: false, def: 3, mr: 0, safeEnchant: 4, price: 4000 }
};