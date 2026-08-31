# V7 IMPORTS — catálogo digital

**No ar:** https://sonouxcoder.github.io/v7imports/
**Repositório:** https://github.com/SonoUXCODER/v7imports

Site sem carrinho e sem checkout. Todo botão leva pro WhatsApp
(**+55 22 99956-5657**) com a mensagem já escrita, com o nome da peça e o
tamanho que o cliente escolheu.

Páginas:

| página | o que é |
|---|---|
| `index.html` | home: capa em vídeo, categorias, vitrine de amostra, drop e o carrossel 3D |
| `camisetas.html` · `conjuntos.html` · `moletons.html` · `calcas.html` · `acessorios.html` | uma landing page por categoria |

As páginas de categoria se montam sozinhas: o produto aparece na página da
categoria que estiver escrita no campo `categoria` dele. Você não precisa
editar HTML nenhum pra isso.

**A home não repete o catálogo inteiro.** A seção "Catálogo V7" é uma
vitrine: mostra 8 peças, uma de cada categoria por vez, com as fotos
surgindo conforme o cliente rola. Quem quer ver tudo vai pela categoria.
Essa escolha é automática — prioriza quem está com `drop: true` — então
você não precisa mexer em nada pra trocar o que aparece lá.

Para ver na sua máquina: dê dois cliques em **index.html**.

---

## 1. Adicionar ou editar um produto

Abra `assets/catalogo.js` (Bloco de Notas serve). Dentro de `V7_PRODUTOS`,
copie um bloco inteiro (de `{` até `},`) e mude os dados:

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
  drop: true,                      // true = entra no carrossel de lançamentos
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

Se o site abrir em branco depois de uma edição, foi vírgula ou aspas faltando.

### Preços

Todos estão como `preco: null`, o que mostra **"Sob consulta"** no card.
Quando quiser mostrar valores, troque por um número: `preco: 289.9`
(vira "R$ 289,90" sozinho). Dá pra fazer produto por produto.

### WhatsApp e Instagram

No começo do mesmo arquivo:

```js
const V7_CONFIG = {
  whatsapp: "5522999565657",                    // 55 + DDD + número
  instagram: "https://instagram.com/v7imports1",
  instagramHandle: "@v7imports1",
  cidade: "CABO FRIO — BÚZIOS",                 // troque se a loja for de outra cidade
  ...
};
```

---

## 2. Colocar fotos novas

Jogue o arquivo em `assets/img/` e use o nome no campo `imagens`:

- **Mais simples:** salve como `foto-nova.jpg` e escreva
  `{ src: "foto-nova.jpg", pos: "50% 40%" }` — com a extensão. Funciona na hora.
- **Otimizado (site mais rápido):** salve duas versões `.webp` —
  `foto-nova.webp` (~1500px) e `foto-nova-sm.webp` (~780px) — e escreva o nome
  **sem** extensão: `{ src: "foto-nova" }`. O site usa a pequena nos cards e a
  grande quando o cliente abre a peça.

O `pos` é o enquadramento: primeiro número horizontal, segundo vertical.
`"50% 20%"` mostra a parte de cima da foto; `"50% 80%"`, a de baixo. Serve pra
recortar a mesma foto de jeitos diferentes (dá pra usar um look inteiro e
enquadrar só o boné, por exemplo).

Para trocar a **capa de uma categoria**, mude o `img` dela em `V7_CATEGORIAS`,
no fim do `catalogo.js`.

---

## 3. Trocar os vídeos

Em `assets/video/`:

| arquivo | onde aparece |
|---|---|
| `v7-reel-3.mp4` | fundo da primeira tela |
| `v7-reel.mp4` | seção DROP V7 |
| `v7-reel-2.mp4` | sobrando (tem texto queimado na imagem) |

Substitua mantendo o mesmo nome, ou edite a linha `<source src="...">` no
`index.html`. Vídeo em pé (9:16), curto e sem áudio funciona melhor.

---

## 4. Publicar as mudanças

O site já está no ar pelo GitHub Pages. Depois de editar, no terminal dentro
da pasta:

```bash
git add -A && git commit -m "atualiza catalogo" && git push
```

Em um ou dois minutos o site novo está no ar no mesmo link. Se quiser um
domínio próprio (ex.: v7imports.com.br), é só apontar o DNS e cadastrar em
Settings → Pages → Custom domain.

---

## Estrutura

```
v7-imports/
├─ index.html               home
├─ camisetas.html …         uma página por categoria (5 arquivos)
├─ assets/
│  ├─ catalogo.js           produtos, categorias, WhatsApp  ← você edita aqui
│  ├─ site.js               comportamento (menu, vitrine, modal, carrossel)
│  ├─ estilo.css            visual do site inteiro
│  ├─ img/                  fotos (.webp otimizado + versões -sm)
│  └─ video/                vídeos de fundo
└─ LEIA-ME.md               este arquivo
```

Fotos ~2,6 MB e vídeos ~4,4 MB no total, então carrega rápido até no 4G.
