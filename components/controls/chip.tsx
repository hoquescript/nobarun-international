import React, { useRef } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import styles from '../../styles/pages/products.module.scss';

interface ChipProps {
  chips: string[];
  setChips: any;
}
const Chip = (props: ChipProps) => {
  const { chips, setChips } = props;
  const ref = useRef<HTMLInputElement>(null);

  const chipRemoveHandler = (idx) => {
    const newChips = [...chips];
    newChips.splice(idx, 1);
    setChips(newChips);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (ref.current && ref.current.value) {
      const values = ref.current.value.split(',').map((value) => value.trim());
      setChips(chips.concat(values));
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
            placeholder="Paste Your Tags"
            ref={ref}
          />
          {chips.map((chip, idx) => (
            <div className="chip" key={chip}>
              <span className="chip__title">{chip}</span>
              <button
                type="button"
                className="chip__remove"
                onClick={() => chipRemoveHandler(idx)}
              >
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
