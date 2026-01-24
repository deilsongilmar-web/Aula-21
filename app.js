// ============================================
// D&D 5e Character Sheet Manager
// ============================================

// Data Structure
let character = {
    name: '',
    class: '',
    race: '',
    level: 1,
    attributes: {
        for: 10,
        des: 10,
        con: 10,
        int: 10,
        sab: 10,
        car: 10
    },
    hp: { max: 10, current: 10 },
    ac: 10,
    skills: {},
    weapons: [],
    inventory: [],
    currency: { platinum: 0, gold: 0, silver: 0, copper: 0 },
    notes: ''
};

// Perícias e seus atributos associados
const skillsMap = {
    'acrobacia': 'des',
    'adestramento': 'sab',
    'arcanismo': 'int',
    'atletismo': 'for',
    'atuacao': 'car',
    'enganacao': 'car',
    'furtividade': 'des',
    'historia': 'int',
    'insight': 'sab',
    'intimidacao': 'car',
    'investigacao': 'int',
    'medicina': 'sab',
    'natureza': 'int',
    'percepcao': 'sab',
    'persuasao': 'car',
    'religiao': 'int',
    'sobrevivencia': 'sab',
    'prestidigitacao': 'des'
};

// Inicializar perícias
Object.keys(skillsMap).forEach(skill => {
    character.skills[skill] = 0;
});

// ============================================
// CÁLCULOS
// ============================================

function calculateModifier(attributeValue) {
    return Math.floor((attributeValue - 10) / 2);
}

function updateModifiers() {
    ['for', 'des', 'con', 'int', 'sab', 'car'].forEach(attr => {
        const value = parseInt(document.getElementById(`attr-${attr}`).value);
        const modifier = calculateModifier(value);
        document.getElementById(`mod-${attr}`).textContent = 
            modifier >= 0 ? `+${modifier}` : `${modifier}`;
        character.attributes[attr] = value;
    });
    
    updateSkillsModifiers();
    updateInitiative();
}

function updateSkillsModifiers() {
    document.querySelectorAll('.skill-check').forEach(checkbox => {
        const skill = checkbox.dataset.skill;
        const relatedAttr = skillsMap[skill];
        const attributeValue = character.attributes[relatedAttr];
        const baseModifier = calculateModifier(attributeValue);
        
        const skillElement = checkbox.closest('.skill');
        const modElement = skillElement.querySelector('.skill-mod');
        modElement.textContent = baseModifier >= 0 ? `+${baseModifier}` : `${baseModifier}`;
    });
}

function updateInitiative() {
    const desModifier = calculateModifier(character.attributes.des);
    document.getElementById('initiative').textContent = 
        desModifier >= 0 ? `+${desModifier}` : `${desModifier}`;
}

// ============================================
// SINCRONIZAR COM INTERFACE
// ============================================

function syncFromUI() {
    character.name = document.getElementById('charName').value;
    character.class = document.getElementById('charClass').value;
    character.race = document.getElementById('charRace').value;
    character.level = parseInt(document.getElementById('charLevel').value);
    
    character.hp.max = parseInt(document.getElementById('hpMax').value);
    character.hp.current = parseInt(document.getElementById('hpCurrent').value);
    character.ac = parseInt(document.getElementById('ac').value);
    
    character.currency.platinum = parseInt(document.getElementById('platinum').value);
    character.currency.gold = parseInt(document.getElementById('gold').value);
    character.currency.silver = parseInt(document.getElementById('silver').value);
    character.currency.copper = parseInt(document.getElementById('copper').value);
    
    character.notes = document.getElementById('notes').value;
    
    // Armas
    character.weapons = [];
    document.querySelectorAll('.weapon-name').forEach((nameInput, index) => {
        const name = nameInput.value.trim();
        const damage = nameInput.parentElement.querySelector('.weapon-damage').value.trim();
        if (name && damage) {
            character.weapons.push({ name, damage });
        }
    });
    
    // Inventário
    character.inventory = [];
    document.querySelectorAll('.inv-name').forEach((nameInput, index) => {
        const name = nameInput.value.trim();
        const qty = parseInt(nameInput.parentElement.querySelector('.inv-qty').value);
        if (name) {
            character.inventory.push({ name, qty });
        }
    });
    
    // Perícias
    document.querySelectorAll('.skill-check').forEach(checkbox => {
        character.skills[checkbox.dataset.skill] = checkbox.checked ? 1 : 0;
    });
}

function syncToUI(char) {
    character = { ...character, ...char };
    
    document.getElementById('charName').value = character.name || '';
    document.getElementById('charClass').value = character.class || '';
    document.getElementById('charRace').value = character.race || '';
    document.getElementById('charLevel').value = character.level || 1;
    
    ['for', 'des', 'con', 'int', 'sab', 'car'].forEach(attr => {
        document.getElementById(`attr-${attr}`).value = character.attributes[attr];
    });
    
    document.getElementById('hpMax').value = character.hp.max;
    document.getElementById('hpCurrent').value = character.hp.current;
    document.getElementById('ac').value = character.ac;
    
    document.getElementById('platinum').value = character.currency.platinum;
    document.getElementById('gold').value = character.currency.gold;
    document.getElementById('silver').value = character.currency.silver;
    document.getElementById('copper').value = character.currency.copper;
    
    document.getElementById('notes').value = character.notes;
    
    // Limpar armas
    document.getElementById('weaponsList').innerHTML = '';
    character.weapons.forEach(weapon => {
        const weaponDiv = document.createElement('div');
        weaponDiv.className = 'item';
        weaponDiv.innerHTML = `
            <input type="text" placeholder="Nome da arma" class="weapon-name" value="${weapon.name}">
            <input type="text" placeholder="Dano (ex: 1d8+2)" class="weapon-damage" value="${weapon.damage}">
            <button class="btn btn-danger btn-sm" onclick="removeWeapon(this)">✕</button>
        `;
        document.getElementById('weaponsList').appendChild(weaponDiv);
    });
    if (character.weapons.length === 0) {
        addWeapon();
    }
    
    // Limpar inventário
    document.getElementById('inventoryList').innerHTML = '';
    character.inventory.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'inventory-item';
        itemDiv.innerHTML = `
            <input type="text" placeholder="Item" class="inv-name" value="${item.name}">
            <input type="number" placeholder="Qtd" min="1" value="${item.qty}" class="inv-qty">
            <button class="btn btn-danger btn-sm" onclick="removeInventoryItem(this)">✕</button>
        `;
        document.getElementById('inventoryList').appendChild(itemDiv);
    });
    if (character.inventory.length === 0) {
        addInventoryItem();
    }
    
    // Perícias
    document.querySelectorAll('.skill-check').forEach(checkbox => {
        checkbox.checked = character.skills[checkbox.dataset.skill] === 1;
    });
    
    updateModifiers();
}

// ============================================
// ARMAS
// ============================================

function addWeapon() {
    const container = document.getElementById('weaponsList');
    const div = document.createElement('div');
    div.className = 'item';
    div.innerHTML = `
        <input type="text" placeholder="Nome da arma" class="weapon-name">
        <input type="text" placeholder="Dano (ex: 1d8+2)" class="weapon-damage">
        <button class="btn btn-danger btn-sm" onclick="removeWeapon(this)">✕</button>
    `;
    container.appendChild(div);
}

function removeWeapon(button) {
    button.parentElement.remove();
}

// ============================================
// INVENTÁRIO
// ============================================

function addInventoryItem() {
    const container = document.getElementById('inventoryList');
    const div = document.createElement('div');
    div.className = 'inventory-item';
    div.innerHTML = `
        <input type="text" placeholder="Item" class="inv-name">
        <input type="number" placeholder="Qtd" min="1" value="1" class="inv-qty">
        <button class="btn btn-danger btn-sm" onclick="removeInventoryItem(this)">✕</button>
    `;
    container.appendChild(div);
}

function removeInventoryItem(button) {
    button.parentElement.remove();
}

// ============================================
// SALVAMENTO
// ============================================

function saveCharacter() {
    syncFromUI();
    const charName = character.name || 'Personagem sem nome';
    const timestamp = new Date().toLocaleString('pt-BR');
    
    const savedChars = JSON.parse(localStorage.getItem('dndCharacters') || '[]');
    
    // Procurar se já existe um personagem com este nome
    const existingIndex = savedChars.findIndex(c => c.name === character.name);
    
    if (existingIndex >= 0) {
        savedChars[existingIndex] = { ...character, savedAt: timestamp };
        alert(`✓ Ficha de "${charName}" atualizada!`);
    } else {
        savedChars.push({ ...character, savedAt: timestamp });
        alert(`✓ Ficha de "${charName}" salva!`);
    }
    
    localStorage.setItem('dndCharacters', JSON.stringify(savedChars));
}

function loadCharacterList() {
    const savedChars = JSON.parse(localStorage.getItem('dndCharacters') || '[]');
    const container = document.getElementById('savedChars');
    container.innerHTML = '';
    
    if (savedChars.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #999;">Nenhuma ficha salva</p>';
        return;
    }
    
    savedChars.forEach((char, index) => {
        const btn = document.createElement('button');
        btn.className = 'saved-char-btn';
        btn.innerHTML = `
            <div>
                <strong>${char.name || 'Sem nome'}</strong>
                <small style="display: block; color: #999;">Nível ${char.level} ${char.class} (${char.race})</small>
            </div>
            <button class="btn btn-danger btn-sm" onclick="event.stopPropagation(); deleteCharacter(${index})">Deletar</button>
        `;
        btn.onclick = () => {
            syncToUI(char);
            closeLoadModal();
        };
        container.appendChild(btn);
    });
}

function deleteCharacter(index) {
    if (confirm('Tem certeza que deseja deletar esta ficha?')) {
        const savedChars = JSON.parse(localStorage.getItem('dndCharacters') || '[]');
        savedChars.splice(index, 1);
        localStorage.setItem('dndCharacters', JSON.stringify(savedChars));
        loadCharacterList();
        alert('✓ Ficha deletada!');
    }
}

function openLoadModal() {
    document.getElementById('loadModal').style.display = 'flex';
    loadCharacterList();
}

function closeLoadModal() {
    document.getElementById('loadModal').style.display = 'none';
}

// ============================================
// NOVA FICHA
// ============================================

function newCharacter() {
    if (document.getElementById('charName').value && 
        !confirm('Descartar ficha atual e criar uma nova?')) {
        return;
    }
    
    character = {
        name: '',
        class: '',
        race: '',
        level: 1,
        attributes: {
            for: 10,
            des: 10,
            con: 10,
            int: 10,
            sab: 10,
            car: 10
        },
        hp: { max: 10, current: 10 },
        ac: 10,
        skills: {},
        weapons: [],
        inventory: [],
        currency: { platinum: 0, gold: 0, silver: 0, copper: 0 },
        notes: ''
    };
    
    Object.keys(skillsMap).forEach(skill => {
        character.skills[skill] = 0;
    });
    
    syncToUI(character);
    alert('✓ Nova ficha criada!');
}

// ============================================
// EVENT LISTENERS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar
    syncToUI(character);
    
    // Atributos
    document.querySelectorAll('.attr-input').forEach(input => {
        input.addEventListener('change', updateModifiers);
        input.addEventListener('input', updateModifiers);
    });
    
    // Botões
    document.getElementById('newCharBtn').addEventListener('click', newCharacter);
    document.getElementById('saveBtn').addEventListener('click', saveCharacter);
    document.getElementById('loadBtn').addEventListener('click', openLoadModal);
    
    // Modal
    document.getElementById('loadModal').addEventListener('click', function(e) {
        if (e.target === this) closeLoadModal();
    });
    
    // Perícias
    document.querySelectorAll('.skill-check').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            syncFromUI();
        });
    });
    
    // HP
    document.getElementById('hpCurrent').addEventListener('change', () => {
        const current = parseInt(document.getElementById('hpCurrent').value);
        const max = parseInt(document.getElementById('hpMax').value);
        if (current > max) {
            document.getElementById('hpCurrent').value = max;
        }
    });
});

// Auto-save a cada mudança (opcional)
document.addEventListener('input', () => {
    // Você pode descomentar para auto-save
    // syncFromUI();
});
