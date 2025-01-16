"use client";

import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import SliderCard from "./SliderCard";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1324 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1324, min: 764 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 764, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const Slider = () => {
  return (
    <Carousel
      additionalTransfrom={0}
      arrows={true}
      autoPlay={true}
      autoPlaySpeed={5000}
      centerMode={false}
      infinite
      responsive={responsive}
      itemClass="item"
    >
      <SliderCard
        image="/images/slider7-w.jpg"
        name="Abigail Owusu"
        review="Unifilm College transformed my passion for filmmaking into a professional skill. The hands-on experience with editing and directing gave me the confidence to start my own video production company."
      />
      <SliderCard
        image="/images/slider1.jpg"
        name="Kwame Mensah"
        review="I never imagined I could master tools like Photoshop and Illustrator in such a short time. Unifilm College’s practical approach made it easy to understand and apply what I learned."
      />
      <SliderCard
        image="/images/slider4-w.jpg"
        name="Adjoa Dapaah"
        review="The modules were engaging, and the practical training in radio presenting and TV production helped me land a job at a popular media house in Accra."
      />
      <SliderCard
        image="/images/slider2.jpg"
        name="Daniel Asare"
        review="The sound engineering program at Unifilm College was a game-changer for me. From beat-making to mastering, the lessons were top-notch. Today, I’m producing music for local artists, and my work has even been featured on national platforms."
      />
      <SliderCard
        image="/images/graphic-w.jpg"
        name="Evelyn Sarpong"
        review="The graphic design course helped me understand branding and digital tools. I’ve since worked on projects for businesses in Accra, building their brand identities from scratch."
      />
      <SliderCard
        image="/images/slider5.jpg"
        name="Michael Obeng"
        review="The photography program at Unifilm College taught me not just technical skills but also how to think creatively. Today, I’m a sought-after event photographer."
      />
      <SliderCard
        image="/images/slider8.jpg"
        name="Naomi Darko"
        review="Joining the cosmetology program was the best decision I made. I now run my own beauty salon, offering bridal styling and makeup services that my clients love."
      />
      <SliderCard
        image="/images/slider3.jpg"
        name="Joseph Boateng"
        review="The journalism and media studies course gave me the tools to pursue my dream of becoming a journalist. The hands-on training prepared me for the real world, and I now work with one of Ghana’s leading radio stations."
      />
      <SliderCard
        image="/images/slider9.jpg"
        name="Patricia Amoah"
        review="As someone with no prior knowledge of sound engineering, I was amazed at how quickly I learned to produce and master music. Unifilm College’s instructors were patient and thorough."
      />
      <SliderCard
        image="/images/tv-man.jpg"
        name="Francis Tetteh"
        review="Thanks to the TV and film production program, I’ve been able to work on several short films and music videos. The experience was worth every pesewa!"
      />
    </Carousel>
  );
};

export default Slider;
