# V7 IMPORTS — catálogo digital

Site de uma página só, sem carrinho e sem checkout. Todo botão leva pro WhatsApp
com a mensagem já escrita.

Para abrir: dê dois cliques em **index.html**.
Não precisa instalar nada, não precisa de servidor.

---

## 1. Antes de publicar — troque 3 coisas

Abra `assets/catalogo.js` no Bloco de Notas (ou em qualquer editor) e edite o
começo do arquivo:

```js
const V7_CONFIG = {
  whatsapp: "5511999999999",              // 55 + DDD + número, só dígitos
  instagram: "https://instagram.com/v7imports",
  instagramHandle: "@v7imports",
  cidade: "SÃO PAULO — BR",
  mensagemGeral: "Olá! Cheguei pelo site da V7 Imports..."
};
```

> O número **5511999999999** é só um exemplo. Enquanto não trocar, os botões
> abrem uma conversa com um número inexistente.

---

## 2. Adicionar ou editar um produto

Ainda em `assets/catalogo.js`, dentro de `V7_PRODUTOS`. Copie um bloco inteiro
(de `{` até `},`) e mude os dados:

```js
{
  id: "V7-024",                    // código interno, não aparece no site
  nome: "NOME DA PEÇA",
  categoria: "camisetas",          // camisetas | conjuntos | moletons | calcas | acessorios
  preco: null,                     // null = "Sob consulta". Para mostrar: preco: 289.9
  descricao: "Duas linhas contando o que a peça tem de bom.",
  detalhe: "Detalhe curto · outro detalhe",
  cores: ["Preto", "Off-white"],
  tamanhos: ["P", "M", "G", "GG"],
  status: "disponivel",            // disponivel | ultimas
  tag: "NEW DROP",                 // "NEW DROP" | "LIMITED" | "RESTOCK" | null
  drop: true,                      // true = aparece também em LANÇAMENTOS
  imagens: [
    { src: "nome-da-foto", pos: "50% 40%" },
    { src: "outra-foto",   pos: "50% 20%" }
  ]
},
```

Cuidados:
- toda linha termina com vírgula, e todo bloco termina com `},`
- texto sempre entre aspas
- o último bloco da lista não precisa de vírgula depois do `}`

Se o site abrir em branco depois de uma edição, foi uma vírgula ou aspas faltando.

### Preços

Todos estão como `preco: null`, que mostra **"Sob consulta"** no card.
Quando quiser mostrar valores, troque por um número: `preco: 289.9`
(vira "R$ 289,90" automaticamente). Dá pra fazer produto por produto.

---

## 3. Colocar fotos novas

Jogue o arquivo dentro de `assets/img/` e use o nome no campo `imagens`:

- **Do jeito mais simples:** salve como `foto-nova.jpg` e escreva
  `{ src: "foto-nova.jpg", pos: "50% 40%" }` — com a extensão. Funciona na hora.
- **Do jeito otimizado (site mais rápido):** salve duas versões em `.webp` —
  `foto-nova.webp` (uns 1500px) e `foto-nova-sm.webp` (uns 780px) — e escreva o
  nome **sem** extensão: `{ src: "foto-nova" }`. O site usa a pequena nos cards e
  a grande quando o cliente abre a peça.

O `pos` é o enquadramento: primeiro número é horizontal, segundo é vertical.
`"50% 20%"` mostra a parte de cima da foto, `"50% 80%"` mostra a de baixo.
Serve pra recortar a mesma foto de jeitos diferentes (dá pra usar uma foto de
look inteiro e enquadrar só o boné, por exemplo).

---

## 4. Trocar os vídeos

Estão em `assets/video/`:

| arquivo | onde aparece |
|---|---|
| `v7-reel-3.mp4` | fundo da primeira tela |
| `v7-reel.mp4` | seção DROP V7 |
| `v7-reel-2.mp4` | sobrando (tem texto queimado na imagem) |

Para trocar, substitua o arquivo mantendo o mesmo nome, ou edite a linha
`<source src="assets/video/...">` no `index.html`.
Vídeo em pé (9:16), curto e sem áudio funciona melhor.

---

## 5. Colocar no ar

A pasta inteira é o site. Qualquer hospedagem serve:

- **Netlify Drop** (netlify.com/drop): arrasta a pasta e sai com um link. Grátis.
- **Vercel / GitHub Pages / hospedagem comum:** sobe a pasta inteira na raiz.

Depois é só apontar o domínio e colocar o link na bio do Instagram.

---

## Estrutura

```
v7-imports/
├─ index.html          o site inteiro (HTML + CSS + JS)
├─ assets/
│  ├─ catalogo.js      produtos, categorias, WhatsApp  ← é aqui que você edita
│  ├─ img/             fotos (.webp otimizado + versões -sm)
│  └─ video/           vídeos de fundo
└─ LEIA-ME.md          este arquivo
```

Tudo somado dá ~7 MB, sendo 4,4 MB só de vídeo. As fotos foram comprimidas
pra ~2,6 MB no total, então a página carrega rápido mesmo no 4G.
