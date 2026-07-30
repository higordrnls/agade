# PRD 04 — Catálogo de Produtos

---

# Objetivo

Este documento define a estrutura do catálogo da Agadê, suas entidades, organização comercial e regras de funcionamento.

O catálogo é responsável por apresentar os produtos da marca, organizar coleções, controlar variantes comercializáveis e servir como origem para pedidos e produção.

---

# Estrutura do Catálogo

A Agadê adota uma hierarquia de catálogo baseada em quatro níveis.

```
Coleção (Drop)

↓

Produto

↓

Variante

↓

SKU

↓

Item de Inventário
```

Cada nível possui responsabilidades específicas.

---

# Coleção (Drop)

Uma coleção representa um lançamento oficial da marca.

Exemplos:

- Drop 01
- Drop 02
- Coleção Especial

Cada coleção possui:

- nome;
- descrição;
- manifesto;
- data de lançamento;
- status;
- identidade visual.

Uma coleção pode conter diversos produtos.

---

# Produto

O produto representa o modelo da armação.

Exemplos:

- Início
- Horizonte
- Marco Zero
- Essência

Cada produto possui:

- nome;
- descrição;
- conceito;
- coleção;
- imagens;
- peso aproximado;
- preço base;
- materiais;
- status.

O produto não representa um item vendável.

Ele funciona como modelo principal.

---

# Variante

Uma variante representa uma configuração estética do produto.

Exemplos:

- Preto Fosco
- Branco Translúcido
- Vermelho Translúcido

Cada variante possui:

- cor;
- acabamento;
- imagens próprias;
- disponibilidade.

Uma variante pode gerar um ou mais SKUs.

---

# SKU

O SKU representa a unidade comercializada.

É a menor unidade vendável do catálogo.

Cada SKU possui:

- código único;
- produto;
- variante;
- preço;
- disponibilidade;
- peso;
- tempo estimado de produção.

Pedidos sempre referenciam um SKU.

Nunca apenas um Produto.

---

# Inventário

Cada unidade física produzida pertence ao inventário.

O inventário controla:

- disponibilidade;
- produção;
- rastreabilidade;
- histórico.

Sempre que possível, cada unidade poderá receber um identificador próprio.

---

# Status dos Produtos

Produtos podem assumir os seguintes estados.

## Draft

Produto em desenvolvimento.

Não aparece ao público.

---

## Active

Produto disponível para venda.

---

## Hidden

Produto oculto temporariamente.

Links antigos continuam funcionando quando permitido.

---

## Archived

Produto encerrado.

Mantido apenas para histórico.

---

# Status das Variantes

Cada variante pode ser:

- disponível;
- indisponível;
- descontinuada.

---

# Imagens

Cada produto poderá possuir:

- imagem principal;
- galeria;
- imagens editoriais;
- renders técnicos;
- imagens de lifestyle.

As variantes poderão possuir imagens específicas.

---

# Informações Técnicas

Cada SKU deverá armazenar:

- peso;
- largura;
- altura;
- profundidade;
- material;
- tecnologia de fabricação;
- tempo médio de impressão.

Esses dados poderão ser utilizados futuramente para logística e produção.

---

# SEO

Cada produto deverá possuir:

- slug;
- meta title;
- meta description;
- URL amigável.

---

# Relação com Produção

Após confirmação do pedido:

Pedido

↓

SKU

↓

Ordem de Produção

↓

Lote

↓

Job de Impressão

Toda rastreabilidade deve ser preservada.

---

# Exclusividade

Produtos poderão ser classificados como:

- permanentes;
- edição limitada;
- edição comemorativa.

Essa classificação influencia apenas comunicação e disponibilidade.

---

# Marco Zero

O modelo Marco Zero é tratado como uma peça autoral da Agadê.

Ele não depende do sistema de recomendação editorial.

Sua geometria, identidade visual e posicionamento são independentes dos demais modelos do catálogo.

---

# Critérios Gerais

O catálogo deve permitir:

- expansão para novos Drops;
- novas variantes;
- novas cores;
- novos materiais;
- internacionalização futura.

Sem necessidade de alteração estrutural.

---

# Dependências

Relaciona-se diretamente com:

- PRD 06 — Orders
- PRD 07 — Production
- ADR 0001 — Stack Tecnológica

---

# Status

Versão **1.0**

Este documento estabelece a estrutura oficial do catálogo da Agadê para o MVP.