import { RootState, useAppSelector } from '../../redux/type';

import { ProfFormTypes } from './types';

import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';

export default function ProfFormControl({
  register,
  errors,
  selectedGroup,
  handleGroupChange,
  selectedProfession,
  handleProfessionChange,
}: ProfFormTypes) {
  const groups = useAppSelector((state: RootState) => state.employeesSlice.group);
  const professions = useAppSelector((state: RootState) => state.employeesSlice.profession);

  return (
    <>
      <FormControl error={Boolean(errors.groupTitle)} sx={{ flexGrow: 1 }}>
        <InputLabel id="group-label">Отдел</InputLabel>
        <Select {...register('groupTitle', { required: true })} label="Отдел" value={selectedGroup} onChange={handleGroupChange}>
          {groups.map((group) => (
            <MenuItem value={group.title} key={group.id}>
              {group.title}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{errors.groupTitle?.message}</FormHelperText>
      </FormControl>
      <FormControl error={Boolean(errors.profession)} sx={{ flexGrow: 1 }}>
        <InputLabel id="profession-label">Должность</InputLabel>
        <Select
          {...register('profession', { required: true })}
          label="Должность"
          value={selectedProfession}
          onChange={handleProfessionChange}
        >
          {professions.map((profession) => (
            <MenuItem value={profession.position} key={profession.id}>
              {profession.position}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{errors.profession?.message}</FormHelperText>
      </FormControl>
    </>
  );
}
