import { Button, ButtonProps, Icon, Typography } from '@mui/material';

type IButtonComponentProps = ButtonProps & {
  icon: string;
  texto: string;
  variant?: 'text' | 'outlined' | 'contained' | undefined;
  aoClicarNoBotao?: () => void;
};

export const ButtonComponent: React.FC<IButtonComponentProps> = ({
  texto,
  variant = 'outlined',
  icon,
  aoClicarNoBotao,
  ...rest /* Adiciona o resto das propriedades */
}) => {
  return (
    <Button
      {...rest}
      color="primary"
      disableElevation
      variant={variant}
      onClick={aoClicarNoBotao}
      startIcon={icon && <Icon>{icon}</Icon>}
    >
      <Typography
        variant="button" //Typography aplica diversas estilizações e acaba removendo, dai isso adiciona a estilização do botão
        whiteSpace="nowrap" //Não quebra a linha do texto
        textOverflow="ellipsis" //Coloca '...' no fim
        overflow="hidden" //Impede que apareça uma barra de scroll
      >
        {texto}
      </Typography>
    </Button>
  );
};
