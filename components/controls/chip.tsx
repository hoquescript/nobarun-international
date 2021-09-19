import React, { useRef, useState } from 'react';
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';
import styles from './chipfield.module.scss';

interface ChipProps {
  chips: string[];
  setChips: any;
}
const Chip = (props: ChipProps) => {
  const { chips, setChips } = props;
  const ref = useRef<HTMLInputElement>(null);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (ref.current && ref.current.value) {
      setChips(chips.concat(ref.current.value));
      ref.current.value = '';
    }
  };
  return (
    <div className={styles.chip__wrapper}>
      <form
        onSubmit={onSubmitHandler}
        className={`field ${styles.chip}`}
        style={{ position: 'relative' }}
      >
        <div className="chips" style={{ flexWrap: 'wrap' }}>
          <input
            type="text"
            className={`${styles.chip__input} mr-20 mb-20`}
            placeholder="Search"
            ref={ref}
          />
          {chips.map((chip) => (
            <div className="chip" key={chip}>
              <span className="chip__title">{chip}</span>
              <button type="button" className="chip__remove">
                <AiOutlineClose />
              </button>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
};

export default Chip;
