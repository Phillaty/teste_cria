import React, { Component } from "react";
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
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            desciption: '',
            brand: '',
            image: '',
            active: false,
            dateInativated: new Date(),
            brandItem: []
        }

    }

    componentDidMount() {
        axios.get('http://localhost:5000/brand/')
            .then(res => {
                if (res.data.length > 0) {
                    this.setState({
                        brandItem: res.data.map(user => user.name),
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

        window.location = '/materiais';
    }

    render() {
        return (
            <div>
                <h3>Adicionar material</h3>
                <form onSubmit={this.onSubmit} className="createMaterial">
                    <div className="form-group">
                        <label>Nome: </label>
                        <input type="text"
                            required
                            className="form-control textInput"
                            value={this.state.name}
                            onChange={this.onChangename}
                            placeholder="Insira o nome do material..."
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
                        <label>Description: </label>
                        <input type="text"
                            required
                            className="form-control textInput"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                            placeholder="Insira descrição..."
                        />
                    </div>
                    <div className="form-group">
                        <label>Imagem: </label>
                        <input
                            type="text"
                            className="form-control textInput"
                            placeholder="Link da imagem..."
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
                        <input type="submit" value="Adicionar" className="btn" />
                    </div>
                </form>
            </div>
        )
    }
}