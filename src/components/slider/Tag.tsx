import style from "../slider/styles.module.scss";

const Tag = ({ data, tagIndex, setSelectedIndex, selectedIndex }: any) => {

  return (
    <>
      <li
        onClick={() => setSelectedIndex(tagIndex)}
        className={
          selectedIndex === tagIndex
            ? `${style.li} ${style.active}`
            : `${style.li}`
        }
      >
        {data}
      </li>
    </>
  );
};

export default Tag;
