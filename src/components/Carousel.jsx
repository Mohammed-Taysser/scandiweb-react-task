import React, { Component } from 'react';
import arrowRight from '../assets/images/icons/arrow/arrow-right.svg';
import arrowLeft from '../assets/images/icons/arrow/arrow-left.svg';

class Carousel extends Component {
	state = {
		current: 1,
	};
	sliders = () => {
		return (
			<>
				{this.props.gallery.map((image, index) => (
					<div
						className={`single-slide ${
							this.state.current === index + 1 ? 'active' : ''
						}`}
						key={index}
					>
						<img src={image} alt='item-slide' />
					</div>
				))}
			</>
		);
	};
	controller = () => {
		return this.props.gallery.length > 1 ? (
			<div className='carousel-controller'>
				<div className='arrow-left' onClick={this.prevSlide}>
					<img src={arrowLeft} alt='arrow-left' />
				</div>
				<div className='arrow-right' onClick={this.nextSlide}>
					<img src={arrowRight} alt='arrow-right' />
				</div>
			</div>
		) : (
			<></>
		);
	};

	nextSlide = () => {
		if (this.state.current !== this.props.gallery.length) {
			this.setState((st) => ({ current: st.current + 1 }));
		} else if (this.state.current === this.props.gallery.length) {
			this.setState({ current: 1 });
		}
	};

	prevSlide = () => {
		if (this.state.current !== 1) {
			this.setState((st) => ({ current: st.current - 1 }));
		} else if (this.state.current === 1) {
			this.setState({ current: this.props.gallery.length });
		}
	};

	render() {
		return (
			<div className='carousel-wrapper'>
				<div className='carousel-sliders'>
					<this.sliders />
				</div>
				{this.props.withSlider&&<this.controller />}
			</div>
		);
	}
}

export default Carousel;
