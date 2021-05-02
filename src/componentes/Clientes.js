import React, { Component } from 'react'

export default class Clientes extends Component {

    state={
        cpf:"",
        nome:"",
        email:"",
        login:"",
        senha:"",
        contato:"",
        tipoUsuario:"cliente",
        listaClientes: [],
        incluindo: false,
        alterando: false
    }

    txtCPF_change = (event) =>{
        this.setState({cpf: event.target.value})
    }

    txtNome_change = (event) =>{
        this.setState({nome: event.target.value})
    }

    txtEmail_change = (event) =>{
        this.setState({email: event.target.value})
    }

    txtLogin_change = (event) =>{
        this.setState({login: event.target.value})
    }

    txtSenha_change = (event) =>{
        this.setState({senha: event.target.value})
    }

    txtContato_change = (event) =>{
        this.setState({contato: event.target.value})
    }

    gravar = () =>{
        const dados = {
            "cpf":this.state.cpf,
            "nomeUsuario":this.state.nome,
            "login":this.state.login,
            "senha":this.state.senha,
            "contato":this.state.contato,
            "email":this.state.email,
            "tipoUsuario":this.state.tipoUsuario
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
            .then(this.setState({incluindo: false}))
            .then(this.listar())
            .then(window.location.reload())
            .catch (erro => console.log(erro));
    }

    listar = () =>{
        const url = window.URL + '/usuario/'

        fetch(url)
            .then(response => response.json())
            .then (data => this.setState({listaClientes: data}));
    }

    componentDidMount(){
        this.listar()
    }

    voltar = () =>{
        this.setState({incluindo: false, alterando: false})
    }

    iniciarGravar = () =>{
        this.setState({incluindo: true, alterando: false, cpf:'', nome:'', login:'', senha:'', contato: '', email:'', tipoUsuario: 'cliente'})

    }

    iniciarEditar = (cliente) =>{
        this.setState({alterando: true,
            incluindo: false, 
            cpf: cliente.cpf, 
            nome: cliente.nomeUsuario, 
            login: cliente.login, 
            senha: cliente.senha, 
            contato: cliente.contato, 
            email: cliente.email, 
            tipoUsuario: cliente.tipoUsuario})
    }

    gravarEdicao = () =>{
        const dados = {
            "cpf":this.state.cpf,
            "nomeUsuario":this.state.nome,
            "login":this.state.login,
            "senha":this.state.senha,
            "contato":this.state.contato,
            "email":this.state.email,
            "tipoUsuario":this.state.tipoUsuario
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(dados)
        };

        const url = window.URL + '/usuario/alterar/' + dados.cpf

        fetch(url, requestOptions)
            .then(this.setState({alterando: false}))
            .then(this.listar())
            .then(window.location.reload())
            .catch (erro => console.log(erro));
    }

    excluir = (cliente) =>{
        
        const requestOptions = {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        };

        const url = window.URL + '/usuario/excluir/' + cliente.cpf

        fetch(url, requestOptions)
            .then(this.listar())
            .then(window.location.reload())
            .catch (erro => console.log(erro));
    }

    renderCadastrarCliente = ()=>{
        return(
            <div>
               <div className="row mt-2">
                   <div className="col-2">
                       CPF:
                   </div>
                   <div className="row mt-2">
                       <div className="col-4">
                       <input value={this.state.cpf} onChange={this.txtCPF_change} className="form-control name-pull-image" type="text" placeholder="111.111.111-11"></input>
                       </div>
                   </div>
                   <div className="col-2">
                       Nome:
                   </div>
                   <div className="row mt-2">
                       <div className="col-4">
                       <input value={this.state.nome} onChange={this.txtNome_change} className="form-control name-pull-image" type="text" placeholder="Robson Cesar"></input>
                       </div>
                   </div>
                   <div className="col-2">
                       E-mail:
                   </div>
                   <div className="row mt-2">
                       <div className="col-4">
                       <input value={this.state.email} onChange={this.txtEmail_change} className="form-control name-pull-image" type="text" placeholder="robson@robson.com"></input>
                       </div>
                   </div>
                   <div className="col-2">
                       Login:
                   </div>
                   <div className="row mt-2">
                       <div className="col-4">
                       <input value={this.state.login} onChange={this.txtLogin_change} className="form-control name-pull-image" type="text" placeholder="robson"></input>
                       </div>
                   </div>
                   <div className="col-2">
                       Senha:
                   </div>
                   <div className="row mt-2">
                       <div className="col-4">
                       <input value={this.state.senha} onChange={this.txtSenha_change} className="form-control name-pull-image" type="text" placeholder="12345678"></input>
                       </div>
                   </div>
                   <div className="col-2">
                       Telefone de Contato:
                   </div>
                   <div className="row mt-2">
                       <div className="col-4">
                       <input value={this.state.contato} onChange={this.txtContato_change} className="form-control name-pull-image" type="text" placeholder="22 997229720"></input>
                       </div>
                   </div>
                   <div className="row mt-2">
                       <div className="col-1">
                           <button className="btn btn-outline-success" onClick ={() => this.gravar()}>Gravar</button>
                       </div>
                       <div className="col-2">

                       </div>
                       <div className="col-1">
                           <button className="btn btn-outline-danger" onClick ={() => this.voltar()} >Voltar</button>
                       </div>
                   </div>
               </div>
            </div>
        )
    }

    renderListarClientes = () =>{
        return (
            <div>
                <button type="button" className="btn btn-outline-dark" onClick={() => this.iniciarGravar()}>Cadastrar Novo</button>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">CPF</th>
                            <th scope="col">NOME</th>
                            <th scope="col">LOGIN</th>
                            <th scope="col">SENHA</th>
                            <th scope="col">EMAIL</th>
                            <th scope="col">CONTATO</th>
                            <th scope="col">TIPO</th>
                            <th scope="col">EDITAR</th>
                            <th scope="col">EXCLUIR</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.listaClientes && this.state.listaClientes.map(cliente =>{
                            return <tr key={cliente.cpf}>
                                <th scope="row">{cliente.cpf}</th>
                                <td>{cliente.nomeUsuario}</td>
                                <td>{cliente.login}</td>
                                <td>{cliente.senha}</td>
                                <td>{cliente.email}</td>
                                <td>{cliente.contato}</td>
                                <td>{cliente.tipoUsuario}</td>
                                <td>
                                    <button type="button" className="btn btn-outline-success" onClick ={()=> this.iniciarEditar(cliente)} data-toggle="tooltip" data-placement="top" title="Editar" >
                                        <i className="bi bi-pencil-square"></i>
                                    </button>
                                </td>
                                <td>
                                    <button type="button" className="btn btn-outline-danger" onClick ={()=> this.excluir(cliente)} data-toggle="tooltip" data-placement="top" title="Excluir">
                                    <i className="bi bi-trash-fill"></i>
                                    </button>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        )
    }

    renderEditarCliente = ()=>{
        return(
            <div>
               <div className="row mt-2">
                   <div className="col-2">
                       CPF:
                   </div>
                   <div className="row mt-2">
                       <div className="col-4">
                       <input value={this.state.cpf} readOnly className="form-control name-pull-image" type="text"></input>
                       </div>
                   </div>
                   <div className="col-2">
                       Nome:
                   </div>
                   <div className="row mt-2">
                       <div className="col-4">
                       <input value={this.state.nome} onChange={this.txtNome_change} className="form-control name-pull-image" type="text"></input>
                       </div>
                   </div>
                   <div className="col-2">
                       E-mail:
                   </div>
                   <div className="row mt-2">
                       <div className="col-4">
                       <input value={this.state.email} onChange={this.txtEmail_change} className="form-control name-pull-image" type="text"></input>
                       </div>
                   </div>
                   <div className="col-2">
                       Login:
                   </div>
                   <div className="row mt-2">
                       <div className="col-4">
                       <input value={this.state.login} onChange={this.txtLogin_change} className="form-control name-pull-image" type="text"></input>
                       </div>
                   </div>
                   <div className="col-2">
                       Senha:
                   </div>
                   <div className="row mt-2">
                       <div className="col-4">
                       <input value={this.state.senha} onChange={this.txtSenha_change} className="form-control name-pull-image" type="text"></input>
                       </div>
                   </div>
                   <div className="col-2">
                       Telefone de Contato:
                   </div>
                   <div className="row mt-2">
                       <div className="col-4">
                       <input value={this.state.contato} onChange={this.txtContato_change} className="form-control name-pull-image" type="text"></input>
                       </div>
                   </div>
                   <div className="row mt-2">
                       <div className="col-1">
                           <button className="btn btn-primary" onClick ={() => this.gravarEdicao()}>Gravar</button>
                       </div>
                       <div className="col-1">
                           <button className="btn btn-primary" onClick ={() => this.voltar()}>Voltar</button>
                       </div>
                   </div>
               </div>
            </div>
        )
    }

    render() {
        let pagina=''
        if(this.state.incluindo){
            pagina = this.renderCadastrarCliente()
        }else{
            if(this.state.alterando){
                pagina = this.renderEditarCliente()
            } else{
                pagina = this.renderListarClientes()
            }
        }
        return pagina
    }
}
