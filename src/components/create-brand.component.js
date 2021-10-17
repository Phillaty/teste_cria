import React, { Component } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { Link } from "react-router-dom";

const BrandList = props => (
    <tr>
        <td>{props.list.name}</td>
        <td>{props.list.description}</td>
        <td>{console.log(props)}
            <button type="button" class="btn btn-danger ms-1" onClick={() => { props.deleteMarca(props.list._id) }}>
                Deletar
            </button>
        </td>
    </tr>
)

export default class CreateBrand extends Component {

    constructor(props) {
        super(props);

        this.onChangename = this.onChangename.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onSubmitt = this.onSubmitt.bind(this);
        this.deleteMarca = this.deleteMarca.bind(this);

        this.state = {
            name: '',
            desciption: '',
            brands: []
        }

    }

    componentDidMount() {
        axios.get('http://localhost:5000/brand/')
            .then(res => {
                if (res.data.length > 0) {
                    this.setState({
                        brands: res.data
                    })
                }
            });
    }

    onChangename(e) {
        this.setState({
            name: e.target.value
        })
    }

    onChangeDescription(e) {
        this.setState({
            desciption: e.target.value
        })
    }

    onSubmitt(e) {
        e.preventDefault();

        const brand = {
            name: this.state.name,
            description: this.state.desciption
        }

        axios.post('http://localhost:5000/brand/add', brand)
            .then(res => console.log(res.data));

        console.log(brand);

        window.location = "/brand";
    }

    deleteMarca(id) {
        axios.delete('http://localhost:5000/brand/' + id)
            .then(res => console.log(res.data));
        this.setState({
            brands: this.state.brands.filter(el => el._id !== id)
        })
    }

    brandList() {
        return this.state.brands.map(list => {
            return <BrandList list={list} deleteMarca={this.deleteMarca} key={list._id} />;
        })
    }

    render() {
        return (
            <div className="createBrand">
                <h3>Criar marca</h3>
                <div class="duo">
                    <form onSubmit={this.onSubmitt}>
                        <div className="form-group groupClass">
                            <label>Nome: </label>
                            <input type="text"
                                required
                                className="form-control textInput"
                                placeholder="Insira o nome..."
                                value={this.state.name}
                                onChange={this.onChangename}
                            />
                        </div>
                        <div className="form-group groupClass">
                            <label>Description: </label>
                            <input type="text"
                                required
                                className="form-control textInput"
                                placeholder="Insira a descrição..."
                                value={this.state.description}
                                onChange={this.onChangeDescription}
                            />
                        </div>

                        <div className="form-group mt-2 groupButton">
                            <input type="submit" value="Adicionar marca" className="btn" />
                        </div>
                    </form>
                </div>
                <div className="duo">
                    <div className="second">
                        <table className="table table-bordered">
                            <thead className="thead-light">
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.brandList()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}