import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Cancelar from './componentes/Cancelar'
import Home from './componentes/Home'
import Listar from './componentes/Listar'
import Menu from './componentes/Menu'
import Rodape from './componentes/Rodape'
import Solicitar from './componentes/Solicitar'
import Funcionarios from './componentes/Funcionarios'
import Clientes from './componentes/Clientes'



export default class App extends Component {

  state = {
    login: '',
    senha: '',
    autenticado: false,
    person: []
  }

  txtLogin_change = (event) => {
      this.setState({login: event.target.value})
    }
  txtSenha_change = (event) => {
      this.setState({senha: event.target.value})
    }   
  
  

  entrar = () =>{

    const url = "http://localhost:9090/usuario/autenticar/" + this.state.login + '/' + this.state.senha

    fetch(url)
        .then(response => response.json())
        .then(data => this.setState({person: data}))
        .then(this.setState({autenticado: true}));
    }

  telaLogin(){
    return(

      <div className="">
            <h2>Login</h2>       
                <input value={this.state.login} onChange={this.txtLogin_change} type="text" ></input>
            <p></p>
            <h2>Senha</h2>       
                <input value={this.state.senha} onChange={this.txtSenha_change} type="password" ></input>
            <p></p> 
                <button className="btn btn-dark" type="button" onClick = {() => this.entrar()}>Entrar</button>
        </div>
    
    )
  }

  renderClienteTecnico(){
    return (
      <BrowserRouter>
        <div className="container-fluid">
            <Menu tipo={this.state.person.tipoUsuario}/>

            <div className="row mt-5">
              <div className="col-12 p-3">
                <Switch>
                    <Route exact path="/">
                      <Home nome={this.state.person.nomeUsuario}/>
                    </Route>
                    <Route path="/listar">
                      <Listar />
                    </Route>
                    <Route path="/cancelar">
                      <Cancelar />
                    </Route>
                    <Route path="/solicitar">
                      <Solicitar />
                    </Route>
                </Switch>
              </div>
            </div>
        </div>
        <Rodape />
      </BrowserRouter>
    )
  }


  renderGerenteLogado() {
    return (
      <BrowserRouter>
        <div className="container-fluid">
            <Menu tipo={this.state.person.tipoUsuario}/>

            <div className="row mt-5">
              <div className="col-12 p-3">
                <Switch>
                    <Route exact path="/">
                      <Home nome={this.state.person.nomeUsuario}/>
                    </Route>
                    <Route path="/listar">
                      <Listar />
                    </Route>
                    <Route path="/cancelar">
                      <Cancelar />
                    </Route>
                    <Route path="/solicitar">
                      <Solicitar />
                    </Route>
                    <Route path="/funcionarios">
                      <Funcionarios />
                    </Route>
                    <Route path="/clientes">
                      <Clientes />
                    </Route>
       
                </Switch>
              </div>
            </div>
        </div>
        <Rodape />
      </BrowserRouter>

    )
  }

  render(){

    let pagina = ''
    if(this.state.autenticado){
      if(this.state.person.tipoUsuario === 'gestor'){
        pagina = this.renderGerenteLogado()
      } else {
        pagina = this.renderClienteTecnico()
      }
    } else {
      pagina = this.telaLogin()
    }

    return pagina
  }
}

