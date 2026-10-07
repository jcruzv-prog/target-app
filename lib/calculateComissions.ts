

interface Venda {
    vendedor: string;
    valor: number;
  }
  
  interface DadosVendas {
    vendas: Venda[];
  }
  
  export interface ResultadoVendedor {
    vendedor: string;
    totalVendas: number;
    comissaoTotal: number;
  }
  
  export function calcularComissoes(data: DadosVendas): ResultadoVendedor[] {
    const resumen: { [key: string]: { totalVendas: number; comissaoTotal: number } } = {};
  
    data.vendas.forEach((venda) => {
      let comissao = 0;
  
      if (venda.valor >= 500) {
        comissao = venda.valor * 0.05; // 5%
      } else if (venda.valor >= 100) {
        comissao = venda.valor * 0.01; // 1%
      }
  
      if (!resumen[venda.vendedor]) {
        resumen[venda.vendedor] = { totalVendas: 0, comissaoTotal: 0 };
      }
  
      resumen[venda.vendedor].totalVendas += venda.valor;
      resumen[venda.vendedor].comissaoTotal += comissao;
    });
  
    return Object.keys(resumen).map((vendedor) => ({
      vendedor,
      totalVendas: resumen[vendedor].totalVendas,
      comissaoTotal: Number(resumen[vendedor].comissaoTotal.toFixed(2)),
    }));
  }
