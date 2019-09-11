import React from 'react';
import styles from './index.module.scss';

interface Props {
  label: string;
  value: string | number;
  name: string;
  placeholder?: string;
  type?: string;
  onChange?(event: React.ChangeEvent<HTMLInputElement>, name: string): void;
  onClose?(name: string): void;
}

const Input: React.FC<Props> = ({
  label,
  value,
  name,
  placeholder = '',
  type = 'text',
  onChange: onInputChange,
  onClose: onClickClose
}) => {
  return (
    <div className={styles.input}>
      <label className={styles.label}>
        <span className={styles.text}>{label}</span>
        <input
          className={styles.input}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={e => {
            if (onInputChange) {
              onInputChange(e, name);
            }
          }}
        />
        {value && onClickClose ? (
          <i
            className={styles.close}
            onClick={() => {
              onClickClose(name);
            }}
          ></i>
        ) : (
          ''
        )}
      </label>
    </div>
  );
};

export default Input;
