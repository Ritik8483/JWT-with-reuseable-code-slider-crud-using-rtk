import data from "./fruits.json";
import Tag from "./Tag";
import { useState, useRef } from "react";
import gsap from "gsap";
import style from '../slider/styles.module.scss';
import { FaArrowRight,FaArrowLeft } from "react-icons/fa";


export default function App() {
  let scrl = useRef<HTMLUListElement>(null);
  const [scrollX, setscrollX] = useState(0);
  const [scrolEnd, setscrolEnd] = useState(false);
  const [selectedIndex,setSelectedIndex]=useState(0);

  //Slide click
  const slide = (shift: any) => {
    if (scrl.current) {
      scrl.current.scrollLeft += shift;
      setscrollX(scrollX + shift);

      if (
        Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
        scrl.current.offsetWidth
      ) {
        setscrolEnd(true);
      } else {
        setscrolEnd(false);
      }
    }
  };

  // Anim
  // const anim = (e: any) => {
  //   gsap.from(e.target, { scale: 1 });
  //   gsap.to(e.target, { scale: 1.5 });
  // };
  // const anim2 = (e: any) => {
  //   gsap.from(e.target, { scale: 1.5 });
  //   gsap.to(e.target, { scale: 1 });
  // };

  const scrollCheck = () => {
    if (scrl.current) {
      setscrollX(scrl?.current?.scrollLeft);
      if (
        Math.floor(scrl?.current?.scrollWidth - scrl?.current?.scrollLeft) <=
        scrl?.current?.offsetWidth
      ) {
        setscrolEnd(true);
      } else {
        setscrolEnd(false);
      }
    }
  };  

  return (
    <div className={style.sliderBox}>
      {scrollX !== 0 && (
        <button
          className={`prev ${style.button}`}
          onClick={() => slide(-150)}
          // onMouseEnter={(e) => anim(e)}
          // onMouseLeave={(e) => anim2(e)}
        >
          <i><FaArrowLeft/></i>
        </button>
      )}
      <ul className={style.ul} ref={scrl} onScroll={scrollCheck}>
        {data.fruits.map((d: any, i: any) => (
          <Tag data={d} key={i} tagIndex={i} setSelectedIndex={setSelectedIndex} selectedIndex={selectedIndex} />
        ))}
      </ul>
      {!scrolEnd && (
        <button
          className={`next ${style.button}`}
          onClick={() => slide(+150)}
          // onMouseEnter={(e) => anim(e)}
          // onMouseLeave={(e) => anim2(e)}
        >
          <i><FaArrowRight/></i>
        </button>
      )}
    </div>
  );
}
