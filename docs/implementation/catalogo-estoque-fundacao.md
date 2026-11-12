# AGADE — catálogo e estoque: fundação técnica

## Estado
Pré-lançamento. Nenhum produto real, fornecedor, foto de produto, preço final, saldo ou venda foi inserido.

A vitrine já consulta `POST /rest/v1/rpc/list_storefront_catalog` em `prototype/src/app/data/storefrontCatalog.ts`, usando somente a chave pública do projeto. A migração `20261112_catalog_inventory_foundation.sql` implementa essa interface sem alterar a homepage ou abrir checkout.

## Entidades
- **agade_catalog_products:** modelo (slug, nome, descrição, coleção e status: draft → ready → published → archived).
- **agade_catalog_variants:** cada combinação comercial de cor/lente, com SKU único, preço em centavos e alegações técnicas individuais documentadas (status draft, available, discontinued).
- **agade_catalog_images:** imagem real licenciada/produzida, texto alternativo e uma única imagem principal por modelo. Não confundir com fotos privadas de clientes.
- **agade_inventory_balances:** quantidade física `on_hand` e quantidade `reserved`. O saldo disponível para exibição é `on_hand - reserved`; não existe rotina de reserva implementada.

## Regra de publicação (falhar fechado)
A função pública só retorna uma variante quando, ao mesmo tempo:
1. Modelo com status `published`.
2. Variante com status `available`.
3. Preço positivo cadastrado.
4. Imagem principal cadastrada no modelo.
5. Saldo físico maior que reservado.

Por padrão tudo começa vazio; não existem sementes de produtos conceituais. Dados de produção entram apenas após validação de fornecedor, especificações, direitos das fotos e existência do estoque.

## Segurança
Quatro tabelas com RLS habilitada e **sem grants de leitura ou escrita a anon/authenticated**. Não criar política pública de SELECT nessas tabelas. A função SQL `SECURITY DEFINER`, com `search_path` fixado, expõe apenas os campos da vitrine com filtros explícitos; nenhuma função pública faz INSERT, UPDATE ou DELETE. As alterações iniciais podem ser feitas no SQL Editor pelo proprietário. Futuro painel administrativo precisará de autenticação/autorização própria e trilha de auditoria; não usar JWT de cliente para administrar.

## Antes de executar a migração
1. Revisar as tabelas e a função no PR.
2. Conferir que não existem outros objetos com os mesmos nomes e contratos incompatíveis.
3. Aplicar o SQL no Supabase **apenas depois** de aprovar a proposta.
4. Confirmar que `select count(*) from public.agade_catalog_products` e `select count(*) from public.list_storefront_catalog()` retornam **0** inicialmente.
5. Testar leitura de API com chave pública e conferir que tabelas diretas não são acessíveis com `anon`.
6. Só usar produtos reais quando houver cadastro e documentação comercial.

## Próximas entregas
- Rotina administrativa segura para cadastro/edição, upload de imagem de produto e movimentações auditáveis de estoque.
- Fotos por variante (atualmente a vitrine usa imagem principal do modelo).
- Reservas transacionais e baixa de estoque no **servidor**, vinculadas a pedidos e confirmação de pagamento; não confiar em preço nem saldo enviados pelo navegador.
- Política de frete com custo pago pelo cliente, meios de pagamento e documentação fiscal, somente depois de validação comercial.
- Teste pendente de isolamento de perfis de clientes antes de qualquer lançamento.

**Nota:** este desenho suporta evolução da vitrine e sacola atuais, mas não habilita checkout nem prova disponibilidade para venda.
