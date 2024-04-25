import { Component } from '@angular/core';
import { NgForm } from '@angular/forms'; // Importe NgForm [Anterior não precisa]
import { ClientesService } from '../services/clientes.service';

// Especificando os tipos de dados dos atributos
interface Cliente {
  cpf: string;
  nome: string;
  email: string;
}

@Component({
  selector: 'app-cadastro-clientes',
  templateUrl: './cadastro-clientes.component.html',
  styleUrls: ['./cadastro-clientes.component.css']
})
export class CadastroClientesComponent {

  //atributos
  mensagem_sucesso: string = '';
  mensagem_erro: string = '';

  //capturar as mensagens de erro de validação da API
  errors = {
  Cpf: [], Email: [], Nome: []
  }


  //declarando uma variavel chamada httpClient por meio injeção de dependencia 
  constructor(private clientesService: ClientesService) { }

  // Função executada no evento (submit) do formulário
  cadastrarCliente(formCadastro: NgForm): void { // Especifique o tipo como NgForm ||| codigo anterior [cadastrarCliente(formCadastro): void]

    this.limparMensagens();

    // Capturando os campos do formulário
    const { nome, email, cpf } = formCadastro.form.value;
    const cliente: Cliente = { cpf, nome, email }; // passando as informações para a variavel
    
    // Enviando uma requisição HTTP POST para uma API
    this.clientesService.create(cliente)
      .subscribe(
        (response: any) => { // Sucesso!
         
          this.mensagem_sucesso = response.message;
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