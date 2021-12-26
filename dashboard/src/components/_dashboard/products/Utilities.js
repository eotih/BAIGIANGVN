import React, { useState, useEffect } from 'react';
import {
  CardHeader,
  Grid,
  Card,
  Button,
  Checkbox,
  Typography,
  Divider,
  MenuItem,
  Select,
  Stack,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { useFormik, Form, FormikProvider } from 'formik';
import { GetProductWhereProductDetailNull } from '../../../functions/Management';
import { getAllUtilities } from '../../../functions/Component';

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

export default function Utilities() {
  const [products, setProducts] = useState([]);
  const [products2, setProducts2] = useState([]);
  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  useEffect(() => {
    getAllUtilities().then((res) => {
      setLeft(res);
    });
    GetProductWhereProductDetailNull().then((res) => {
      setProducts(res);
    });
  }, []);
  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };
  const formik = useFormik({
    initialValues: {
      RoleID: '',
      RoleName: ''
    },
    onSubmit: () => {
      console.log(formik.values);
    }
  });
  const { handleSubmit, getFieldProps } = formik;
  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleSelect = (event) => {
    formik.setFieldValue('ProductID', event.target.value);
    setProducts2(event.target.value);
  };
  const customList = (title, items) => (
    <Card>
      <CardHeader
        sx={{ px: 2, py: 1 }}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
            disabled={items.length === 0}
            inputProps={{
              'aria-label': 'all items selected'
            }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List
        sx={{
          width: 200,
          height: 230,
          bgcolor: 'background.paper',
          overflow: 'auto'
        }}
        dense
        component="div"
        role="list"
      >
        {items.map((value) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': labelId
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`List item ${value + 1}`} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );

  return (
    <>
      <Grid container spacing={3} sx={{ mb: 5 }}>
        <Grid item xs={12}>
          <Card sx={{ p: 2 }}>
            <Stack direction={{ xs: 'column' }} spacing={2}>
              <FormikProvider value={formik}>
                <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                  <Typography id="select-label">Product Name</Typography>
                  <Select
                    labelId="select-label"
                    label="Product"
                    variant="outlined"
                    value={products2}
                    onChange={handleSelect}
                    {...getFieldProps('ProductID')}
                  >
                    {products.map((item) => (
                      <MenuItem key={item.ProductID} value={item.ProductID}>
                        {item.Name}
                      </MenuItem>
                    ))}
                  </Select>
                </Form>
              </FormikProvider>
            </Stack>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item>{customList('Choices', left)}</Grid>
        <Grid item>
          <Grid container direction="column" alignItems="center">
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleCheckedRight}
              disabled={leftChecked.length === 0}
              aria-label="move selected right"
            >
              &gt;
            </Button>
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleCheckedLeft}
              disabled={rightChecked.length === 0}
              aria-label="move selected left"
            >
              &lt;
            </Button>
          </Grid>
        </Grid>
        <Grid item>{customList('Chosen', right)}</Grid>
      </Grid>
    </>
  );
}
