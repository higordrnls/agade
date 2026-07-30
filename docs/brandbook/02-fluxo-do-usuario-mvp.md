## 2. Fase 1 — Fluxo do Usuário (MVP)

Fluxo definido, do primeiro clique à entrega:
1. Home (vídeo-manifesto em autoplay)
2. Conheça a marca
3. Escolha uma armação (vitrine)
4. Personalize (cor + tipo de lente)
5. Prova virtual (WebAR, câmera do celular)
6. Calculadora circular (reciclagem → cupom)
7. Checkout (pagamento + agendamento de coleta)
8. Produção sob demanda (esteira de 7 dias)
9. Entrega

> *Nota:* A prova virtual deve vir DEPOIS da personalização (o cliente experimenta exatamente a cor/modelo que acabou de montar).

### 2.1 Personalização “sem atrito” (escopo do MVP)
* Nada de medidas ergonômicas (ponte, haste) no MVP — risco de atrito cognitivo e abandono de carrinho.
* Personalização restrita a: Cor da armação e Tipo de lente (sol, grau, ou lente de descanso/filtro azul).

### 2.2 Prova Virtual (Virtual Try-On)
* Abordagem proposta: usar APIs de realidade aumentada web (WebAR) prontas (exemplos citados: DeepAR, Banuba) plugando o arquivo 3D nativo do modelo.

### 2.3 Engine de Logística Reversa & Créditos — Mapeamento de Telas
* **Decisão-chave:** a carteira guarda saldo em **quilogramas (kg) acumulados — nunca em reais (R$)**. O desconto é um percentual aplicado sobre o preço do modelo escolhido no checkout.
* **Tela 1 — Registro de Coleta:** Input do peso em kg com feedback visual em tempo real do equivalente em % de desconto.
* **Tela 2 — Carteira de Créditos Verdes:** Dashboard com saldo disponível (liberado) e saldo em auditoria (pendente) expressos em kg.
* **Tela 3 — Checkout Circular:** Slider de créditos em kg para aplicar na compra, aplicando o teto de 50%.

### 2.4 Estrutura de Banco de Dados (ERD)
* `USERS`: Dados do cliente.
* `ADDRESSES`: Endereço de coleta separado (LGPD).
* `WALLET_ENTRIES`: Coletas individuais (kg declarado, auditado, status).
* `PRODUCTS`: Modelos do Drop 1.
* `ORDERS`: Compras realizadas.
* `CREDIT_USAGE`: Tabela de ligação entre `ORDERS` e `WALLET_ENTRIES`.

### 2.5 Stack Técnica & Segurança de Dados
* Supabase (PostgreSQL + Auth + Storage + RLS).
* Papéis de acesso (RLS): `customer`, `collector`, `admin`.