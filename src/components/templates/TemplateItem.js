import React from 'react';
import DialogContent from '@mui/material/DialogContent';
import { Checkbox, FormControlLabel, Box } from '@mui/material/';
import TemplateHeading from './TemplateHeading';
import TemplateContent from './TemplateContent';

export default function TemplateItem() {
  return (
    <div>
      <Box sx={{ flex: '50%' }}>
        <DialogContent
          sx={{
            backgroundColor: 'rgba(214, 229, 250, 0.6)',
            margin: '1rem',
            borderRadius: '6px',
          }}
        >
          <TemplateHeading />
          <TemplateContent />
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label='Has Image'
          />
        </DialogContent>
      </Box>
    </div>
  );
}
