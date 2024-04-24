import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface Cliente {
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

  //armazenar o numero de pagina que sendo acessada no componente de paginação
  page = 1;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.consultarClientes();
  }

  //função para executar a consultar de clientes na API
  consultarClientes(): void {    
    this.httpClient.get<{ data: Cliente[] }>(environment.apiUrl + "/api/clientes")
      .subscribe(//promisse da API
        (response: any) => {//Obtendo o retorno de sucesso da API [anterior any[]]
          //this.clientes = data; [anterior]
          this.clientes = response.data;
          console.log(this.clientes);
        },
        e => {//Obtendo o retorno de erro da API
          
        }
      )
  }

  //função para realizar a paginação no
  //componente ngx-pagination
  handlePageChange(event: number) {
    this.page = event; // Atualiza a página atual com o número da página fornecida pelo eventos    
  }
}
