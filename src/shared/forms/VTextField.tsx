import { useEffect, useState } from 'react';

import { useField } from '@unform/core';

import { FormHelperTextProps, Stack, TextField, TextFieldProps, Typography } from '@mui/material';

// Custom helper text component
const HelperText = ({ children }: FormHelperTextProps) => (
  <Stack>
    <Typography fontSize={'15px'} color={'#999999'}>
      {children}
    </Typography>
  </Stack>
);

type TVTextFieldProps = TextFieldProps & {
  // Esse type é composto pelo itens do TextFieldProps e TVTextFieldProps
  name: string;
  textHelperText: string | React.ReactNode;
};

export const VTextField: React.FC<TVTextFieldProps> = ({
  name,
  textHelperText,
  ...rest /* Adiciona o resto das propriedades */
}) => {
  const { fieldName, registerField, defaultValue, error, clearError } = useField(name);
  /*
- fieldName:      Identifica o componente no formulário
- registerField:  Registra e pega o valor no Form
- defaultValue:   Valor padrão
- error:          Ao realizar a validação do dado e se tiver algum erro, é possível setar um erro     
- clearError:     Limpa o erro
*/
  const [value, setValue] = useState(defaultValue || '');

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value,
      setValue: (_, newValue) => setValue(newValue),
    });
  }, [registerField, fieldName, value]);

  return (
    <TextField
      {...rest}
      error={
        !!error /* 1° '!' transforma undefined para boleano com valor true, 2° '!' joga o true para false */
      }
      helperText={error ? error : textHelperText}
      FormHelperTextProps={{ component: HelperText }}
      defaultValue={defaultValue}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        rest.onChange?.(e);
      }}
      onKeyDown={(e) => {
        error && clearError();
        rest.onKeyDown?.(e);
      }}
    />
  );
};
