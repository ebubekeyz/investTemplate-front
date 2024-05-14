import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { list } from '../utils/index';
import Slider from 'react-slick';
import { FaQuoteRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Hero2 = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    fade: true,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: false,
  };
  return (
    <div className="">
      <Slider {...settings}>
        {list.map((person) => {
          const { id, name, title, image, quote, link, color } = person;
          return (
            <article key={id} className={color}>
              <div className="grid md:grid-cols-2 gap-5 align-element place-items-center pt-8">
                <div className="hidden md:grid">
                  {' '}
                  <img src={image} alt={name} className="w-80" />
                </div>
                <div className="animate-pulse md:animate-bounce text-center md:text-left my-32 md:my-0">
                  <h1 className="text-4xl font-bold tracking-wide">{title}</h1>
                  <p className="leading-loose text-xl">{quote}</p>
                  <Link
                    to={link}
                    className="btn border-primary btn-md border-none"
                  >
                    {name}
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </Slider>
    </div>
  );
};
export default Hero2;
