

import { FC } from "react";
interface ISliderProps {
  images: string[];
}
const Slider: FC<ISliderProps> = ({
  images
}) => {
  return (<div className="container">
    <div className="slider-wrapper">
      <div className="image-list">
        {
          images.map((image: string, index: number) => (
            <img src={image} alt="" key={index} className="image-item" />
          )
          )
        }
      </div>
    </div>
    <div className="slider-scrollbar">
      <div className="slider-track">
        <div className="slider-thumb">

        </div>
      </div>
    </div>
  </div>
  )
}

export default Slider;
