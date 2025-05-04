import { forwardRef, ReactElement } from 'react';

import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';

import { ButtonComponent } from '../button-component/ButtonComponent';

type IDialogComponentProps = {
  stateOpenDialog: boolean;
  textoTituloDialog: string;
  textoCorpoDialog: string;
  aoFecharODialog?: () => void;
  grupoBotoes: Array<{
    tituloBotao: string;
    iconeBotao?: string;
    aoClicarNoBotao: () => void;
  }>;
};

const Transition = forwardRef(
  (
    props: TransitionProps & {
      children: ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
  ) => {
    return <Slide direction="up" ref={ref} {...props} />;
  }
);

export const VDialog: React.FC<IDialogComponentProps> = ({
  stateOpenDialog,
  textoTituloDialog,
  textoCorpoDialog,
  aoFecharODialog,
  grupoBotoes,
}) => {
  return (
    <Dialog
      open={stateOpenDialog}
      TransitionComponent={Transition}
      keepMounted
      onClose={aoFecharODialog}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle fontSize={22}>{textoTituloDialog}</DialogTitle>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-slide-description"
          fontSize={18}
          style={{
            whiteSpace: 'pre-wrap',
          }}
        >
          {textoCorpoDialog}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {grupoBotoes.map((botao) => (
          <ButtonComponent
            key={botao.tituloBotao}
            icon={botao.iconeBotao!}
            texto={botao.tituloBotao}
            variant="contained"
            aoClicarNoBotao={botao.aoClicarNoBotao}
          />
        ))}
      </DialogActions>
    </Dialog>
  );
};
