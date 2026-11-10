# Direção de arte fotográfica — AGADE v2

## Problema resolvido
As versões anteriores usavam três mockups digitais de óculos e fundos chapados, sem transpor a linguagem de campanhas editoriais, arquitetura e moda das referências. Esta versão abandona mockups conceituais como protagonistas da homepage e da página Sobre.

## Estrutura visual executada
1. **Hero dividido entre creme e fotografia tropical de moda**: tipografia editorial de grande escala, conteúdo claro e CTA arredondado. Foto em 56% do desktop, imagem full bleed após texto em mobile.
2. **Editorial de moda e arquitetura**: retrato com óculos e parede quente ao lado de detalhe de sombra vegetal sobre materialidade terracota, com composição assimétrica.
3. **Seleção comercial**: catálogo verdadeiro quando disponível. Se não houver produtos, fotografia still life de óculos explicitamente ilustrativa, sem preço, estoque ou atributos falsos.
4. **Segundo editorial tropical**: retrato entre folhagens e selo tipográfico azul profundo como contraponto; o azul não domina superfícies de várias seções.
5. **Guia**: conteúdo técnico acessível em área clara sem transformar alegações de UV em selo fictício.
6. **Rodapé/CTA**: vinho pontual, seguido de contatos públicos reais.

## Fotografias / direitos de uso
Selecionamos fotografias disponíveis sob a **licença Pexels** para composição temporária no site. Elas NÃO são fotografias exclusivas da AGADE, não autorizam endosso por modelos e devem ser substituídas por campanha própria ou fotos licenciadas diretamente antes de apresentar produto real.

| Uso | ID Pexels | Autoria | Página de origem |
|---|---:|---|---|
| Hero fashion tropical | 9485735 | REAFON GATES | https://www.pexels.com/photo/photo-of-a-woman-wearing-sunglasses-9485735/ |
| Moda / parede texturizada | 36409245 | brandon retratos | https://www.pexels.com/photo/stylish-woman-in-white-suit-with-sunglasses-36409245/ |
| Parede terracota / vegetação | 37428896 | Benjamin Rivera | https://www.pexels.com/photo/tropical-plant-shadows-on-terracotta-wall-37428896/ |
| Óculos still life (não é inventário) | 10388460 | Ron Lach | https://www.pexels.com/photo/sunglasses-on-wooden-table-10388460/ |
| Editorial modelo entre folhas | 40688632 | Han Gallerymotret | https://www.pexels.com/photo/stylish-woman-outdoors-in-tropical-setting-40688632/ |
| Fotografia urbana brasileira | 3803484 | Rerisson Hofniel | https://www.pexels.com/photo/woman-in-black-and-white-striped-long-sleeve-shirt-wearing-black-framed-eyeglasses-3803484/ |

Licença: https://www.pexels.com/license/ 
- Uso comercial gratuito, sem atribuição obrigatória, mas sem sugerir apoio dos modelos à marca.
- As fotografias são chamadas diretamente do domínio `images.pexels.com` por enquanto. **Dependência externa**: confirmar carregamento, estabilidade e dimensionamento no Cloudflare Preview, em desktop e mobile. Preferir ativos próprios otimizados com permissão explícita no futuro.
- Os nomes de fotógrafos, links de origem e natureza provisória das imagens ficam documentados.
- Algumas fotografias exibem óculos de terceiros: a UI informa que não são mercadorias AGADE.

## Validação de experiência pendente na prévia
- Desktop 1440 / 1280: títulos sem colisão e recortes de retratos apropriados.
- Mobile 375 / 390 / 320 px: verificar composição hero, abertura do menu, botões >=44px, contraste da legenda e custo de downloads.
- Inspecionar imagem externa em navegador, pois teste estático/build não confirma acessibilidade do CDN Pexels.
- Conferir rotas `/`, `/sobre`, `/loja` diretamente com refresh no Cloudflare Pages.
- Nenhum checkout, newsletter ou claim técnico fictício habilitado.
