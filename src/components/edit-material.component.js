import React, { Component } from 'react';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";

export default class EditMaterial extends Component {
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
            isActivate: false,
            dateInativatedSave: new Date(),
            brandItem: [],
        }

    }

    componentDidMount() {
        axios.get('http://localhost:5000/material/' + this.props.id)
            .then(response => {
                this.setState({
                    name: response.data.name,
                    description: response.data.description,
                    brand: response.data.brand,
                    image: response.data.image,
                    active: response.data.active,
                    isActivate: response.data.active,
                    dateInativated: new Date(response.data.dateInativated)
                })
            })
            .catch(function (error) {
                console.log(error);
            })

        axios.get('http://localhost:5000/brand/')
            .then(res => {
                if (res.data.length > 0) {
                    this.setState({
                        brandItem: res.data.map(user => user.name),
                        brand: this.state.brand === '' ? res.data[0].name : this.state.brand
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
            description: e.target.value
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
            active: e.target.checked
        })
    }

    onChangeDate(date) {
        this.setState({
            dateInativated: date
        })
    }

    onSubmit(e) {
        e.preventDefault();

        var materiais = {
            name: this.state.name,
            description: this.state.description,
            brand: this.state.brand,
            image: this.state.image,
            active: this.state.active,
            dateInativated: (!this.state.active && this.state.isActivate) ? this.state.dateInativated : this.state.dateInativatedSave
        }

        axios.post('http://localhost:5000/material/update/' + this.props.id, materiais)
            .then(res => console.log(res.data));

        window.location = '/materiais';
    }

    render() {
        return (
            <div>
                <h3>Editar material</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Nome: </label>
                        <input type="text"
                            required
                            className="form-control textInput"
                            value={this.state.name}
                            onChange={this.onChangename}
                        />
                    </div>
                    <div className="form-group">
                        <label>Marca: </label>
                        <select ref="userInput"
                            required
                            className="form-control textInput"
                            value={this.state.brand}
                            onChange={this.onChangeBrand}>
                            {
                                this.state.brandItem.map(function (b) {
                                    return <option
                                        key={b}
                                        value={b}>{b}
                                    </option>;
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Descri????o: </label>
                        <input type="text"
                            required
                            className="form-control textInput"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="form-group">
                        <label>Imagem: </label>
                        <input
                            type="text"
                            className="form-control textInput"
                            value={this.state.image}
                            onChange={this.onChangeImage}
                        />
                    </div>

                    <div class="form-check form-switch">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            role="switch"
                            checked={this.state.active}
                            onChange={this.onChangeActive} />
                        <label class="form-check-label" for="flexSwitchCheckDefault">Ativar?</label>
                    </div>

                    <div className="form-group mt-2 groupButton">
                        <input type="submit" value="Editar Material" className="btn" />
                    </div>
                </form>
            </div>
        )
    }
}