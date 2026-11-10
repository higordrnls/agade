# Revisão mobile-first do hero e da homepage AGADE

Revisão solicitada a partir de screenshots reais desktop e mobile do modelo anterior e da versão editorial.

## Mudanças
- No mobile, foto com pessoa e óculos vem **antes do texto**, com 47svh e mínimo de 320px; torna o produto visualmente presente na primeira dobra. Desktop preserva layout dividido, com imagem à direita e texto à esquerda.
- Título principal reduzido para frase curta de categoria, sem três palavras gigantes e itálicos. CTA ao alcance no bloco seguinte.
- Remove faixa/manifesto, selo flutuante e grande círculo decorativo; diminui quantidade de seções de oito para cinco grandes momentos.
- Alterna editorial de moda e arquitetura com seleção real; sem catálogo, usa still life identificado como ilustrativo.
- Mantém creme/areia, terracota e vinho, com verde fotográfico e azul profundo apenas em detalhes da interface.
- Guia técnico conserva explicação sobre alegações UV só quando verificáveis; CTA final em creme sobre vinho com contraste.
- Interatividade comercial, conta, sacola, suporte e checkout desativado permanecem inalterados.

## Verificações
Testes e build do frontend em GitHub Actions. Revisar manualmente em 320, 375, 390, 768 e 1440 px na prévia Cloudflare Pages, incluindo imagens externas, carregamento de fontes, foco de teclado e menu mobile. Não fundir a branch em produção antes dessa validação.
