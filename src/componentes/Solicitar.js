import React, { Component } from 'react'

export default class Solicitar extends Component {

    state = {
        resumo:"",
        descricao:"",
        nome:"",
        local:""
    }

    txtResumo_change = (event) => {
        this.setState({resumo: event.target.value})
    }

    txtDescricao_change = (event) => {
        this.setState({descricao: event.target.value})
    }

    txtNome_change = (event) => {
        this.setState({nome: event.target.value})
    }

    txtLocal_change = (event) => {
        this.setState({local: event.target.value})
    }

    cadastrarNova = () => {
        const dados ={
            titulo:this.state.resumo,
            descricaoSolicitacao:this.state.descricao,
            equipamentoUsuario:this.state.nome,
            local:this.state.local
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        };

        const url = window.URL + '/solicitacao/cadastrar'

        fetch(url, requestOptions)
            .then(console.log('Cadastrado'))
            .then(window.location.reload())
            .catch(erro => console.log(erro));
    }

    render() {
        return (

            <div>
                <div className="row">

                    <div className="col-6">
                        <h4>Resumo da solicitação (Exemplo: Troca de Mouse)</h4>
                    </div>

                    <div className="row mt-2">
                        <div className="col-6">
                            <input value={this.state.resumo} onChange={this.txtResumo_change} className="form-control name-pull-image" type="text"></input>
                        </div>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-6">
                        <h4>Descrição do problema:</h4>
                    </div>

                    <div className="row mt-2">
                        <div className="col-6">
                            <textarea value={this.state.descricao} onChange={this.txtDescricao_change} className="form-control"  rows="8" type="text"></textarea>
                        </div>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-6">
                        <h4>Nome do equipamento:</h4>
                    </div>

                    <div className="row mt-2">
                        <div className="col-6">
                        <input value={this.state.nome} onChange={this.txtNome_change} className="form-control name-pull-image" type="text"></input>
                        </div>
                    </div>
                </div>
                
                <div className="row mt-3">
                    <div className="col-6">
                        <h4>Local:</h4>
                    </div>

                    <div className="row mt-2">
                        <div className="col-6">
                            <input value={this.state.local} onChange={this.txtLocal_change} className="form-control name-pull-image" type="text"></input>
                        </div>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-1">
                        <button className="btn btn-dark" onClick={() => this.cadastrarNova()}>Cadastrar</button>
                    </div>

                    <div className="col-1">
                        <button className="btn btn-dark">Voltar</button>
                    </div>
                </div>              
           
            </div>    
        )
    }
}
