import { FC } from "react";
import Slider from "./components/Slider1";
import { IMAGES } from "./CONSTANT";

const App: FC = () => {
  return <>
    <Slider images={IMAGES} />
  </>
}

export default App
