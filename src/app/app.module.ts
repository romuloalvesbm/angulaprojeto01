import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastroClientesComponent } from './cadastro-clientes/cadastro-clientes.component';
import { ConsultaClientesComponent } from './consulta-clientes/consulta-clientes.component';


//importando as classes para uso da biblioteca de rotas angular
import { Routes, RouterModule} from '@angular/router';

//importando as classes para uso de biblioteca de formulários de angular
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//importando a classe para uso da biblioteca de acesso a APIS do angular (Http Client)
import { HttpClientModule} from '@angular/common/http';

//importando o módulo para configuração da biblioteca NgxPagination
import { NgxPaginationModule } from 'ngx-pagination';

//importando o módulo para configuração do Ng2SearchFilter
//import { Ng2SearchPipeModule } from 'ng2-search-filter';

//importando o módulo para configuração do NgxMask
import { NgxMaskModule, IConfig } from 'ngx-mask';

//Mapear uma rota (url) para cadas componente do projeto
const routes : Routes = [
  { path: 'cadastro-clientes', component : CadastroClientesComponent },
  { path: 'consulta-clientes', component : ConsultaClientesComponent }
];

//configuração para inicialização do NgxMask
export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};

@NgModule({
  declarations: [
    AppComponent,
    CadastroClientesComponent,
    ConsultaClientesComponent
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule, // registrando o paginação da tabela
    //Ng2SearchPipeModule, // registrando o filter
    HttpClientModule,  //registrando biblioteca para chamadas de API
    FormsModule, //registrando biblioteca para formulários
    ReactiveFormsModule, //registrando biblioteca para formulários
    NgxMaskModule.forRoot(), //registrando biblioteca para formulários
    RouterModule.forRoot(routes) //registrando a configuração de rotas!
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
