import React from 'react';
import Slider from 'react-slick';
import PokemonCard from './PokemonCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './PokemonCarousel.css';

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="slick-arrow slick-prev custom-arrow" onClick={onClick}>
      <FaArrowLeft />
    </div>
  );
};

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="slick-arrow slick-next custom-arrow" onClick={onClick}>
      <FaArrowRight />
    </div>
  );
};



const PokemonCarousel = ({ pokemons }) => {
  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, 
    slidesToScroll: 4, 
    initialSlide: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </Slider>
    </div>
  );
};

export default PokemonCarousel;