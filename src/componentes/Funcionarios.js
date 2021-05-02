import React, { Component } from 'react'

const options = [
    {
      label: "Escolha...",
      value: null,
    },
    {
      label: "Gestor",
      value: "gestor",
    },
    {
      label: "Tecnico",
      value: "tecnico",
    },
  ];

export default class Home extends Component {
    
    state = {
        cpf: "",
        nomeUsuario: "",
        login: "",
        senha:"",
        contato: "",
        email: "",
        tipoUsuario: "",
        lista: [],
        alterando: false,
        incluindo: false
    }
    
    txtNome_change = (event) => {
        this.setState({nomeUsuario: event.target.value})
    }
    txtCPF_change = (event) => {
        this.setState({cpf: event.target.value})
    }
    txtEmail_change = (event) => {
        this.setState({email: event.target.value})
    }
    txtLogin_change = (event) => {
        this.setState({login: event.target.value})
    }
    txtSenha_change = (event) => {
        this.setState({senha: event.target.value})
    }
    txtContato_change = (event) => {
        this.setState({contato: event.target.value})
    }
    txtTipoUsuario_change = (event) => {
        this.setState({tipoUsuario: event.target.value})
    }
    
    preencherLista = () => {

        const url = window.URL + '/usuario/funcionarios/'
        fetch(url)
            .then(response => response.json())
            .then(data => this.setState({lista: data}))

    }

    excluir = (lista) => {

        const requestOptions = {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        };

        const url = window.URL + '/usuario/excluir/' + lista.cpf;

        fetch(url, requestOptions)
            .then(console.log('Excluindo'))
            .then(this.preencherLista())
            .catch(erro => console.log(erro));

    }

    gravar = () =>{

        

        const dados = {
            "cpf": this.state.cpf,
            "nomeUsuario": this.state.nomeUsuario,
            "login": this.state.login,
            "senha": this.state.senha,
            "contato": this.state.contato,
            "email": this.state.email,
            "tipoUsuario": this.state.tipoUsuario
        }



        const requestOptions = {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(dados)
        };

        const url = window.URL + '/usuario/cadastrar'

        fetch(url, requestOptions)
            .then(console.log('Gravado'))
            .then(this.setState({incluindo: false}))
            .then(this.preencherLista())
            .catch(erro => console.log(erro));


    }

    alterar = (lista) =>{

        

        const dados = {
            "nomeUsuario": this.state.nomeUsuario,
            "login": this.state.login,
            "senha": this.state.senha,
            "contato": this.state.contato,
            "email": this.state.email,
            "tipoUsuario": this.state.tipoUsuario
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(dados)
        };

        const url = window.URL + '/usuario/alterar/' + lista

        fetch(url, requestOptions)
            .then(console.log('Alterado'))
            .then(this.setState({alterando: false}))
            .then(this.preencherLista())
            .catch(erro => console.log(erro));


    }

    iniciarGravacao = () =>{
        this.setState({incluindo: true, alterando: false, cpf: '', nomeUsuario: '', login: '', senha: '', contato: '', email: '', tipoUsuario: ''})
    }

    iniciarAlteracao = (lista) =>{
        this.setState({incluindo: false, alterando: true, cpf: lista.cpf, nomeUsuario: lista.nomeUsuario, login: lista.login, senha: lista.senha, contato: lista.contato, email: lista.email, tipoUsuario: lista.tipoUsuario})
    }

    voltar = () =>{
        this.setState({incluindo: false, alterando: false, cpf: '', nomeUsuario: '', login: '', senha: '', contato: '', email: '', tipoUsuario: ''})
    }
     
    componentDidMount(){
        this.preencherLista()
    }

    renderCadastrarFuncionario() {
        return (
            <div className="mt-1 mb-3">
                
            <div className="form-group col-md-6">
                <label >CPF</label>
                <input value={this.state.cpf} onChange={this.txtCPF_change} type="cpf" className="form-control" id="cpf" placeholder="CPF do Funcionário"></input>
            </div>    
            <div className="form-group col-md-6">
                <label >Nome</label>
                <input value={this.state.nomeUsuario} onChange={this.txtNome_change} type="nome" className="form-control" id="nomeUsuario" placeholder="Joao"></input>
            </div>
            <div className="form-group col-md-6">
                <label >Endereço de Email</label>
                <input value={this.state.email} onChange={this.txtEmail_change} type="email" className="form-control" id="email" placeholder="joao@empresa.com"></input>  
            </div>
            <div className="form-group col-md-6">
                <label >Login</label>
                <input value={this.state.login} onChange={this.txtLogin_change} type="login" className="form-control" id="login" placeholder="Login"></input>
            </div>
            <div className="form-group col-md-6">
                <label >Senha</label>
                <input value={this.state.senha} onChange={this.txtSenha_change} type="senha" className="form-control" id="senha" placeholder="Senha"></input>
            </div>
            <div className="form-group col-md-6">
                <label >Contato</label>
                <input value={this.state.contato} onChange={this.txtContato_change} type="contato" className="form-control" id="contato" placeholder="Telefone"></input>
            </div>
                <label>Tipo de Usuário</label>
            <br></br>
            <div className="form-group col-md-6">
                    <div className="select-form">
                        <select value={this.state.tipoUsuario} onChange={this.txtTipoUsuario_change}>
                            {options.map((option) => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
            </div>
            <br></br>        
            </div>
            <div className="form-group col-md-11">
                <div className="row">
                    <div className="col">
                        <button type="enviar" className="btn btn-primary" onClick = {() => this.gravar()}>Enviar</button>
                     </div>
                    <div className="col">
                    <button type="enviar" className="btn btn-dark" onClick = {() => this.voltar()}>Voltar</button>
                    </div>
                </div>
            </div>

    

              
            </div>
        )
    }

    renderAlterarFuncionario() {
        return (
            <div className="mt-1 mb-3">
                
            <div className="form-group col-md-6">
                <label >CPF</label>
                <input value={this.state.cpf} readOnly type="cpf" className="form-control" id="cpf" placeholder="CPF do Funcionário"></input>
            </div>    
            <div className="form-group col-md-6">
                <label >Nome</label>
                <input value={this.state.nomeUsuario} onChange={this.txtNome_change} type="nome" className="form-control" id="nomeUsuario" placeholder="Joao"></input>
            </div>
            <div className="form-group col-md-6">
                <label >Endereço de Email</label>
                <input value={this.state.email} onChange={this.txtEmail_change} type="email" className="form-control" id="email" placeholder="joao@empresa.com"></input>  
            </div>
            <div className="form-group col-md-6">
                <label >Login</label>
                <input value={this.state.login} onChange={this.txtLogin_change} type="login" className="form-control" id="login" placeholder="Login"></input>
            </div>
            <div className="form-group col-md-6">
                <label >Senha</label>
                <input value={this.state.senha} onChange={this.txtSenha_change} type="senha" className="form-control" id="senha" placeholder="Senha"></input>
            </div>
            <div className="form-group col-md-6">
                <label >Contato</label>
                <input value={this.state.contato} onChange={this.txtContato_change} type="contato" className="form-control" id="contato" placeholder="Telefone"></input>
            </div>
                <label>Tipo de Usuário</label>
            <br></br>
            <div className="form-group col-md-6">
                    <div className="select-form">
                        <select value={this.state.tipoUsuario} onChange={this.txtTipoUsuario_change}>
                            {options.map((option) => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
            </div>
            <br></br>        
            </div>
            <div className="form-group col-md-11">
                <div className="row">
                    <div className="col">
                        <button type="enviar" className="btn btn-primary" onClick = {() => this.alterar(this.state.cpf)}>Enviar</button>
                     </div>
                    <div className="col">
                    <button type="enviar" className="btn btn-dark" onClick = {() => this.voltar()}>Voltar</button>
                    </div>
                </div>
            </div>

    

              
            </div>
        )
    }

    renderExibirFuncionarios(){
        
        return(
        <div>
                <button type="button" className="btn btn-dark" onClick={() => this.iniciarGravacao()}>Novo Funcionário</button>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col"> CPF</th>
                            <th scope="col"> Nome</th>
                            <th scope="col"> Login</th>
                            <th scope="col"> Senha</th>
                            <th scope="col"> Email</th>
                            <th scope="col"> Contato</th>
                            <th scope="col"> Função</th>
                            <th scope="col"> Alterar</th>
                            <th scope="col"> Excluir</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.lista && this.state.lista.map(lista =>{
                            return <tr key={lista.cpf}>
                                <th scope="row">{lista.cpf}</th>
                                <td>{lista.nomeUsuario}</td>
                                <td>{lista.login}</td>
                                <td>{lista.senha}</td>
                                <td>{lista.email}</td>
                                <td>{lista.contato}</td>
                                <td>{lista.tipoUsuario}</td>
                                <td><button className="btn btn-primary" onClick={() => this.iniciarAlteracao(lista)} data-toggle="tooltip" data-placement="top" title="Alterar"><i className="bi bi-pencil"></i></button></td>
                                <td><button className="btn btn-danger" onClick={() => this.excluir(lista)} data-toggle="tooltip" data-placement="top" title="Excluir"><i className="bi bi-trash"></i></button></td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        
        )
    }
    
    render() {

        let pagina = ''
        if (this.state.incluindo){
            pagina = this.renderCadastrarFuncionario()
        } else {
            if(this.state.alterando){
                pagina = this.renderAlterarFuncionario()
            } else {
                pagina = this.renderExibirFuncionarios()
            }
        }
        return pagina
    }
}