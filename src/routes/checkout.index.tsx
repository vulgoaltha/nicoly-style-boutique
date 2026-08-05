import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { useCart } from "@/store/cart";
import { useAuth } from "@/hooks/use-auth";
import { brl } from "@/lib/format";
import { createOrder } from "@/lib/orders.functions";
import { calculateCorreiosShipping } from "@/lib/correios.functions";
import { calculateMelhorEnvioShipping } from "@/lib/melhorenvio.functions";
import { Truck, MapPin, Bike, Package, ChevronDown, ChevronUp, MessageSquare } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/checkout/")({
  component: CheckoutPage,
});

type ShippingOption = {
  id: string;
  name: string;
  price: number;
  days: string;
  description?: string;
  icon: any;
};

function CheckoutPage() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const items = useCart((s) => s.items);
  const subtotal = useCart((s) => s.subtotal());
  const clear = useCart((s) => s.clear);
  const submit = useServerFn(createOrder);

  const [deliveryType, setDeliveryType] = useState<"correios" | "motoboy">("correios");
  const [saving, setSaving] = useState(false);
  const [loadingShipping, setLoadingShipping] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);

  const { data: shippingSettings } = useQuery({
    queryKey: ["site_settings", "shipping_settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "shipping_settings")
        .maybeSingle();
      if (error) throw error;
      return data?.value || {};
    },
  });

  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);
  const [selectedShippingId, setSelectedShippingId] = useState<string>("");

  const [form, setForm] = useState({
    customer_name: "",
    customer_cpf: "",
    customer_email: "",
    customer_phone: "",
    shipping_cep: "",
    shipping_street: "",
    shipping_number: "",
    shipping_complement: "",
    shipping_neighborhood: "",
    shipping_city: "",
    shipping_state: "",
    notes: "",
  });

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [loading, user, navigate]);

  const handleCepChange = async (cep: string) => {
    const cleanCep = cep.replace(/\D/g, "");
    setForm((f) => ({ ...f, shipping_cep: cep }));

    if (cleanCep.length === 8) {
      setLoadingShipping(true);
      try {
        // 1. Busca dados do endereço via BrasilAPI
        const res = await fetch(`https://brasilapi.com.br/api/cep/v2/${cleanCep}`);
        if (!res.ok) throw new Error("CEP não encontrado");
        const data = await res.json();

        setForm((f) => ({
          ...f,
          shipping_street: data.street || f.shipping_street,
          shipping_neighborhood: data.neighborhood || f.shipping_neighborhood,
          shipping_city: data.city || f.shipping_city,
          shipping_state: data.state || f.shipping_state,
        }));

        // 2. Cotação Oficial dos Correios (Server Function)
        const correiosResult = await calculateCorreiosShipping({
          data: {
            destination_cep: cleanCep,
            items: items.map((i) => ({
              id: i.productId,
              name: i.name,
              quantity: i.quantity,
              price: i.price,
            })),
          },
        });

        if (correiosResult.success && correiosResult.options && correiosResult.options.length > 0) {
          const cOptions: ShippingOption[] = correiosResult.options.map((opt: any) => ({
            id: opt.id,
            name: opt.name,
            price: opt.price,
            days: opt.days,
            icon: opt.name.toLowerCase().includes("sedex") ? Truck : Package,
          }));
          setShippingOptions(cOptions);
          setSelectedShippingId(cOptions[0].id);
          return;
        }

        // 3. Se Correios não retornar cotação, tenta Melhor Envio
        const meResult = await calculateMelhorEnvioShipping({
          data: {
            destination_cep: cleanCep,
            items: items.map((i) => ({
              id: i.productId,
              name: i.name,
              quantity: i.quantity,
              price: i.price,
            })),
          },
        });

        if (meResult.success && meResult.options && meResult.options.length > 0) {
          const meOptions: ShippingOption[] = meResult.options.map((opt: any) => ({
            id: opt.id,
            name: opt.name,
            price: opt.price,
            days: opt.days,
            icon: opt.name.toLowerCase().includes("sedex") ? Truck : Package,
          }));
          setShippingOptions(meOptions);
          setSelectedShippingId(meOptions[0].id);
          return;
        }

        // 4. Fallback para tabela local configurada no admin se APIs falharem
        const settings = (shippingSettings as Record<string, any>) || {};
        const isSP = data.state === "SP";
        const options: ShippingOption[] = [
          {
            id: "sedex",
            name: "SEDEX (Correios)",
            price: isSP
              ? Number(settings.correios_sedex_sp ?? 25.9)
              : Number(settings.correios_sedex_br ?? 65.9),
            days: isSP ? "Até 3 dias úteis" : "Até 7 dias úteis",
            icon: Truck,
          },
          {
            id: "pac",
            name: "PAC (Correios)",
            price: isSP
              ? Number(settings.correios_pac_sp ?? 18.5)
              : Number(settings.correios_pac_br ?? 38.5),
            days: isSP ? "Até 6 dias úteis" : "Até 12 dias úteis",
            icon: Package,
          },
        ];

        setShippingOptions(options);
        if (options.length > 0) {
          setSelectedShippingId(options[0].id);
        }
      } catch (err) {
        toast.error("Não foi possível calcular o frete para este CEP.");
      } finally {
        setLoadingShipping(false);
      }
    }
  };

  const selectedShipping =
    deliveryType === "correios" ? shippingOptions.find((o) => o.id === selectedShippingId) : null;

  const total = subtotal + (selectedShipping?.price || 0);

  if (!user) return null;

  if (!items.length) {
    return (
      <div className="container-editorial py-24 text-center">
        <h1 className="font-display text-3xl">Sua sacola está vazia</h1>
        <Link
          to="/loja"
          className="mt-6 inline-block text-xs tracking-editorial uppercase underline"
        >
          Ver coleção
        </Link>
      </div>
    );
  }

  const set =
    (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (deliveryType === "correios" && !selectedShipping) {
      toast.error("Por favor, digite um CEP válido e selecione o tipo de frete dos Correios.");
      return;
    }

    setSaving(true);
    try {
      const res = await submit({
        data: {
          ...form,
          shipping_cost: selectedShipping?.price || 0,
          notes: form.notes
            ? form.notes + `\n[MÉTODO DE ENVIO: ${selectedShipping?.name || "Correios"}]`
            : `[MÉTODO DE ENVIO: ${selectedShipping?.name || "Correios"}]`,
          items: items.map((i) => ({
            productId: i.productId,
            slug: i.slug,
            name: i.name,
            image: i.image,
            price: i.price,
            size: i.size,
            color: i.color,
            quantity: i.quantity,
          })),
        },
      });
      clear();
      toast.success("Pedido criado com sucesso!");
      navigate({ to: "/checkout/pagamento/$orderId", params: { orderId: res.id } });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao criar pedido");
    } finally {
      setSaving(false);
    }
  };

  const handleMotoboyWhatsApp = () => {
    const settings = (shippingSettings as Record<string, any>) || {};
    const rawNumber = settings.whatsapp_number || "5511994565923";
    const cleanNumber = rawNumber.replace(/\D/g, "");

    const itemsList = items
      .map(
        (i) =>
          `• ${i.quantity}x ${i.name}${i.size ? ` (Tam: ${i.size})` : ""}${
            i.color ? ` (Cor: ${i.color})` : ""
          } - ${brl(i.price * i.quantity)}`,
      )
      .join("\n");

    const message =
      `*SOLICITAÇÃO DE ENTREGA VIA MOTOBOY*\n\n` +
      `*Cliente:* ${form.customer_name || "Não informado"}\n` +
      `*Telefone:* ${form.customer_phone || "Não informado"}\n` +
      (form.shipping_street
        ? `*Endereço:* ${form.shipping_street}, ${form.shipping_number} - ${form.shipping_city}/${form.shipping_state}\n`
        : "") +
      `\n*ITENS DA SACOLA:*\n${itemsList}\n\n` +
      `*Subtotal:* ${brl(subtotal)}\n\n` +
      `Olá! Gostaria de combinar o valor do frete e o horário da entrega via Motoboy.`;

    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const inputCls =
    "w-full border border-border bg-background rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-blush transition-colors";
  const labelCls = "block text-xs tracking-editorial uppercase text-muted-foreground mb-1.5";

  return (
    <div className="container-editorial py-8 md:py-16">
      <h1 className="font-display text-3xl md:text-4xl mb-6 md:mb-8">Finalizar compra</h1>

      <form onSubmit={onSubmit} className="grid md:grid-cols-3 gap-6 md:gap-10">
        {/* ── Formulário principal ── */}
        <div className="md:col-span-2 space-y-8">
          {/* Dados do cliente */}
          <section className="space-y-4">
            <h2 className="font-display text-xl md:text-2xl">Dados do cliente</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className={labelCls}>Nome completo</label>
                <input
                  required
                  value={form.customer_name}
                  onChange={set("customer_name")}
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>E-mail</label>
                <input
                  required
                  type="email"
                  value={form.customer_email}
                  onChange={set("customer_email")}
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>CPF</label>
                <input
                  required
                  value={form.customer_cpf}
                  onChange={set("customer_cpf")}
                  className={inputCls}
                  placeholder="000.000.000-00"
                />
              </div>
              <div className="sm:col-span-2">
                <label className={labelCls}>Telefone / WhatsApp</label>
                <input
                  required
                  value={form.customer_phone}
                  onChange={set("customer_phone")}
                  className={inputCls}
                  placeholder="(11) 99999-9999"
                />
              </div>
            </div>
          </section>

          {/* Seleção do Tipo de Entrega (Dois Botões) */}
          <section className="space-y-4">
            <h2 className="font-display text-xl md:text-2xl flex items-center gap-2">
              <Truck className="h-5 w-5 text-blush flex-shrink-0" /> Forma de Entrega
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Botão 1: Correios */}
              <button
                type="button"
                onClick={() => setDeliveryType("correios")}
                className={`p-4 rounded-md border text-left transition-all flex flex-col justify-between gap-3 ${
                  deliveryType === "correios"
                    ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                    : "border-border hover:border-primary/40 bg-background"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2.5 rounded-full ${
                      deliveryType === "correios"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    <Package className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">Entrega via Correios</div>
                    <div className="text-xs text-muted-foreground">PAC e SEDEX (Oficial)</div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Digite seu CEP para calcular a taxa de frete automaticamente e pagar pelo site.
                </p>
              </button>

              {/* Botão 2: Motoboy */}
              <button
                type="button"
                onClick={() => setDeliveryType("motoboy")}
                className={`p-4 rounded-md border text-left transition-all flex flex-col justify-between gap-3 ${
                  deliveryType === "motoboy"
                    ? "border-[#25D366] bg-[#25D366]/5 ring-2 ring-[#25D366]/20"
                    : "border-border hover:border-[#25D366]/40 bg-background"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2.5 rounded-full ${
                      deliveryType === "motoboy"
                        ? "bg-[#25D366] text-white"
                        : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    <Bike className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">Entrega via Motoboy</div>
                    <div className="text-xs text-[#25D366] font-medium">WhatsApp Direto</div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Fale diretamente com nossa atendente no WhatsApp para combinar taxa e entrega.
                </p>
              </button>
            </div>
          </section>

          {/* Conteúdo Dinâmico com base no tipo de entrega */}
          {deliveryType === "correios" ? (
            <>
              {/* Endereço Correios */}
              <section className="space-y-4">
                <h3 className="font-display text-lg md:text-xl flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blush flex-shrink-0" /> Endereço de entrega
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-6 gap-4 bg-secondary/20 p-4 sm:p-5 rounded-md border border-border">
                  <div className="col-span-2 sm:col-span-2">
                    <label className={labelCls}>CEP</label>
                    <input
                      required
                      value={form.shipping_cep}
                      onChange={(e) => handleCepChange(e.target.value)}
                      className={inputCls}
                      placeholder="00000-000"
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-4">
                    <label className={labelCls}>Rua</label>
                    <input
                      required
                      value={form.shipping_street}
                      onChange={set("shipping_street")}
                      className={inputCls}
                    />
                  </div>
                  <div className="col-span-1 sm:col-span-2">
                    <label className={labelCls}>Número</label>
                    <input
                      required
                      value={form.shipping_number}
                      onChange={set("shipping_number")}
                      className={inputCls}
                    />
                  </div>
                  <div className="col-span-1 sm:col-span-4">
                    <label className={labelCls}>Complemento</label>
                    <input
                      value={form.shipping_complement}
                      onChange={set("shipping_complement")}
                      className={inputCls}
                      placeholder="Apto, Bloco (opcional)"
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-3">
                    <label className={labelCls}>Bairro</label>
                    <input
                      required
                      value={form.shipping_neighborhood}
                      onChange={set("shipping_neighborhood")}
                      className={inputCls}
                    />
                  </div>
                  <div className="col-span-1 sm:col-span-2">
                    <label className={labelCls}>Cidade</label>
                    <input
                      required
                      value={form.shipping_city}
                      onChange={set("shipping_city")}
                      className={inputCls}
                    />
                  </div>
                  <div className="col-span-1 sm:col-span-1">
                    <label className={labelCls}>UF</label>
                    <input
                      required
                      maxLength={2}
                      value={form.shipping_state}
                      onChange={set("shipping_state")}
                      className={`${inputCls} uppercase`}
                    />
                  </div>
                </div>
              </section>

              {/* Cálculo do Frete Oficial Correios */}
              <section className="space-y-4">
                <h3 className="font-display text-lg md:text-xl">Opções de Frete dos Correios</h3>
                {loadingShipping ? (
                  <div className="p-8 border border-border border-dashed rounded-md text-center text-sm text-muted-foreground animate-pulse">
                    Calculando preço e prazo oficial dos Correios...
                  </div>
                ) : shippingOptions.length > 0 ? (
                  <div className="grid gap-3">
                    {shippingOptions.map((opt) => (
                      <label
                        key={opt.id}
                        className={`flex items-center gap-4 p-4 rounded-md border cursor-pointer transition-colors ${
                          selectedShippingId === opt.id
                            ? "border-blush bg-blush/5"
                            : "border-border hover:border-blush/50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="shipping_method"
                          value={opt.id}
                          checked={selectedShippingId === opt.id}
                          onChange={() => setSelectedShippingId(opt.id)}
                          className="text-blush focus:ring-blush flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2 font-medium text-sm min-w-0">
                              <opt.icon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                              <span className="truncate">{opt.name}</span>
                            </div>
                            <span className="font-bold text-sm flex-shrink-0">
                              {brl(opt.price)}
                            </span>
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            Prazo estimado: {opt.days}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 border border-border border-dashed rounded-md text-center text-sm text-muted-foreground bg-secondary/10">
                    Digite um CEP válido para calcular o valor do frete dos Correios.
                  </div>
                )}

                <div className="pt-2">
                  <label className={labelCls}>Observações do pedido (opcional)</label>
                  <textarea
                    rows={3}
                    value={form.notes}
                    onChange={set("notes")}
                    className={inputCls}
                    placeholder="Instruções de entrega, referências, etc."
                  />
                </div>
              </section>
            </>
          ) : (
            /* Opção Motoboy -> WhatsApp Direto */
            <section className="space-y-6 bg-[#25D366]/5 border border-[#25D366]/30 p-6 rounded-md">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#25D366] text-white rounded-full flex-shrink-0">
                  <Bike className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-display text-xl font-medium">Entrega por Motoboy</h3>
                  <p className="text-sm text-muted-foreground">
                    Ao escolher entrega via Motoboy, o valor do frete e o horário da entrega são
                    combinados diretamente com a atendente da loja via WhatsApp.
                  </p>
                </div>
              </div>

              {/* Informações opcionais para agilizar o contato */}
              <div className="space-y-3 border-t border-[#25D366]/20 pt-4">
                <label className={labelCls}>Endereço ou Bairro para entrega (opcional)</label>
                <input
                  value={form.shipping_street}
                  onChange={set("shipping_street")}
                  className={inputCls}
                  placeholder="Ex: Rua Exemplo, 123 - Bairro Central"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={handleMotoboyWhatsApp}
                  className="w-full sm:w-auto flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium px-6 py-4 rounded-sm flex items-center justify-center gap-3 text-sm transition-all shadow-sm"
                >
                  <MessageSquare className="h-5 w-5" />
                  Conversar com Atendente no WhatsApp
                </button>
              </div>
            </section>
          )}
        </div>

        {/* ── Resumo — desktop sidebar ── */}
        <div className="hidden md:block">
          <aside className="space-y-4 border border-border p-6 rounded-sm h-fit bg-secondary/30 sticky top-24 shadow-sm">
            <h2 className="font-display text-xl">Resumo do pedido</h2>
            <ul className="space-y-3 text-sm max-h-48 overflow-y-auto pr-2 scrollbar-hide">
              {items.map((i) => (
                <li
                  key={`${i.productId}_${i.size}_${i.color}`}
                  className="flex justify-between gap-2"
                >
                  <span className="text-muted-foreground truncate flex-1">
                    {i.quantity}× {i.name}
                    {i.size && <span className="text-xs"> · {i.size}</span>}
                  </span>
                  <span className="shrink-0">{brl(i.price * i.quantity)}</span>
                </li>
              ))}
            </ul>
            <div className="border-t border-border pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{brl(subtotal)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Frete</span>
                {deliveryType === "motoboy" ? (
                  <span className="text-xs text-[#25D366] font-medium">Combinar no WhatsApp</span>
                ) : selectedShipping ? (
                  <span className="font-medium text-emerald-600">
                    + {brl(selectedShipping.price)}
                  </span>
                ) : (
                  <span className="text-xs text-muted-foreground">A calcular</span>
                )}
              </div>
              <div className="flex justify-between font-bold pt-3 border-t border-border mt-2 text-base">
                <span>Total</span>
                <span>{brl(total)}</span>
              </div>
            </div>

            {deliveryType === "correios" ? (
              <button
                type="submit"
                disabled={saving || !selectedShippingId}
                className="w-full bg-primary text-primary-foreground py-3.5 mt-2 text-xs tracking-editorial uppercase rounded-sm disabled:opacity-60 transition-opacity"
              >
                {saving ? "Processando..." : "Ir para pagamento"}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleMotoboyWhatsApp}
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-3.5 mt-2 text-xs tracking-editorial uppercase rounded-sm transition-opacity flex items-center justify-center gap-2 font-medium"
              >
                <MessageSquare className="h-4 w-4" />
                Finalizar no WhatsApp
              </button>
            )}

            <p className="text-xs text-muted-foreground text-center mt-4">
              {deliveryType === "correios"
                ? "O pagamento será processado com segurança via Mercado Pago."
                : "A entrega e o pagamento serão combinados diretamente pelo WhatsApp."}
            </p>
          </aside>
        </div>
      </form>

      {/* ── Barra de resumo fixo no mobile ── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-background border-t border-border pb-safe">
        {summaryOpen && (
          <div className="px-4 pt-4 pb-2 border-b border-border bg-background">
            <ul className="space-y-2 text-sm max-h-36 overflow-y-auto scrollbar-hide mb-3">
              {items.map((i) => (
                <li
                  key={`${i.productId}_${i.size}_${i.color}`}
                  className="flex justify-between gap-2"
                >
                  <span className="text-muted-foreground truncate flex-1">
                    {i.quantity}× {i.name}
                    {i.size && <span className="text-xs"> · {i.size}</span>}
                  </span>
                  <span className="shrink-0 text-xs">{brl(i.price * i.quantity)}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Subtotal</span>
              <span>{brl(subtotal)}</span>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Frete</span>
              <span>
                {deliveryType === "motoboy"
                  ? "Combinar no WhatsApp"
                  : selectedShipping
                    ? brl(selectedShipping.price)
                    : "A calcular"}
              </span>
            </div>
          </div>
        )}

        <div className="flex items-center gap-3 px-4 py-3">
          <button
            type="button"
            onClick={() => setSummaryOpen((v) => !v)}
            className="flex-1 flex items-center gap-1 min-w-0"
          >
            <div className="min-w-0">
              <div className="text-xs text-muted-foreground text-left">
                {summaryOpen ? "Ocultar resumo" : "Ver resumo"} ({items.length}{" "}
                {items.length === 1 ? "item" : "itens"})
              </div>
              <div className="font-display text-lg font-medium">{brl(total)}</div>
            </div>
            {summaryOpen ? (
              <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            ) : (
              <ChevronUp className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            )}
          </button>

          {deliveryType === "correios" ? (
            <button
              form="checkout-form"
              type="submit"
              disabled={saving || !selectedShippingId}
              onClick={onSubmit}
              className="flex-shrink-0 bg-primary text-primary-foreground px-5 py-3 text-xs tracking-editorial uppercase rounded-sm disabled:opacity-60 transition-opacity"
            >
              {saving ? "..." : "Pagar"}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleMotoboyWhatsApp}
              className="flex-shrink-0 bg-[#25D366] text-[#ffffff] px-4 py-3 text-xs tracking-editorial uppercase rounded-sm flex items-center gap-1 font-medium"
            >
              <MessageSquare className="h-4 w-4" />
              WhatsApp
            </button>
          )}
        </div>
      </div>

      <div className="md:hidden h-28" />
    </div>
  );
}
