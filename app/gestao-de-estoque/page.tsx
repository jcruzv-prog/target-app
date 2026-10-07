//components
import EstoquePresenter from "@/components/ui/estoque-presenter";

export default function GestaoDeEstoquePage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-3 px-4 py-12">
      <h1 className="font-heading text-3xl font-semibold tracking-tight">
        Gestão de Estoque
      </h1>
      <p className="text-muted-foreground">
        Gerenciamento de estoque e movimentações.
      </p>
      <EstoquePresenter />
    </div>
  );
}
