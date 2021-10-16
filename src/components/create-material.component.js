import React, { Component } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export default class CreateExercise extends Component {

    constructor(props) {
        super(props);

        this.onChangename = this.onChangename.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeBrand = this.onChangeBrand.bind(this);
        this.onChangeImage = this.onChangeImage.bind(this);
        this.onChangeActive = this.onChangeActive.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            desciption: '',
            brand: '',
            image: '',
            active: false,
            dateInativated: new Date(),
            users: []
        }

    }

    componentDidMount() {
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

    onChangeBrand(e) {
        this.setState({
            brand: e.target.value
        })
    }

    onChangeImage(e) {
        this.setState({
            image: e.target.value
        })
    }

    onChangeActive(e) {
        this.setState({
            active: e.target.value
        })
    }

    onChangeDate(date) {
        this.setState({
            dateInativated: date
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const materiais = {
            name: this.state.name,
            description: this.state.desciption,
            brand: this.state.brand,
            image: this.state.image,
            active: this.state.active,
            dateInativated: this.state.dateInativated
        }

        axios.post('http://localhost:5000/material/add', materiais)
            .then(res => console.log(res.data));

        console.log(materiais);

        window.location = '/';
    }

    render() {
        return (
            <div>
                <h3>Create New Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Nome: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.name}
                            onChange={this.onChangename}
                        />
                    </div>
                    <div className="form-group">
                        <label>Marca: </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.brand}
                            onChange={this.onChangeBrand}>
                            {
                                this.state.users.map(function (user) {
                                    return <option
                                        key={user}
                                        value={user}>{user}
                                    </option>;
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="form-group">
                        <label>Imagem: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.image}
                            onChange={this.onChangeImage}
                        />
                    </div>
                    <div className="form-group">
                        <label>Ativado: </label>
                        <input
                            type="checkbox"
                            className=""
                            value={this.state.image}
                            onChange={this.onChangeImage}
                        />
                    </div>

                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.dateInativated}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}