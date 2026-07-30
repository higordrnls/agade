# ADR 0003: Escolha do Gateway de Pagamento para o Drop 1

## Status
✅ Aceito

## Contexto
O Drop 1 foca no mercado nacional (Salvador-BA). Precisamos de um gateway estável, com forte penetração em meios de pagamento locais (PIX, boleto e cartão nacional).

## Decisão
- Utilizar o **Mercado Pago** como o gateway principal de pagamentos para o lançamento.

## Alternativas Avaliadas
- **Stripe + Mercado Pago em paralelo:** Descartado por ser prematuro e adicionar complexidade financeira desnecessária no MVP.
- **Stripe isolado:** Descartado pelo custo e menor otimização nativa para PIX instantâneo e parcelamento local no Brasil.

## Consequências
- Foco total na operação nacional do Drop 1, mantendo as portas abertas para integração com Stripe em cenários futuros de internacionalização.