import Slider from 'react-slick';
import PokemonCard from './PokemonCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/PokemonCarousel.css';

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const limitSlidesToShow = (value,pokemons) => Math.min(value, pokemons);

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
    slidesToShow: limitSlidesToShow(4,pokemons.length),
    slidesToScroll: limitSlidesToShow(4,pokemons.length),
    initialSlide: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: limitSlidesToShow(3,pokemons.length),
          slidesToScroll: limitSlidesToShow(3,pokemons.length),
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: limitSlidesToShow(2,pokemons.length),
          slidesToScroll: limitSlidesToShow(2,pokemons.length),
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