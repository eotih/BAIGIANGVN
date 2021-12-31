/* eslint-disable no-restricted-globals */
import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import PropTypes from 'prop-types';
import editFill from '@iconify/icons-eva/edit-fill';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// material
// ----------------------------------------------------------------------
TrashbinNewsMoreMenu.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onRestore: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

export default function TrashbinNewsMoreMenu({ data, onDelete, dispatch, onRestore }) {
  const { _id } = data;
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this news?')) {
      await dispatch(onDelete(dispatch, id));
    }
  };
  const handleRestore = async (id) => {
    if (confirm('Are you sure you want to restore this news?')) {
      await dispatch(onRestore(dispatch, id));
    }
  };

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>
      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={() => handleDelete(_id)} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem onClick={() => handleRestore(_id)} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={editFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Restore" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}
