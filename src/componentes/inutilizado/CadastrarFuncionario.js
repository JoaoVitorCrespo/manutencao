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
        tipoUsuario: ""
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

        const url = "http://localhost:8080/usuario/cadastrar"

        fetch(url, requestOptions)
            .then(console.log('Gravado'))
            .catch(erro => console.log(erro));


    }

    render() {
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
                        <a className="btn btn-dark" href="/" role="button">Voltar</a>    
                    </div>
                </div>
            </div>

    

              
            </div>
        )
    }
}
