import { t as r } from "./payment.functions-DaljBhjR.mjs";
import { a as d } from "./server-DXgSSFBn.mjs";
import { o as i, s as e, b as o, n as t } from "../_libs/zod.mjs";
const n = i({
    destination_cep: e().trim().min(8).max(9),
    items: o(i({ id: e().optional(), name: e(), quantity: t().int().min(1), price: t() })),
  }),
  f = d({ method: "POST" })
    .inputValidator((a) => n.parse(a))
    .handler(r("2cb2bf25ef7eb14883856fe11a435f51e26a27a5c8ef06d4e5367debee0b5352")),
  m = i({ order_id: e().uuid() }),
  c = d({ method: "POST" })
    .inputValidator((a) => m.parse(a))
    .handler(r("24845baa9707010499cb5fca2ef868bd1869348572dbde58367d6db3e114fa8f"));
export { f as d, c as s };
