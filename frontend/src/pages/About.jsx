import { assets } from "assets/assets";
import NewsLetterBox from "components/NewsletterBox";
import Title from "components/Title";
import React from "react";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          src={assets.about_img}
          alt=""
          className="w-full md:max-w-[450px]"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Velora was born out of a passion for innovation and a desire to
            revolutionize the way people shop online. Our journey began with a
            simple idea: to provide a plateform where customers can easily
            discover, explore, and purchase a wide range of productts from the
            comfort of their homes.
          </p>
          <p>
            Since our inception, we've worked tirelessly to create a diverse
            selection of high-quality products that cater to every taste and
            prefrence, From fashion and beauty to electronics and home
            essentials, we offer an extensive collection sourced fro truseted
            brands and supplies
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>At Velora, our mission is to make great style accessible to everyone. We believe shopping should feel good from start to finish, so we focus on bringing you well-made products at honest prices, with a experience that actually makes sense.</p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title text1={'WHY'} text2={'CHHOSE US'} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border py-8 px-10 md:px-16 sm:py-20 flex flex-col gap-5">
          <b>Qality Assurance:</b>
          <p className="text-gray-600">Every product on Velora goes through a thorough review before it reaches you. We work only with trusted suppliers and check each item against strict quality standards so you always get exactly what you paid for.</p>
        </div>
        <div className="border px-10 py-8 md:px-16 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600">We built Velora around one idea: shopping should not be complicated. From browsing to checkout to delivery, every step is designed to save you time and keep things simple, wherever you are.</p>
        </div>
        <div className="border py-8 px-10 md:px-16 sm:py-20 flex flex-col gap-5">
          <b>Exeptional Customer Service:</b>
          <p className="text-gray-600">Our support team is here whenever you need them. Whether it is a question before you buy or a concern after delivery, we respond fast and stay with you until the issue is fully sorted.</p>
        </div>
      </div>

      <NewsLetterBox/>
    </div>
  );
};

export default About;
