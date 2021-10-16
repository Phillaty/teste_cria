import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import CreateMaterial from "./create-material.component";

const Exercise = props => (
    <tr>
        <td>{props.exercise.name}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.brand}</td>
        <td>{props.exercise.image}</td>
        <td>{props.exercise.active ? 'ativado' : 'desativado'}</td>
        <td>{props.exercise.dateInativated.substring(0, 10)}</td>
        <td>
            <Link to={"/edit/" + props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
        </td>
    </tr>
)

export default class MaterialList extends Component {

    constructor(props) {
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this);

        this.state = { material: [], users: [], brand : '' };
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

    deleteExercise(id) {
        axios.delete('http://localhost:5000/material/' + id)
            .then(res => console.log(res.data));
        this.setState({
            material: this.state.material.filter(el => el._id !== id)
        })
    }

    exerciseList() {
        return this.state.material.map(currentexercise => {
            return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Logged Exercises</h3>

                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#ModalCadastro">
                    Launch demo modal
                </button>

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
                            <th>Name</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
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