import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class Menu extends Component {

    renderGerente(){
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-light fixed-top pl-5">
                <div className="col-12 bg-dark text-white p-2">
                    <Link className="navbar-brand" to="/"><i className="bi bi-house-door"></i></Link>
                    <Link className="navbar-brand" to="/solicitar"><i className="bi bi-plus-square"></i>   Solicitar</Link>
                    <Link className="navbar-brand" to="/cancelar">Cancelar</Link>
                    <Link className="navbar-brand" to="/listar">Listar</Link>
                    <Link className="navbar-brand" to="/funcionarios"><i className="bi bi-people-fill"></i>    Funcionarios</Link>
                    <Link className="navbar-brand" to="/clientes"><i className="bi bi-person-lines-fill"></i>    Clientes</Link>
                </div>
            </nav>
        )
    }

    renderClienteTecnico(){
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-light fixed-top pl-5">
                <div className="col-12 bg-dark text-white p-2">
                    <Link className="navbar-brand" to="/"><i className="bi bi-house-door"></i></Link>
                    <Link className="navbar-brand" to="/solicitar"><i className="bi bi-plus-square"></i>   Solicitar</Link>
                    <Link className="navbar-brand" to="/cancelar">Cancelar</Link>
                    <Link className="navbar-brand" to="/listar">Listar</Link>
                </div>
            </nav>
        )
    }
    render() {
        let pagina = ''
        if(this.props.tipo === 'gestor'){
            pagina = this.renderGerente()
        } else {
            pagina = this.renderClienteTecnico()
        }


        return pagina;
    }
}
