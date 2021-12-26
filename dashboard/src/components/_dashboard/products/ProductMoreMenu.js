/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from 'react';
import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import editFill from '@iconify/icons-eva/edit-fill';
import { Link as RouterLink } from 'react-router-dom';
import trash from '@iconify/icons-eva/trash-2-outline';
import staroutline from '@iconify/icons-eva/star-outline';
// import { useFormik, Form, FormikProvider } from 'formik';
// import InputAdornment from '@mui/material/InputAdornment';
import external from '@iconify/icons-eva/external-link-fill';
import pluscirclefill from '@iconify/icons-eva/plus-circle-fill';
import morehorizontalfill from '@iconify/icons-eva/more-horizontal-fill';
// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText
  //   Modal,
  //   Button,
  //   Typography,
  //   Box,
  //   TextField,
  //   Stack
} from '@mui/material';
import axios from '../../../functions/Axios';
// ----------------------------------------------------------------------

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4
};

export default function ProductMoreMenu(Product) {
  const { Slug, Name, ProductID } = Product.Product;
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleDelete = () => {
    if (confirm('Are you sure you want to delete')) {
      axios.delete(`Management/DeleteProduct?ProductID=${ProductID}`).then((res) => {
        if (res.data.Status === 'Deleted') {
          axios
            .delete(`Management/DeleteImageWhereProductName?ProductName=${Name}`)
            .then((response) => {
              if (response.data.Status === 'Deleted') {
                alert('Product Deleted');
                window.location.reload();
              }
            });
        } else {
          alert('Product not deleted');
        }
      });
    }
  };
  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={morehorizontalfill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <MenuItem onClick={handleOpen} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={pluscirclefill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Stock" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <MenuItem
          component={RouterLink}
          to={`../products/detail/${Name}`}
          onClick={handleOpen}
          sx={{ color: 'text.secondary' }}
        >
          <ListItemIcon>
            <Icon icon={external} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Details" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <MenuItem to={`edit/${Slug}`} component={RouterLink} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={editFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <MenuItem to={`review/${Slug}`} component={RouterLink} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={staroutline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Review" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={trash} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}
