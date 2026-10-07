//components
import { ComissionsPresenter } from "./comissions-presenter";

//data
import { comissions } from "@/data/comissions";

//lib
import { calcularComissoes } from "@/lib/calculateComissions";

export function ComissionsContainer() {
    const comissoesCalculadas = calcularComissoes(comissions);
  return <ComissionsPresenter comissions={comissoesCalculadas} />;
}