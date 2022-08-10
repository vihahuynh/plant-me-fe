import React, { useState, useEffect } from 'react';

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./imageCarousel.module.scss";

const ImageCarousel = ({ images }) => {
    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);
    const [slider1, setSlider1] = useState(null);
    const [slider2, setSlider2] = useState(null);

    useEffect(() => {
        setNav1(slider1);
        setNav2(slider2);
    }, [slider1, slider2]);


    const settingsMain = {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        asNavFor: '.slider-nav'
    };

    const settingsThumbs = {
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.slider-for',
        centerMode: true,
        swipeToSlide: true,
        focusOnSelect: true,
        centerPadding: '1rem',
        vertical: true,
        arrows: false
    };

    return (
        <div className={styles.container}>
            <div className={styles["thumbnail-slider-wrap"]}>
                <Slider
                    {...settingsThumbs}
                    asNavFor={nav1}
                    ref={slider => (setSlider2(slider))}>

                    {images.map((img) =>

                        <div className={styles["slick-slide"]} key={img.id}>
                            <img className={styles["slick-slide-image"]} src={img.imageUrl} alt="plant" />
                        </div>

                    )}

                </Slider>
            </div>
            <div className={styles["slider-wrapper"]}>
                <Slider
                    {...settingsMain}
                    asNavFor={nav2}
                    ref={slider => (setSlider1(slider))}
                >

                    {images.map((img) =>

                        <div className={styles["slick-img"]} key={img.id}>
                            <img className={styles["slick-slide-image"]} src={img.imageUrl} alt="plant" />
                        </div>

                    )}

                </Slider>
            </div>

        </div>
    );
}

export default ImageCarousel