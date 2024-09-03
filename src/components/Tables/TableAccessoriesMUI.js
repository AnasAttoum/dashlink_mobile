import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import { visuallyHidden } from '@mui/utils';
import { useSelector } from 'react-redux'
import Slider from '../Slider';
import { Link } from 'react-router-dom';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import styles from '../../styles/tableAccessories.module.css'
import { Mode } from '../../store/Context';

function createData(id, image, name, device, price) {
  return {
    id,
    image,
    name,
    device,
    price,
  };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'image',
    numeric: false,
    disablePadding: true,
    label: 'Image',
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'device',
    numeric: false,
    disablePadding: false,
    label: 'Device',
  },
  {
    id: 'price',
    numeric: true,
    disablePadding: false,
    label: 'Price (€)',
  },
  {
    id: 'edit',
    numeric: true,
    disablePadding: true,
    label: '',
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            className={props.mode==='dark'?'tableRow':''}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function TableAccessoriesMUI() {
  const accessories = useSelector(state => state.Accessories)
  const devices = useSelector(state => state.Devices)
  const [currentVal, setCurrentVal] = React.useState('');
  const [selected, setSelected] = React.useState([]);

  let rows = React.useMemo(() => {
    setSelected([])
    if (currentVal === '')
      return accessories.map((accessory, index) => {
        return createData(index, accessory.image, accessory.name, accessory.device, accessory.price)
      })
    else
      return accessories.filter(accessory => {
        return accessory.device.includes(currentVal)
      }).map((accessory, index) => {
        return createData(index, accessory.image, accessory.name, accessory.device, accessory.price)
      })
  }, [accessories, currentVal])


  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [open, setOpen] = React.useState(false);

  const { mode } = React.useContext(Mode)


  function EnhancedTableToolbar(props) {
    const { selected } = props;

    const del = () => {
      setOpen(true)
    }

    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(selected.length > 0 && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
          }),
        }}
      >
        {selected.length > 0 ? (
          <Typography
          sx={mode==='dark'?{ flex: '1 1 100%',color:'white' }:{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {selected.length} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: '1 1 100%', color: 'var(--primary)', textAlign: 'center' }}
            variant="h5"
            id="tableTitle"
            component="div"
          >
            Our Accessories
          </Typography>
        )}

        {selected.length > 0 ? (
          <Tooltip title="Delete" onClick={del}>
            <IconButton>
              <DeleteIcon sx={{ color: '#d20000' }} />
            </IconButton>
          </Tooltip>
        ) : (
          <>

          </>
        )}
      </Toolbar>
    );
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage, rows],
  );

  return (
    <>
      <Box sx={{ width: '100%',minHeight:'60vh' }}>
        <Paper sx={mode==='dark'?
          { width: '100%', mb: 2, borderRadius: '15px', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px  ',backgroundColor:'#444' }
          :{ width: '100%', mb: 2, borderRadius: '15px', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px  ',backgroundColor:'#fff' }}>
          <EnhancedTableToolbar selected={selected} setSelected={setSelected} />

          <div className='flex justify-center'>
            <FormControl sx={{ m: 1, margin: '25px', width: '20vw' }} className={styles.filter}>
              <InputLabel id="demo-select-small-label"
                sx={{
                  color: 'var(--primary)',
                  '&.Mui-focused': {
                    color: 'var(--primary)',
                  }
                }}
              >Device</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={currentVal}
                onChange={(e) => {
                  setCurrentVal(e.target.value)
                }}
                label="Device"
                sx={{
                  '& .MuiSelect-select': {
                    color: 'black',
                  },
                  "& .MuiSvgIcon-root": {
                    color: "var(--primary)",
                  },
                  color: "white",
                  '.MuiOutlinedInput-notchedOutline': {
                    borderColor: '#555',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    color: 'var(--primary)',
                    borderColor: 'var(--primary)',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#999',
                  },

                }}
              >
                <MenuItem value="">
                  <em>All</em>
                </MenuItem>
                {devices.map((device, index) => {
                  return <MenuItem key={index} value={device.name}>{device.name}</MenuItem>
                })}
              </Select>
            </FormControl>
          </div>

          {rows.length === 0 ?
            <div className='flex flex-col justify-center items-center gap-5' style={{minHeight:'50vh'}}>
              <div className='p-3 text-center' style={{color:'var(--primary)'}}>No accessories for this device yet</div>
              <img src="/Images/Empty.jpg" alt="Empty" style={{width:'20vw',aspectRatio:'1/1',borderRadius:'50%'}} className={styles.empty}/>
            </div> :
            <>
              <TableContainer>
                <Table
                  sx={{ minWidth: 750 }}
                  aria-labelledby="tableTitle"
                  size={false ? 'small' : 'medium'}
                >
                  <EnhancedTableHead
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={rows.length}
                    mode={mode}
                  />
                  <TableBody>
                    {visibleRows.map((row, index) => {
                      const isItemSelected = isSelected(row.id);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          onClick={(event) => handleClick(event, row.id)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={index}
                          selected={isItemSelected}
                          sx={{ cursor: 'pointer' }}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              inputProps={{
                                'aria-labelledby': labelId,
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <img src={row.image} alt={row.name} style={{ height: '75px' }} />
                          </TableCell>

                          <TableCell align="left" className={mode==='dark'?'tableRow':''}>{row.name}</TableCell>
                          <TableCell align="left" className={mode==='dark'?'tableRow':''}>
                            {row.device.map((element, index) => { return <div key={index}>{row.device.length>1?<span>{index+1}. </span>:null} {element}</div> })}
                          </TableCell>
                          <TableCell align="right" className={mode==='dark'?'tableRow':''}>{row.price}</TableCell>
                          <TableCell align="right">
                            <div className='flex justify-end items-center'>
                              <Link to={`/accessories/${row.id}`}>
                                <Tooltip title="Edit">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="var(--primary)" d="m14.06 9.02l.92.92L5.92 19H5v-.92zM17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83l3.75 3.75l1.83-1.83a.996.996 0 0 0 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29m-3.6 3.19L3 17.25V21h3.75L17.81 9.94z"></path></svg>
                                </Tooltip>
                              </Link>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {emptyRows > 0 && (
                      <TableRow
                        style={{
                          height: (false ? 33 : 53) * emptyRows,
                        }}
                      >
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </>}
        </Paper>


      </Box>


      <Slider open={open} setOpen={setOpen} selected={selected} setSelected={setSelected} type='accessory' />
    </>
  );
}
