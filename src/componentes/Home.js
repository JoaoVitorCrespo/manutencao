import React, { Component } from 'react'


export default class Home extends Component {


    render() {

        return(

            <div>
                Bem vindo, {this.props.nome}
            </div>

        )

    }
}
