import { Scope } from '@unform/core';

import { Grid, InputAdornment, Typography } from '@mui/material';

import { VTextField } from '.';

interface IVGrid {
  pathScope: string;
  tituloItem: string;
  grupoItens: Array<{
    labelTextField: string;
    valueTextField: string;
    textHelperText: string;
    nameTextField: string;
    gridItem: number;
    labelSuffix?: string;
  }>;
}

export const VGrid: React.FC<IVGrid> = ({ tituloItem = '', grupoItens, pathScope = '' }) => {
  return (
    <>
      <Grid container direction="column" padding={2}>
        <Grid item>
          <Typography variant="h6" paddingBottom={2}>
            {tituloItem}
          </Typography>
        </Grid>
        <Grid container item direction="row" spacing={2}>
          {grupoItens.map((grupoItem) => (
            <Scope key={grupoItem.nameTextField} path={pathScope}>
              <Grid key={grupoItem.nameTextField} item xs={grupoItem.gridItem}>
                <VTextField
                  label={grupoItem.labelTextField}
                  defaultValue={grupoItem.valueTextField}
                  variant="outlined"
                  name={grupoItem.nameTextField}
                  textHelperText={grupoItem.textHelperText}
                  fullWidth
                  InputProps={{
                    endAdornment: <InputAdornment position="end">{grupoItem.labelSuffix}</InputAdornment>,
                  }}
                />
              </Grid>
            </Scope>
          ))}
        </Grid>
      </Grid>
    </>
  );
};
