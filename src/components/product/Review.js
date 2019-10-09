import React, { Component } from 'react'
import Rating from 'react-rating'
import axios from '../../config/axios';

class Review extends Component {
    state = {
        rating: 0,
        comment: '',
        review: []
    }

    getReview = async() => {
        try {
            const res = await axios.get(`/get-review/${this.props.idProduct}`)
            // console.log(res.data)
            this.setState({review: res.data})
        } catch (error) {
            console.log(error)
        }
    }
    componentDidMount() {
        this.getReview()
    }
    onSubmit = async () => {
        const {rating, comment} = this.state
        if(rating > 0 && comment && this.props.idUser) {
            try {
                const res = await axios.post('/review', {
                    product_id: this.props.idProduct,
                    user_id: this.props.idUser,
                    rating: rating,
                    comment: comment
                })
                // console.log(res.data)
                this.setState({
                    rating: 0,
                    comment: ''
                })
                this.getReview()
            } catch (error) {
                console.log(error)
            }
        }
        
    }
    renderReview = () => {
        return this.state.review.map((item, i) => {
            return (
                <div className="card" key={i}>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-2">
                                <img src={`http://localhost:2019/users/avatar/${item.avatar}`} className="img img-rounded img-fluid"/>    
                            </div>
                            <div className="col-md-10">
                                <p>
                                    <span class="float-left"><strong>{item.fullname}</strong></span>
                                    <span class="float-right">
                                        <Rating 
                                            emptySymbol="fa fa-star-o fa-md"
                                            fullSymbol="fa fa-star fa-md"
                                            readonly
                                            initialRating={item.rating}
                                        />
                                    </span>
                                </p>
                                <div className="clearfix"></div>
                                <p>{item.comment}</p>
                                <p className="float-right grey-text " style={{fontSize: '12px'}}>15 Minutes Ago</p>
                            </div>
                        </div>

                    </div>
                </div>
            )
        })
    }
    render() {
        // console.log(this.state.comment)
        return (
            <div className="row mt-3">
                <div className="col-md-6">
                    <p>REVIEW</p>
                    {this.renderReview()}
                </div>
                <div className="col-md-6">
                    <p>BE THE FIRST TO REVIEW THIS PRODUCT</p>
                    <p>Your Rating: <Rating 
                        emptySymbol="fa fa-star-o fa-md"
                        fullSymbol="fa fa-star fa-md"
                        initialRating={this.state.rating}
                        onChange={(rate) => this.setState({rating: rate})}
                    /></p>
                    <div className="form-group ">
                        <label for="exampleFormControlTextarea1">Your Review</label>
                        <textarea className="form-control rounded-0" id="exampleFormControlTextarea1" rows="9" value={this.state.comment} onChange={e => this.setState({comment: e.target.value})}></textarea>
                    </div>
                    <button type="button" className="btn btn-dark btn-sm mt-2" onClick={this.onSubmit}>SUBMIT</button>
                </div>
            </div>
        )
    }
}

export default Review
