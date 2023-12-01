/* eslint-disable react-hooks/exhaustive-deps */
// @mui
import { alpha } from '@mui/material/styles';
import { RadioGroup } from '@mui/material';
import PropTypes from 'prop-types'
import { useSnackbar } from 'notistack';
//
import { useEffect } from 'react';
import { useSettingsContext } from '../SettingsContext';
import { StyledCard, StyledWrap, MaskControl, StyledCircleColor } from '../styles';
import api from '../../../utils/axios'
import { useAuthContext } from '../../../auth/useAuthContext'

const templates = [
  {
    name: 'black',
    main: '#191919',
    value: '#191919',
  },
  // white
  {
    name: 'white',
    main: '#FFFFFF',
    value: '#FFFFFF',
  },
]
// ----------------------------------------------------------------------

ColorPresetsOptions.propTypes = {
  setIsUpdatingColor: PropTypes.func,
  themeSelected: PropTypes.object
}

export default function ColorPresetsOptions({ setIsUpdatingColor, themeSelected }) {
  console.log('themeSelected', themeSelected)
  const { themeColorPresets, onChangeColorPresets, presetsOption } = useSettingsContext();
  const { updateWorkspaces } = useAuthContext()
  const { enqueueSnackbar } = useSnackbar();
  const handleOnChangeColorPresets = async (e) => {
    const payload ={
      theme: {
        isTemplate: true,
        templateId: e?.target?.value || 'black'
      },
      // themeColor: e.target.value
    }

    try {
      setIsUpdatingColor(true)
      const response = await api.put('v1/business/theme', payload)
      
      const { workspaceSession } = response.data
      updateWorkspaces(workspaceSession)
      // onChangeColorPresets(e)
      enqueueSnackbar('Cor alterada!');
      // isOpen(false)
    } catch (error) {
      const message = typeof error === 'string' ? error : error.message
      enqueueSnackbar(message, { variant: 'error' });
      console.error(error);
    }
    setIsUpdatingColor(false)

  }

  
  // useEffect(() => {
  // },[themeColorPresets])

  return (
    <RadioGroup name="themeColorPresets" value={themeColorPresets} onChange={handleOnChangeColorPresets}>
      <StyledWrap sx={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {templates.map((color) => {
          const { name, value } = color;
console.log('color', { name, value })
const selected = themeSelected?.theme?.templateId === name;
console.log('selected', selected)

          return (
            <StyledCard
              key={name}
              selected={selected}
              sx={{
                height: 48,
                ...(selected && {
                  bgcolor: alpha(value, 0.08),
                  borderColor: alpha(value, 0.24),
                }),
              }}
            >
              <StyledCircleColor selected={selected} color={value} />

              <MaskControl value={name} />
            </StyledCard>
          );
        })}
      </StyledWrap>
    </RadioGroup>
  );
}
