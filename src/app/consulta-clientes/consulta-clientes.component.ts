import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../services/clientes.service';

interface Cliente {
  idCliente: number,
  nome: string;
  email: string;
  cpf: string;
  dataCriacao: Date;
}

@Component({
  selector: 'app-consulta-clientes',
  templateUrl: './consulta-clientes.component.html',
  styleUrl: './consulta-clientes.component.css'
})

export class ConsultaClientesComponent implements OnInit {

  //atributos (campos)
  //clientes: Cliente[] = [];
  clientes: Cliente[] = []; //JSON array

  cliente: Cliente = {
    idCliente: 0,
    nome: '',
    email: '',
    cpf: '',
    dataCriacao: new Date()
  };

  //armazenar o numero de pagina que sendo acessada no componente de paginação
  page = 1;

  constructor(private clientesService: ClientesService) { }

  ngOnInit(): void {
    this.consultarClientes();
  }

  //função para executar a consultar de clientes na API
  consultarClientes(): void {
    this.clientesService.getAll()
      .subscribe(//promisse da API
        (response: any) => {//Obtendo o retorno de sucesso da API [anterior any[]]
          //this.clientes = data; [anterior]
          this.clientes = response.data;
        },
        e => {//Obtendo o retorno de erro da API
          console.log(e);
        }
      )
  }

  //função para realizar a paginação no
  //componente ngx-pagination
  handlePageChange(event: number) {
    this.page = event; // Atualiza a página atual com o número da página fornecida pelo eventos    
  }

  obterCliente(idCliente: number): void {

    this.clientesService.getById(idCliente)
      .subscribe(
        (response: any) => {

          console.log(response);
          this.cliente = response.data[0];
        },
        e => {
          console.log(e);
        }
      );

  }
}
