#  PROJETO FORNT-END
!https://github.com/deilsongilmar-web/Aula-21/issues/3#issue-3863319146)
---

# ⚔️ Gerenciador de Ficha D&D 5e

Uma aplicação web leve e intuitiva para criação e gerenciamento de fichas de personagens para **Dungeons & Dragons 5ª Edição**. Ideal para mestres e jogadores que buscam agilidade durante as sessões de RPG.

## 🚀 Funcionalidades

O sistema oferece um painel completo dividido em três colunas estratégicas:

* **Informações Básicas & Atributos:** Controle de Raça, Classe, Nível e os 6 atributos principais (FOR, DES, CON, INT, SAB, CAR) com cálculo automático de modificadores.
* **Combate Real-time:** Gestão de Pontos de Vida (PV) atuais e máximos, Classe de Armadura (CA) e Iniciativa.
* **Perícias e Habilidades:** Checkbox para proficiências em perícias vinculadas aos atributos correspondentes.
* **Gestão de Itens:** Adicione ou remova armas (com campos de dano) e gerencie seu inventário dinamicamente.
* **Economia:** Controle detalhado de moedas (Platina, Ouro, Prata e Cobre).
* **Persistência de Dados:** Opções para salvar e carregar fichas localmente, além de um campo de notas para histórico de campanha.

## 🛠️ Tecnologias Utilizadas

Este projeto utiliza tecnologias puras (Vanilla) para garantir máxima performance e compatibilidade:

* **HTML5:** Estrutura semântica e formulários.
* **CSS3:** Layout responsivo baseado em Grid e Flexbox (via `styles.css`).
* **JavaScript (ES6+):** Lógica de manipulação de DOM, cálculos e armazenamento (via `app.js`).

## 📋 Estrutura do Projeto

A interface foi projetada para ser scannable (fácil de ler de relance):

1. **Painel Esquerdo:** Identidade do herói e atributos físicos/mentais.
2. **Painel Central:** Perícias detalhadas e arsenal de armas.
3. **Painel Direito:** Mochila (inventário), tesouros e diário de aventuras.

## 💻 Como utilizar

1. Faça o download ou clone este repositório:
```bash
git clone https://github.com/seu-usuario/seu-repositorio.git

```


2. Abra o arquivo `index.html` em qualquer navegador moderno.
3. Preencha os dados do seu personagem.
4. Utilize o botão **Salvar** para guardar seu progresso no navegador.

## 🤝 Contribuições

Este é um projeto de código aberto. Sinta-se à vontade para:

* Adicionar novos cálculos automáticos (ex: Salvaguardas).
* Melhorar o design responsivo para dispositivos móveis.
* Implementar exportação da ficha em PDF.

---

**Desenvolvido para aventureiros por [Deilson Mendes/GitHub]**

---

### Dica de ouro para o seu repositório:

Como o seu HTML chama um arquivo `app.js` e um `styles.css`, certifique-se de que esses arquivos existam na mesma pasta. Se você ainda não implementou a lógica de "Salvar" no JavaScript, eu posso te ajudar a criar o código básico para o `app.js` usando `localStorage`.

**Gostaria que eu gerasse o código JavaScript básico para as funções de Salvar e Calcular Atributos?**
