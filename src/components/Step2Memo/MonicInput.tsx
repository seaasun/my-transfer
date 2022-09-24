import { FormElement, Grid, Input } from '@nextui-org/react';
import { memo, useCallback } from 'react';

type IMonicInput = {
  index: number;
  setMonic: (index: number, value: string) => void;
  value: string;
};

const MonicInput = memo(({ index, value, setMonic }: IMonicInput) => {
  const handleChange = useCallback(
    (event: React.ChangeEvent<FormElement>) => {
      setMonic(index, event.target.value);
    },
    [index, setMonic]
  );

  return (
    <Grid xs={6}>
      <Input
        value={value}
        onChange={handleChange}
        aria-label="moni"
        css={{ width: '100%' }}
      />
    </Grid>
  );
});

export default MonicInput;
