import axios from "axios";
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default class MaterialList extends Component {

    constructor(props) {
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this);
        this.onSearch = this.onSearch.bind(this);

        this.state = { material: [], search: '' };
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

    onSearch(a) {

        this.setState({
            search: a.target.value
        })

        if(a.target.value !== ''){
        axios.get('http://localhost:5000/material/search/' + a.target.value)
            .then(res => {
                console.log(res.data)
                this.setState({
                    material: res.data
                })
            }
            );
        }else{
            axios.get('http://localhost:5000/material/')
            .then(res => {
                this.setState({ material: res.data })
            })
            .catch((err) => {
                console.log(err);
            })
        }


        console.log(this.state.material);
    }

    render() {
        return (
            <div>
                <h3>Ver materiais</h3>

                <div className="search searchFull">
                    <input type="text" value={this.state.search} onChange={this.onSearch} placeholder="Pesquisar..." />
                </div>

                {this.state.material.length > 0 &&
                    <>
                        {this.state.material.map((a) => (
                            <>
                                {a.active &&
                                    <div className="card">
                                        <img src={a.image} class="card-img-top" alt="..." />
                                        <div className="card-body">
                                            <h5>{a.name}</h5>
                                            <p>Marca {a.brand}</p>
                                        </div>
                                    </div>
                                }
                            </>
                        ))}
                    </>
                }

                {this.state.material.length === 0 &&
                    <p className="notFound">
                        Nenhum item encontrado :P
                    </p>
                }


            </div>
        )
    }
}