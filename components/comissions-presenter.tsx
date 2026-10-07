import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

  //types
import { ResultadoVendedor } from "@/lib/calculateComissions";
  
  interface comissionsPresenterProps {
    comissions: ResultadoVendedor[];
  }
  
  export function ComissionsPresenter({ comissions }: comissionsPresenterProps) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Vendedor</TableHead>
            <TableHead>Valor da venda</TableHead>
            <TableHead>Comissão</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {comissions.map((comission, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{comission.vendedor}</TableCell>
              <TableCell>{comission.totalVendas}</TableCell>
              <TableCell>{comission.comissaoTotal}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        
      </Table>
    )
  }
  