"use client";

import { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Produto {
  codigoProduto: number;
  descricaoProduto: string;
  estoque: number;
}

interface Movimentacao {
  id: string;
  codigoProduto: number;
  descricaoProduto: string;
  tipo: "entrada" | "saida";
  quantidade: number;
  descricao: string;
  data: string;
}

const estoqueInicial: Produto[] = [
  {
    codigoProduto: 101,
    descricaoProduto: "Caneta Azul",
    estoque: 150,
  },
  {
    codigoProduto: 102,
    descricaoProduto: "Caderno Universitário",
    estoque: 75,
  },
  {
    codigoProduto: 103,
    descricaoProduto: "Borracha Branca",
    estoque: 200,
  },
  {
    codigoProduto: 104,
    descricaoProduto: "Lápis Preto HB",
    estoque: 320,
  },
  {
    codigoProduto: 105,
    descricaoProduto: "Marcador de Texto Amarelo",
    estoque: 90,
  },
];

export default function ControleEstoquePage() {
  const [produtos, setProdutos] =
    useState<Produto[]>(estoqueInicial);

  const [movimentacoes, setMovimentacoes] = useState<
    Movimentacao[]
  >([]);

  const [open, setOpen] = useState(false);

  const [produtoSelecionado, setProdutoSelecionado] =
    useState<Produto | null>(null);

  const [tipoMovimento, setTipoMovimento] = useState<
    "entrada" | "saida"
  >("entrada");

  const [quantidade, setQuantidade] = useState("");

  const [descricao, setDescricao] = useState("");

  const abrirModal = (
    produto: Produto,
    tipo: "entrada" | "saida"
  ) => {
    setProdutoSelecionado(produto);
    setTipoMovimento(tipo);
    setQuantidade("");
    setDescricao("");
    setOpen(true);
  };

  const confirmarMovimentacao = () => {
    if (!produtoSelecionado) return;

    const qtd = Number(quantidade);

    if (!qtd || qtd <= 0) {
      alert("Informe uma quantidade válida.");
      return;
    }

    if (
      tipoMovimento === "saida" &&
      qtd > produtoSelecionado.estoque
    ) {
      alert("Estoque insuficiente.");
      return;
    }

    const produtosAtualizados = produtos.map((produto) => {
      if (
        produto.codigoProduto !==
        produtoSelecionado.codigoProduto
      ) {
        return produto;
      }

      return {
        ...produto,
        estoque:
          tipoMovimento === "entrada"
            ? produto.estoque + qtd
            : produto.estoque - qtd,
      };
    });

    setProdutos(produtosAtualizados);

    setMovimentacoes((prev) => [
      {
        id: crypto.randomUUID(),
        codigoProduto: produtoSelecionado.codigoProduto,
        descricaoProduto:
          produtoSelecionado.descricaoProduto,
        tipo: tipoMovimento,
        quantidade: qtd,
        descricao,
        data: new Date().toLocaleString(),
      },
      ...prev,
    ]);

    setOpen(false);
  };

  return (
    <div className="container mx-auto space-y-8 p-8">
      <h1 className="text-3xl font-bold">
        Controle de Estoque
      </h1>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Código</TableHead>
              <TableHead>Produto</TableHead>
              <TableHead>Estoque Atual</TableHead>
              <TableHead className="text-right">
                Ações
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {produtos.map((produto) => (
              <TableRow key={produto.codigoProduto}>
                <TableCell>
                  {produto.codigoProduto}
                </TableCell>

                <TableCell>
                  {produto.descricaoProduto}
                </TableCell>

                <TableCell>
                  <Badge variant="secondary">
                    {produto.estoque} unidades
                  </Badge>
                </TableCell>

                <TableCell>
                  <div className="flex justify-end gap-2">
                    <Button
                      onClick={() =>
                        abrirModal(
                          produto,
                          "entrada"
                        )
                      }
                    >
                      Entrada
                    </Button>

                    <Button
                      variant="destructive"
                      onClick={() =>
                        abrirModal(produto, "saida")
                      }
                    >
                      Saída
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">
          Histórico de Movimentações
        </h2>

        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Produto</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Quantidade</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Data</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {movimentacoes.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center"
                  >
                    Nenhuma movimentação registrada.
                  </TableCell>
                </TableRow>
              )}

              {movimentacoes.map((mov) => (
                <TableRow key={mov.id}>
                  <TableCell>
                    {mov.id.slice(0, 8)}
                  </TableCell>

                  <TableCell>
                    {mov.descricaoProduto}
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant={
                        mov.tipo === "entrada"
                          ? "default"
                          : "destructive"
                      }
                    >
                      {mov.tipo}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    {mov.quantidade}
                  </TableCell>

                  <TableCell>
                    {mov.descricao}
                  </TableCell>

                  <TableCell>{mov.data}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {tipoMovimento === "entrada"
                ? "Entrada de Estoque"
                : "Saída de Estoque"}
            </DialogTitle>

            <DialogDescription>
              Produto:{" "}
              {produtoSelecionado?.descricaoProduto}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="quantidade">
                Quantidade
              </Label>

              <Input
                id="quantidade"
                type="number"
                min="1"
                value={quantidade}
                onChange={(e) =>
                  setQuantidade(e.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="descricao">
                Descrição da movimentação
              </Label>

              <Textarea
                id="descricao"
                placeholder="Informe o motivo da movimentação"
                value={descricao}
                onChange={(e) =>
                  setDescricao(e.target.value)
                }
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancelar
              </Button>

              <Button
                onClick={confirmarMovimentacao}
              >
                Confirmar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}