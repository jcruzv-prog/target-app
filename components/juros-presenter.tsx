"use client";

import { useMemo, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Label } from "@/components/ui/label";

import { Input } from "@/components/ui/input";

import { Badge } from "@/components/ui/badge";

export default function CalculadoraJuros() {
  const [valor, setValor] = useState("");
  const [vencimento, setVencimento] = useState("");

  const resultado = useMemo(() => {
    if (!valor || !vencimento) return null;

    const valorOriginal = Number(valor);

    if (isNaN(valorOriginal)) return null;

    const hoje = new Date();
    const dataVencimento = new Date(vencimento);

    hoje.setHours(0, 0, 0, 0);
    dataVencimento.setHours(0, 0, 0, 0);

    const diferencaMs =
      hoje.getTime() - dataVencimento.getTime();

    const diasAtraso = Math.max(
      0,
      Math.floor(diferencaMs / (1000 * 60 * 60 * 24))
    );

    const juros = valorOriginal * 0.025 * diasAtraso;

    const valorTotal = valorOriginal + juros;

    return {
      diasAtraso,
      juros,
      valorTotal,
    };
  }, [valor, vencimento]);

  return (
    <div className="container mx-auto max-w-2xl p-8">
      <Card>
        <CardHeader>
          <CardTitle>
            Calculadora de Juros por Atraso
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="valor">
              Valor da Dívida
            </Label>

            <Input
              id="valor"
              type="number"
              placeholder="1000"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="vencimento">
              Data de Vencimento
            </Label>

            <Input
              id="vencimento"
              type="date"
              value={vencimento}
              onChange={(e) =>
                setVencimento(e.target.value)
              }
            />
          </div>

          {resultado && (
            <div className="space-y-4 rounded-lg border p-4">
              <div className="flex justify-between">
                <span>Dias em atraso</span>

                <Badge>
                  {resultado.diasAtraso} dias
                </Badge>
              </div>

              <div className="flex justify-between">
                <span>Juros (2,5% ao dia)</span>

                <strong>
                  R$ {resultado.juros.toFixed(2)}
                </strong>
              </div>

              <div className="flex justify-between text-lg">
                <span>Valor Total</span>

                <strong>
                  R$ {resultado.valorTotal.toFixed(2)}
                </strong>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}