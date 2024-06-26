import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ClientesService {

  //atributo
  url = environment.apiUrl + "/api/clientes";

   //inicializando HttpClient por meio de injeção de dependência
  constructor(private httpClient: HttpClient) { }

  //função para executar uma chamada POST para a API..
  create(cliente: any) {
    return this.httpClient.post(this.url, cliente);
  }

  //função para executar uma chamada PUT para a API..
  update(cliente: any) {
    return this.httpClient.put(this.url, cliente);
  }

  //função para executar uma chamada DELETE para a API..
  delete(idCliente: any) {
    return this.httpClient.delete(this.url + "/" + idCliente);
  }

  //função para executar uma chamada GET para a API..
  getAll() {
    return this.httpClient.get(this.url);
  }

  //função para executar uma chamada GET para a API..
  getById(idCliente: any) {
    return this.httpClient.get(this.url + "/" + idCliente);
  }

}
