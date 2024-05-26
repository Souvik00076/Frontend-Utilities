import { FC, useState } from "react";
import Slider from "./components/Slider";



const App: FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [maxValue,] = useState<number>(1000);
  const [minValue,] = useState<number>(0);
  const [, setChMinValue] = useState<number>(minValue);
  const [, setChMaxValue] = useState<number>(maxValue);
  const openModalClickListener = () => {
    setShowModal(previous => (previous ? false : true))
  }
  return <div className="flex h-screen items-center justify-center">
    <div className="relative">
      <button onClick={openModalClickListener} className="
      px-6
      py-2
      rounded-md
      bg-blue-700 
      text-white 
      hover:bg-blue-900">Open Modal</button>
      {
        showModal &&
        <Slider
          maxValue={maxValue}
          minValue={minValue}
          setMaxValue={setChMaxValue}
          setMinValue={setChMinValue}
          onClose={() => { setShowModal(previous => (previous ? false : true)) }}
        />
      }
    </div>
  </div>
}

export default App
