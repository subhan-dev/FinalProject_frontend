import React, { Component } from 'react'
import axios from '../../config/axios'
import {Typeahead} from 'react-bootstrap-typeahead';

class CekOngkir extends Component {

    state = {
        provinsi: [],
        provinsi_id: '',
        city: [],
        city_id: '',
        courier: '',
        cost: null
    }

    getProvinsi = async () => {
        try {
            const res = await axios.get(`/get-provinsi`)
            // console.log(res.data)
            this.setState({provinsi: res.data.results})
        } catch (error) {
            console.log(error)
        }
    }

    getCity = async () => {
        if(this.state.provinsi_id) {
            try {
                const res = await axios.get(`/get-city/${this.state.provinsi_id}`)
                // console.log(res.data)
                this.setState({city: res.data.results})
            } catch (error) {
                console.log(error)
            }
        } else {
            this.setState({city: []})
        }
    }

    getCost = async () => {
        if(this.state.provinsi_id && this.state.city_id && this.state.courier) {
            try {
                const res = await axios.post(`/get-cost`, null, {
                    params: {
                        origin: `151`,
                        tujuan: this.state.city_id,
                        berat: 1500,
                        courier: this.state.courier
                    }
                })
                console.log(res.data)
                this.setState({cost: res.data.results})
            } catch (error) {
                console.log(error)
            }
        }
        // console.log(this.state.kota)
    }

    componentDidMount() {
        this.getProvinsi()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevState.provinsi_id !== this.state.provinsi_id) {
            this.getCity()
        }
        if(this.state.provinsi_id && this.state.city_id && this.state.courier) {
            if(prevState.provinsi_id !== this.state.provinsi_id || prevState.city_id !== this.state.city_id || prevState.courier !== this.state.courier) {
                this.getCost()
            }
        }
    }

    render() {
        return (
            <div className="row mt-3 mb-5">
                <div className="col-md-3">
                    <Typeahead
                        labelKey="province"
                        options={this.state.provinsi}
                        placeholder="Choose Province"
                        onChange={e => {
                            if(e.length > 0){
                                this.setState({provinsi_id: e[0].province_id})
                            } else {
                                this.setState({provinsi_id: ''})
                            }
                        }}
                    />
                </div>
                <div className="col-md-3">
                    <Typeahead
                        labelKey="city_name"
                        options={this.state.city}
                        placeholder="Choose City"
                        onChange={e => {
                            if(e.length > 0){
                                this.setState({city_id: e[0].city_id})
                            } else {
                                this.setState({city_id: ''})
                            }
                        }}
                    />
                </div>
                <div className="col-md-3">
                    <select id="inputState" className="form-control" onChange={e => this.setState({courier: e.target.value})}>
                        <option value="">Choose Kurir</option>
                        <option value="jne">JNE</option>
                        <option value="pos">POS</option>
                        <option value="tiki">TIKI</option>
                    </select>
                </div>

                {
                    this.state.cost &&
                    <table className="table table-hover mb-5 mt-4 col-9 ml-3">
                        <thead>
                            <tr>
                                <th scope="col">Layanan</th>
                                <th scope="col">Jenis Kiriman</th>
                                <th scope="col">Estimasi Hari</th>
                                <th scope="col">Tarif</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.cost[0].costs.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.description}</td>
                                        <td>Document/Paket</td>
                                        <td>{item.cost[0].etd}</td>
                                        <td>Rp {item.cost[0].value.toLocaleString('IN')}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                }

            </div>
        )
    }
}

export default CekOngkir
