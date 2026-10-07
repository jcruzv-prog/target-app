//components
import { ComissionsContainer } from "@/components/comissions-container";

export default function ComissoesPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-3 px-4 py-12">
      <h1 className="font-heading text-3xl font-semibold tracking-tight">
        Comissões
      </h1>
      <p className="text-muted-foreground">
       Calculo  de comissões por vendedor
      </p>
      <ComissionsContainer />
    </div>
  );
}
