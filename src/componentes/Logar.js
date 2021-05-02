import React, { Component } from 'react'

export default class Login extends Component {

    state = {
        login : "",
        senha : ""

    }

    txtLogin_change = (event) => {
        this.setState({login: event.target.value})
    }
    txtSenha_change = (event) => {
        this.setState({senha: event.target.value})
    }

    entrar = () =>{

        const dados = {
            "login": this.state.login,
            "senha": this.state.senha
        }

    const requestOptions = {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        }
    }

    const url = "http://localhost:9090/usuario/autenticar/" + dados.login + '/' + dados.senha

    fetch(url, requestOptions)
        .then(console.log('Logado'))
        .then(this.setState({logando:true}))
        .catch(erro => console.log(erro));
}



render() {
    return (
        <div className="mt-1 mb-3">
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

}