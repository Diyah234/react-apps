import React from "react";
import gear from '../../assets/gear.png';
import light from '../../assets/light.png';

const Card = () => {
  return (
    <div className="grid lg:grid-cols-2 grid-row-2 items-center justify-between mt-20 bg-[#dad9d2] rounded-lg w-11/12 lg:w-7/12 mx-auto h-[40.5rem] lg:h-[19rem] bg-cover bg-[position:center_left] bg-no-repeat" 
    style={{ backgroundImage: `url(${light})` }}>
      <div className="pt-6 pl-10">
        <h2 className="text-3xl font-bold w-[20rem] lg:w-[27rem]">Ready to Streamline <br/>Your Subscription Revenue?</h2>
        <p className="pt-6 text-base/8 font-semibold w-[20rem] lg:w-[27rem]">
          Take control of your recurring revenue, eliminate billing errors, and
          gain valuable insights with Recon.
        </p>
        <button className="text-[#FAFAFA] bg-[#57479E] mt-6 p-3 px-8 rounded-lg mb-6">Start Your Free Trial</button>
      </div>
      <div className="w-[40rem]">
        <img src={gear} alt=""className="w-[120rem] h-[20.5rem] relative right-30 top-[-25px]" />
      </div>
    </div>
  );
};

export default Card;
