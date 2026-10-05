import Link from "next/link";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { navItems } from "@/lib/nav";
import { cn } from "cn";

const sections = [
  {
    href: "/comissoes",
    title: "Comissões",
    description: "Acompanhe e calcule comissões de vendas em um só lugar.",
  },
  {
    href: "/gestao-de-estoque",
    title: "Gestão de Estoque",
    description: "Controle entradas, saídas e disponibilidade de produtos.",
  },
  {
    href: "/juros",
    title: "Juros",
    description: "Simule e gerencie juros aplicados às operações financeiras.",
  },
] as const;

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-4 py-12">
      <section className="flex max-w-2xl flex-col gap-4">
        <p className="text-sm font-medium text-muted-foreground">
          {navItems[0].label}
        </p>
        <h1 className="font-heading text-4xl font-semibold tracking-tight">
          Operação comercial em um único painel
        </h1>
        <p className="text-lg leading-7 text-muted-foreground">
          Acesse comissões, estoque e juros com a mesma interface. Use a barra
          superior para navegar entre as áreas.
        </p>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/comissoes"
            className={cn(buttonVariants({ variant: "default" }))}
          >
            Ver comissões
          </Link>
          <Link
            href="/gestao-de-estoque"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            Ir para estoque
          </Link>
        </div>
      </section>

      <Separator />

      <section className="grid gap-4 sm:grid-cols-3">
        {sections.map((section) => (
          <Link key={section.href} href={section.href} className="block">
            <Card className="h-full transition-colors hover:bg-muted/40">
              <CardHeader>
                <CardTitle>{section.title}</CardTitle>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </section>
    </div>
  );
}
