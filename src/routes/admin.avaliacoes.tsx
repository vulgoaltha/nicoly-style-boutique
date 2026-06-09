import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Star, Check, X, Trash2, MapPin, ShoppingBag, MessageSquare } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { CustomerReview } from "@/lib/types";

export const Route = createFileRoute("/admin/avaliacoes")({
  component: AdminReviews,
});

/* ─── helpers ─────────────────────────────────────────────────── */

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i < rating ? "fill-amber-400 text-amber-400" : "fill-border text-border"
          }`}
        />
      ))}
    </div>
  );
}

type ReviewFilter = "all" | "pending" | "approved";

/* ─── main ─────────────────────────────────────────────────────── */

function AdminReviews() {
  const qc = useQueryClient();
  const [filter, setFilter] = useState<ReviewFilter>("all");

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["admin-reviews"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("customer_reviews")
        .select("*, product:products(name, images)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as CustomerReview[];
    },
  });

  /* mutations */
  const approveMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("customer_reviews")
        .update({ approved: true })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Avaliação aprovada!");
      qc.invalidateQueries({ queryKey: ["admin-reviews"] });
      qc.invalidateQueries({ queryKey: ["public-reviews"] });
    },
    onError: () => toast.error("Erro ao aprovar avaliação."),
  });

  const rejectMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("customer_reviews")
        .update({ approved: false })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Avaliação rejeitada.");
      qc.invalidateQueries({ queryKey: ["admin-reviews"] });
      qc.invalidateQueries({ queryKey: ["public-reviews"] });
    },
    onError: () => toast.error("Erro ao rejeitar avaliação."),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("customer_reviews").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Avaliação excluída.");
      qc.invalidateQueries({ queryKey: ["admin-reviews"] });
      qc.invalidateQueries({ queryKey: ["public-reviews"] });
    },
    onError: () => toast.error("Erro ao excluir avaliação."),
  });

  /* filter */
  const filtered = reviews.filter((r: CustomerReview) => {
    if (filter === "approved") return r.approved === true;
    if (filter === "pending") return r.approved === false;
    return true;
  });

  const approvedCount = reviews.filter((r) => r.approved).length;
  const pendingCount = reviews.filter((r) => !r.approved).length;
  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : "—";

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl">Avaliações</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {reviews.length} avaliação{reviews.length !== 1 ? "ões" : ""} no total
          </p>
        </div>

        {/* Stats mini-cards */}
        <div className="flex gap-3 flex-wrap">
          <StatCard label="Aprovadas" value={approvedCount} color="text-green-600" />
          <StatCard label="Pendentes" value={pendingCount} color="text-amber-600" />
          <StatCard label="Nota média" value={avgRating} color="text-blush-deep" />
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 border-b border-border pb-1">
        {(["all", "pending", "approved"] as ReviewFilter[]).map((f) => {
          const labels: Record<ReviewFilter, string> = {
            all: `Todas (${reviews.length})`,
            pending: `Pendentes (${pendingCount})`,
            approved: `Aprovadas (${approvedCount})`,
          };
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-xs tracking-editorial uppercase px-3 py-1.5 rounded-sm transition ${
                filter === f
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-secondary text-muted-foreground"
              }`}
            >
              {labels[f]}
            </button>
          );
        })}
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-36 bg-secondary animate-pulse rounded-sm" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-20 text-center text-sm text-muted-foreground flex flex-col items-center gap-3">
          <MessageSquare className="h-10 w-10 text-border" />
          <p>Nenhuma avaliação encontrada.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filtered.map((review) => (
            <ReviewRow
              key={review.id}
              review={review}
              onApprove={() => approveMutation.mutate(review.id)}
              onReject={() => rejectMutation.mutate(review.id)}
              onDelete={() => deleteMutation.mutate(review.id)}
              isLoading={
                approveMutation.isPending || rejectMutation.isPending || deleteMutation.isPending
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── sub-components ───────────────────────────────────────────── */

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: string | number;
  color: string;
}) {
  return (
    <div className="bg-background border border-border rounded-sm px-4 py-2 min-w-[90px] text-center">
      <p className={`text-xl font-semibold ${color}`}>{value}</p>
      <p className="text-[10px] text-muted-foreground uppercase tracking-wide">{label}</p>
    </div>
  );
}

function ReviewRow({
  review,
  onApprove,
  onReject,
  onDelete,
  isLoading,
}: {
  review: CustomerReview;
  onApprove: () => void;
  onReject: () => void;
  onDelete: () => void;
  isLoading: boolean;
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <div
      className={`bg-background border rounded-sm p-5 flex flex-col sm:flex-row gap-4 transition ${
        review.approved ? "border-green-200 dark:border-green-900" : "border-border"
      }`}
    >
      {/* Avatar */}
      <div className="flex-shrink-0">
        {review.customer_photo ? (
          <img
            src={review.customer_photo}
            alt={review.customer_name}
            className="w-11 h-11 rounded-full object-cover border border-border"
          />
        ) : (
          <div className="w-11 h-11 rounded-full bg-blush-soft border border-blush/30 flex items-center justify-center text-blush font-display text-base font-semibold select-none">
            {review.customer_name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex-1 min-w-0">
        {/* Top row */}
        <div className="flex flex-wrap items-start gap-x-3 gap-y-1 mb-2">
          <span className="font-medium text-sm">{review.customer_name}</span>
          <Stars rating={review.rating} />
          <span
            className={`text-[10px] px-2 py-0.5 rounded-full font-medium uppercase tracking-wide ${
              review.approved
                ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
                : "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400"
            }`}
          >
            {review.approved ? "Aprovada" : "Pendente"}
          </span>
          <span className="text-[11px] text-muted-foreground ml-auto">
            {new Date(review.created_at).toLocaleDateString("pt-BR")}
          </span>
        </div>

        {/* Comment */}
        <p className="text-sm text-foreground/80 leading-relaxed italic mb-3">"{review.comment}"</p>

        {/* Meta tags */}
        <div className="flex flex-wrap gap-2">
          {review.city && (
            <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground border border-border rounded-sm px-2 py-0.5 bg-secondary/40">
              <MapPin className="h-2.5 w-2.5" />
              {review.city}
              {review.state ? `, ${review.state}` : ""}
            </span>
          )}
          {review.product && (
            <span className="inline-flex items-center gap-1 text-[11px] text-blush-deep border border-blush/30 rounded-sm px-2 py-0.5 bg-blush-soft">
              <ShoppingBag className="h-2.5 w-2.5" />
              {review.product.name}
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex sm:flex-col gap-2 flex-shrink-0 justify-end sm:justify-start">
        {!review.approved ? (
          <ActionBtn
            onClick={onApprove}
            disabled={isLoading}
            title="Aprovar"
            className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400"
          >
            <Check className="h-3.5 w-3.5" />
          </ActionBtn>
        ) : (
          <ActionBtn
            onClick={onReject}
            disabled={isLoading}
            title="Rejeitar"
            className="bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-400"
          >
            <X className="h-3.5 w-3.5" />
          </ActionBtn>
        )}

        {confirmDelete ? (
          <div className="flex gap-1">
            <ActionBtn
              onClick={onDelete}
              disabled={isLoading}
              title="Confirmar exclusão"
              className="bg-destructive/10 border-destructive/30 text-destructive hover:bg-destructive/20"
            >
              <Check className="h-3.5 w-3.5" />
            </ActionBtn>
            <ActionBtn
              onClick={() => setConfirmDelete(false)}
              disabled={isLoading}
              title="Cancelar"
              className="hover:bg-secondary"
            >
              <X className="h-3.5 w-3.5" />
            </ActionBtn>
          </div>
        ) : (
          <ActionBtn
            onClick={() => setConfirmDelete(true)}
            disabled={isLoading}
            title="Excluir"
            className="hover:bg-destructive/10 hover:border-destructive/30 hover:text-destructive"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </ActionBtn>
        )}
      </div>
    </div>
  );
}

function ActionBtn({
  children,
  onClick,
  disabled,
  title,
  className = "",
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  title?: string;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`w-8 h-8 rounded-sm border border-border flex items-center justify-center transition disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
}
