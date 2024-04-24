import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastroClientesComponent } from './cadastro-clientes/cadastro-clientes.component';
import { ConsultaClientesComponent } from './consulta-clientes/consulta-clientes.component';
import { NgxPaginationModule } from 'ngx-pagination'; // Importe o módulo NgxPaginationModule

//importando as classes para uso da biblioteca de rotas angular
import { Routes, RouterModule} from '@angular/router';

//importando as classes para uso de biblioteca de formulários de angular
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//importando a classe para uso da biblioteca de acesso a APIS do angular (Http Client)
import { HttpClientModule} from '@angular/common/http';

//Mapear uma rota (url) para cadas componente do projeto
const routes : Routes = [
  { path: 'cadastro-clientes', component : CadastroClientesComponent },
  { path: 'consulta-clientes', component : ConsultaClientesComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    CadastroClientesComponent,
    ConsultaClientesComponent
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule, // registrando o paginação da tabela
    HttpClientModule,  //registrando biblioteca para chamadas de API
    FormsModule, //registrando biblioteca para formulários
    ReactiveFormsModule, //registrando biblioteca para formulários
    RouterModule.forRoot(routes) //registrando a configuração de rotas!
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
