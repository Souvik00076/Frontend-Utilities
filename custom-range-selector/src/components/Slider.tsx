import { Dispatch, FC, SetStateAction, useEffect, useRef } from "react";


interface SliderProps {
  minValue: number;
  maxValue: number;
  setMinValue: Dispatch<SetStateAction<number>>;
  setMaxValue: Dispatch<SetStateAction<number>>;
  onClose: () => void;
}

const Slider: FC<SliderProps> = ({
  onClose,
  minValue,
  maxValue,
  setMaxValue,
  setMinValue
}) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const progressRef = useRef<HTMLDivElement | null>(null)
  const maxInputRef = useRef<HTMLInputElement | null>(null)
  const minInputRef = useRef<HTMLInputElement | null>(null)
  useEffect(() => {
    const handleClickOutsideListener = (event: MouseEvent) => {
      if (wrapperRef && wrapperRef.current && !wrapperRef.current.contains(event.target as Node))
        onClose()
    }
    document.addEventListener('mouseup', handleClickOutsideListener);
    return () => document.removeEventListener('click', handleClickOutsideListener)
  }, [onClose])
  useEffect(() => {

    if (!minInputRef.current || !maxInputRef.current || !progressRef.current) return;
    const minCurValue: number = Number(minInputRef.current.value)
    const maxCurValue: number = Number(maxInputRef.current.value)
    console.log(minCurValue, maxCurValue)
    progressRef.current.style.left = `${(minCurValue / maxValue) * 100}%`
    progressRef.current.style.right = `${100 - (maxCurValue / maxValue) * 100}%`
  }, [maxInputRef.current?.value, minInputRef.current?.value])
  return <div ref={wrapperRef} className="
    absolute
    left-[100%]
    top-[50px]
    w-[400px]
    h-[200px]
    rounded-md
    px-6
    py-2
    flex-col
    gap-2
    bg-red-100
    wrapper
    flex
    items-center
    justify-center
    ">
    <h1>Hello Souvik</h1>
    <div className="slider">
      <div className='progress' ref={progressRef}></div>
    </div>
    <div className="
      
        relative
        ">
      <input className="
          absolute
          w-full
          h-[5px]
          pointer-events-none
          "
        ref={minInputRef}
        type="range"
        min={minValue}
        max={maxValue}
        onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
          setMinValue(Number(event.target.value));
        }}
      />
      <input className="
          absolute
          top[-5px]
          h-[5px]
          w-full
          pointer-events-none
          "
        ref={maxInputRef}
        type="range"
        min={minValue}
        max={maxValue}
        onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
          setMaxValue(Number(event.target.value))
        }}
      />
    </div>

  </div>
}

export default Slider;
