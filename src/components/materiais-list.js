import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Exercise = props => (
    <tr>
        <td>{props.exercise.name}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0, 10)}</td>
        <td>
            <Link to={"/edit/" + props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
        </td>
    </tr>
)

export default class MaterialList extends Component {

    constructor(props) {
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this);

        this.state = { material: [] };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/material/')
            .then(res => {
                this.setState({ material: res.data })
            })
            .catch((err) => {
                console.log(err);
            })
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
                <h3>Ver materiais</h3>
                
                {this.state.material.map((a) => (
                    // return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id} />;
                    <>
                        <div className="card">
                            <div className="card-body">
                                <h5>{a.name}</h5>
                                <p>{a.description}</p>
                                <p>Marca {a.brand}</p>
                            </div>
                        </div>
                    </>
                ))}


            </div>
        )
    }
}