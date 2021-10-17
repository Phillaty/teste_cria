import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import CreateMaterial from "./create-material.component";
import EditMaterial from "./edit-material.component";

const Materiais = props => (
    <tr>
        <td>{props.list.name}</td>
        <td>{props.list.description}</td>
        <td>{props.list.brand}</td>
        {/* <td>{props.list.image}</td> */}
        <td>{props.list.active ? 'ativado' : 'desativado'}</td>
        <td>{props.list.dateInativated.substring(0, 10)}</td>
        <td>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target={"#aaa"+ props.list._id}>
                Editar
            </button>

            <div class="modal fade" id={"aaa"+ props.list._id} tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
                <div className="fundo"></div>
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <EditMaterial id={props.list._id} />
                        </div>
                    </div>
                </div>
            </div>

            <button type="button" class="btn btn-danger ms-1" onClick={() => { props.deleteMaterial(props.list._id) }}>
                Deletar
            </button>
            
        </td>
    </tr>
)

export default class MaterialList extends Component {

    constructor(props) {
        super(props);

        this.deleteMaterial = this.deleteMaterial.bind(this);

        this.state = { material: [], users: [], brand: '' };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/material/')
            .then(res => {
                this.setState({ material: res.data })
            })
            .catch((err) => {
                console.log(err);
            });

        axios.get('http://localhost:5000/users/')
            .then(res => {
                if (res.data.length > 0) {
                    this.setState({
                        users: res.data.map(user => user.name),
                        brand: res.data[0].name
                    })
                }
            });
    }

    deleteMaterial(id) {
        axios.delete('http://localhost:5000/material/' + id)
            .then(res => console.log(res.data));
        this.setState({
            material: this.state.material.filter(el => el._id !== id)
        })
    }

    exerciseList() {
        return this.state.material.map(res => {
            return <Materiais list={res} deleteMaterial={this.deleteMaterial}  key={res._id} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Materiais</h3>

                <div className="mb-5 groupButton">
                    <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#ModalCadastro">
                        Adicionar material
                    </button>
                </div>

                <div class="modal fade" id="ModalCadastro" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
                    <div className="fundo"></div>
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <CreateMaterial />
                            </div>
                        </div>
                    </div>
                </div>


                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th>Marca</th>
                            <th>Status</th>
                            <th>Data da inativação</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.exerciseList()}
                    </tbody>
                </table>
            </div>
        )
    }
}