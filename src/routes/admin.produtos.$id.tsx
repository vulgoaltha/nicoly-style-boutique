import { createFileRoute } from "@tanstack/react-router";
import { ProductForm } from "@/components/admin/ProductForm";

export const Route = createFileRoute("/admin/produtos/$id")({
  component: EditProduct,
});

function EditProduct() {
  const { id } = Route.useParams();
  return <ProductForm productId={id} />;
}
