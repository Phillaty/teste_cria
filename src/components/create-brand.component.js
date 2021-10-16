import React, { Component } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export default class CreateBrand extends Component {

    constructor(props) {
        super(props);

        this.onChangename = this.onChangename.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onSubmitt = this.onSubmitt.bind(this);

        this.state = {
            name: '',
            desciption: ''
        }

    }

    componentDidMount() {
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
    }

    render() {
        return (
            <div>
                <h3>Create New Exercise Log</h3>
                <form onSubmit={this.onSubmitt}>
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
                        <label>Description: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                        />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}