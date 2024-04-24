import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'; // Importe NgForm
import { HttpClient } from '@angular/common/http'; //[Anterior não precisa]
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-cadastro-clientes',
  templateUrl: './cadastro-clientes.component.html',
  styleUrls: ['./cadastro-clientes.component.css']
})
export class CadastroClientesComponent implements OnInit {

  //atributos
  mensagem_sucesso: string = '';
  mensagem_erro: string = '';

  //capturar as mensagens de erro de validação da API
  errors = {
  Cpf: [], Email: [], Nome: []
  }


  //declarando uma variavel chamada httpClient por meio injeção de dependencia 
  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  // Função executada no evento (submit) do formulário
  cadastrarCliente(formCadastro: NgForm): void { // Especifique o tipo como NgForm ||| codigo anterior [cadastrarCliente(formCadastro): void]

    this.limparMensagens();

    // Capturando os campos do formulário
    const { nome, email, cpf } = formCadastro.form.value;

    // Especificando os tipos de dados dos atributos
    interface Cliente {
      cpf: string;
      nome: string;
      email: string;
    }

    // Criando a variável do tipo Cliente e pegando os valores do formulário
    const cliente: Cliente = {
      cpf: cpf,
      nome: nome,
      email: email
    };

    // Enviando uma requisição HTTP POST para uma API
    this.httpClient.post(environment.apiUrl + '/api/clientes', cliente)
      .subscribe(
        (data: any) => { // Sucesso!

          this.mensagem_sucesso = data.mensagemSucesso;
          //limpar os campos do formuário (reset)
          formCadastro.form.reset();
        },
        e => { // Erro!

          //verificando qual o status de
          //erro foi retornado pela API..
          switch (e.status) {
            case 400: //BAD REQUEST
              this.errors = e.error.errors;
              console.log(this.errors);
              break;
            case 403: //FORBIDDEN
              this.mensagem_erro = e.error.mensagemErro;
              break;
            default:
              this.mensagem_erro = "Não foi possível realizar a operação.";
              break;
          }
        }
      );
  }

  //função para limpar as mensagens do formulário
  limparMensagens(): void {
    this.mensagem_sucesso = '';
    this.mensagem_erro = '';
  }
}