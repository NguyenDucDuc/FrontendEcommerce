import { InputNumber } from 'antd';
import React, { useState } from 'react';
import { DETECH_THREE_DIGITAL_OF_NUMBER_REGEX } from '../../constants/product';

interface PriceValue {
  currency?: string;
  disabled?: boolean;
  number?: number | string;
}

interface PriceInputProps {
  inputWidth?: string;
  value?: PriceValue;
  onChange?: (value: number) => void;
  disabled?: boolean;
}

const PriceInput: React.FC<PriceInputProps> = ({
  value = {},
  disabled = false,
  inputWidth = '150px',
  onChange,
}) => {
  const [number, setNumber] = useState<number | string>(0);

  const triggerChange = (changedValue: { number?: number | string }) => {
    onChange?.(changedValue.number as number);
  };

  const onNumberChange = (newValue: number | string | null) => {
    if (Number.isNaN(newValue)) {
      return;
    }
    setNumber(newValue as number);
    triggerChange({ number: newValue as number });
  };

  return (
    <InputNumber
      value={value.number || number}
      onChange={onNumberChange}
      style={{ width: '100%' }}
      formatter={(value) =>
        `${value}`.replace(DETECH_THREE_DIGITAL_OF_NUMBER_REGEX, ',')
      }
      parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
      disabled={disabled}
      min={0}
    />
  );
};

export default PriceInput;
