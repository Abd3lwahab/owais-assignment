import { Box } from '@mui/material'
import {
  DataGrid,
  GridColDef,
  GridColumnVisibilityModel,
  GridValidRowModel,
} from '@mui/x-data-grid'
import { FC } from 'react'
import styled from 'styled-components'

interface TableProps {
  rows: GridValidRowModel[]
  columns: GridColDef[]
  columnsVisibility: GridColumnVisibilityModel
}

const Table: FC<TableProps> = ({ rows, columns, columnsVisibility }) => {
  return (
    <Box width={'100%'}>
      <CustomDateGrid
        pageSizeOptions={[25, 50, 100]}
        rows={rows}
        columns={columns}
        disableRowSelectionOnClick
        disableColumnFilter
        disableColumnMenu
        disableDensitySelector
        disableColumnSelector
        disableVirtualization
        columnVisibilityModel={columnsVisibility}
      />
    </Box>
  )
}

export default Table

const CustomDateGrid = styled(DataGrid)({
  '&': {
    border: 'none',
  },
  '& .MuiDataGrid-columnHeaders': {
    borderRadius: 0,
    backgroundColor: '#004A91',
    color: '#ffffff',
    fontWeight: 500,
    fontSize: '12px',
    lineHeight: '18px',
  },

  '& .MuiDataGrid-cell ': {
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '21px',
    color: '#004A91',
  },
  '& .id-tab-theme--header, & .MuiDataGrid-cell:first-of-type ': {
    paddingLeft: '30px',
  },

  '& .MuiDataGrid-footerContainer ': {
    border: 'none',
  },
})
