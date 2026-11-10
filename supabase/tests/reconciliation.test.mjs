import test from "node:test";
import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { centsFromAmount, signatureManifest, verifyWebhookSignature, verifiedOrderOutcome } from "../functions/_shared/reconciliation.ts";

test("ordem só é paga após reconsulta coerente (id, referência, valor e test mode)", () => {
  const expected={providerId:"ORDTST123456789A",reference:"AG-TEST-123",totalCents:12900};
  const sample={id:expected.providerId,external_reference:expected.reference,total_amount:"129.00",
    total_paid_amount:"129.00",status:"processed",status_detail:"accredited",live_mode:false};
  assert.equal(verifiedOrderOutcome(sample,expected),"paid");
  const { live_mode: _ignored, ...withoutLiveMode } = sample;
  assert.equal(verifiedOrderOutcome(withoutLiveMode,expected),"paid");
  assert.throws(() => verifiedOrderOutcome({ ...sample, id: "ORD12345678900" }, { ...expected, providerId: "ORD12345678900" }));
  assert.equal(verifiedOrderOutcome({...sample,status:"processing"},expected),"pending");
  assert.equal(verifiedOrderOutcome({...sample,status:"canceled"},expected),"cancelled");
  assert.equal(verifiedOrderOutcome({...sample,total_paid_amount:"0.00"},expected),"pending");
  assert.throws(()=>verifiedOrderOutcome({...sample,external_reference:"outra"},expected));
  assert.throws(()=>verifiedOrderOutcome({...sample,live_mode:true},expected));
});
test("valores monetários sem arredondamento de float", () => {
  assert.equal(centsFromAmount("129.9"),12990);
  assert.equal(centsFromAmount("0.01"),1);
  assert.throws(()=>centsFromAmount("1.001"));
  assert.throws(()=>centsFromAmount("-1.00"));
});
test("HMAC SHA256 do webhook recusa assinatura adulterada", async()=>{
  const id="ORDTST123456789A", requestId="request-123",ts="1762783200",secret="segredo-de-testes-nao-publicar";
  const hex=createHmac("sha256",secret).update(signatureManifest(id,requestId,ts)).digest("hex");
  assert.equal(await verifyWebhookSignature(id,requestId,`ts=${ts},v1=${hex}`,secret),true);
  assert.equal(await verifyWebhookSignature(id,requestId,`ts=${ts},v1=${"0".repeat(64)}`,secret),false);
  assert.equal(await verifyWebhookSignature(id,"outro",`ts=${ts},v1=${hex}`,secret),false);
  assert.equal(await verifyWebhookSignature(id,requestId,"",secret),false);
});
