//components
import JurosPresenter from "@/components/juros-presenter";
export default function JurosPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-3 px-4 py-12">
      <h1 className="font-heading text-3xl font-semibold tracking-tight">
        Juros
      </h1>
      <p className="text-muted-foreground">
        Cálculo de juros de atraso.
      </p>
      <JurosPresenter />
    </div>
  );
}
