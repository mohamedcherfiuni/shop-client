import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';

type Props = {
  text: string;
  onTextChange: (value: string) => void;
  inVacations: 'all' | 'true' | 'false';
  onInVacationsChange: (value: 'all' | 'true' | 'false') => void;
  createdFrom: Dayjs | null;
  onCreatedFromChange: (value: Dayjs | null) => void;
  createdTo: Dayjs | null;
  onCreatedToChange: (value: Dayjs | null) => void;
  onReset: () => void;
};

const ShopSearchBar = ({
  text,
  onTextChange,
  inVacations,
  onInVacationsChange,
  createdFrom,
  onCreatedFromChange,
  createdTo,
  onCreatedToChange,
  onReset,
}: Props) => {
  return (
    <Box
      sx={{
        width: '100%',
        mb: 3,
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <TextField
        label="Rechercher une boutique"
        value={text}
        onChange={(e) => onTextChange(e.target.value)}
        sx={{ minWidth: 220, flex: 1 }}
      />

      <FormControl sx={{ minWidth: 160 }}>
        <InputLabel id="vacations-label">En congé</InputLabel>
        <Select
          labelId="vacations-label"
          label="En congé"
          value={inVacations}
          onChange={(e) => onInVacationsChange(e.target.value as 'all' | 'true' | 'false')}
        >
          <MenuItem value="all">Tous</MenuItem>
          <MenuItem value="true">Oui</MenuItem>
          <MenuItem value="false">Non</MenuItem>
        </Select>
      </FormControl>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Créée après le"
          value={createdFrom}
          onChange={onCreatedFromChange}
          slotProps={{ textField: { sx: { minWidth: 160 } } }}
        />
        <DatePicker
          label="Créée avant le"
          value={createdTo}
          onChange={onCreatedToChange}
          slotProps={{ textField: { sx: { minWidth: 160 } } }}
        />
      </LocalizationProvider>

      <Button variant="outlined" onClick={onReset}>
        Réinitialiser
      </Button>
    </Box>
  );
};

export default ShopSearchBar;
