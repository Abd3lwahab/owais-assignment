import PageHeader from '@/components/PageHeader'
import { FormDataType } from '@/types/data'
import { GridColDef } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import Image from 'next/image'
import Table from '@/components/Table'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material'
import Link from 'next/link'

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    flex: 1,
    sortable: false,
    headerClassName: 'id-tab-theme--header',
    maxWidth: 250,
    minWidth: 90,
  },
  {
    field: 'title',
    headerName: 'Form Title',
    sortable: false,
    flex: 1,
    minWidth: 350,
  },
  {
    field: 'timestamp',
    headerName: 'Date',
    type: 'string',
    minWidth: 240,
    flex: 1,
    sortable: false,
  },
  {
    field: 'status',
    headerName: 'Status',
    type: 'string',
    maxWidth: 250,
    minWidth: 190,
    flex: 1,
    sortable: false,
    renderCell: (params) => {
      return <RowFormStatus status={params.row.status}>{params.row.status}</RowFormStatus>
    },
  },
  {
    field: 'action',
    headerName: 'Action',
    sortable: false,
    width: 150,
    renderCell: (params) => {
      return (
        <RowFormActionWrapper>
          <RowFormAction inputColor="#004A91" href={`/forms/edit/${params.row.id}`}>
            <Image src={'/assets/svgs/pencil.svg'} width={13} height={13} alt="edit" />
          </RowFormAction>
          <RowFormAction inputColor="#FFFFFF" href={'/'}>
            <Image src={'/assets/svgs/view.svg'} width={13} height={13} alt="edit" />
          </RowFormAction>
          {params.row.status === 'approved' && (
            <RowFormAction inputColor="#DCAC00" href={'/'}>
              <Image src={'/assets/svgs/download.svg'} width={13} height={13} alt="edit" />
            </RowFormAction>
          )}
        </RowFormActionWrapper>
      )
    },
  },
]

const Page = ({}) => {
  const [formStatusFilter, setFormStatusFilter] = useState('pending')
  const [rows, setRows] = useState<FormDataType[]>([])
  const [sortedByFilter, setSortedByFilter] = useState<string>('')

  useEffect(() => {
    fetchForms()
  }, [])

  const fetchForms = async () => {
    try {
      const response = await axios.get('/api/forms')
      const data = response.data

      setRows(data.forms)
    } catch (error) {
      console.log(error)
    }
  }

  const filterdRows = () => {
    if (formStatusFilter === 'approved') {
      return rows.filter((row) => row.status === 'approved')
    } else {
      return rows.filter((row) => row.status !== 'approved')
    }
  }

  const handleFormFilter = (event: React.MouseEvent<HTMLElement>, newFilter: string) => {
    if (newFilter !== null) {
      setFormStatusFilter(newFilter)
    }
  }

  const handleSortByFilter = (event: SelectChangeEvent<unknown>) => {
    setSortedByFilter(event.target.value as string)
  }

  return (
    <>
      <PageHeader
        title="Forms"
        description="All the compulsory forms are available here"
        hasAction={true}
        actions={
          <>
            <FormInput
              id="outlined-basic"
              label="Search"
              variant="outlined"
              size="small"
              InputProps={{
                endAdornment: (
                  <Image src="/assets/svgs/search.svg" width={17} height={17} alt="details" />
                ),
              }}
              name="search"
            />
            <FormControl size="small">
              <InputLabel id="sort-by" size="small" color="primary">
                Sort By
              </InputLabel>
              <FormSelect
                labelId="sort-by"
                id="sort-by"
                value={sortedByFilter}
                label="Sort By"
                onChange={handleSortByFilter}
                size="small"
                name="sort-by"
              >
                <MenuItem value={'id'}>ID</MenuItem>
                <MenuItem value={'title'}>Title</MenuItem>
                <MenuItem value={'date'}>Date</MenuItem>
              </FormSelect>
            </FormControl>
          </>
        }
      />
      <PageContent>
        <StatusFilterToggle
          color="primary"
          value={formStatusFilter}
          exclusive
          onChange={handleFormFilter}
          aria-label="Status"
        >
          <ToggleButton value="approved">Approved</ToggleButton>
          <ToggleButton value="pending">Pending</ToggleButton>
        </StatusFilterToggle>
        <Table
          rows={filterdRows()}
          columns={columns}
          columnsVisibility={{
            status: formStatusFilter === 'pending',
          }}
        />
      </PageContent>
    </>
  )
}

export default Page

const RowFormStatus = styled.p<{ status: string }>`
  background: #ededef;
  padding: 3px 6px;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  text-transform: capitalize;
  color: ${(props) => (props.status === 'pending' ? '#1FE08F' : '#FFC107')};
`

const RowFormAction = styled(Link)<{ inputColor?: string }>`
  box-shadow: 3px 3px 16px rgba(0, 0, 0, 0.2);
  border-radius: 1px;
  width: 30px;
  height: 30px;
  background-color: ${(props) => props.inputColor || '#004A91'};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`

const RowFormActionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`

const StatusFilterToggle = styled(ToggleButtonGroup)`
  & .MuiButtonBase-root {
    border-radius: 0;
    border: none;
    background: #ffffff;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    color: #004a91;
    padding: 11px 20px;
    text-transform: capitalize;
  }

  & .Mui-selected,
  & .Mui-selected:hover {
    background: #004a91;
    color: #ffffff;
  }

  & {
    margin-bottom: 21px;
  }
`

const FormInput = styled(TextField)`
  & .MuiInputBase-root {
    border-radius: 0px;
    width: 300px;
    color: #004a91;
  }

  & .MuiOutlinedInput-notchedOutline {
    border-color: #b7b7ba;
    border-width: 1px;
    border: 1px solid #b7b7ba;
  }
`

const FormSelect = styled(Select)`
  &.MuiInputBase-root {
    border-radius: 0px;
    width: 125px;
    color: #004a91;
  }

  & .MuiOutlinedInput-notchedOutline {
    border-color: #b7b7ba;
    border-width: 1px;
    border: 1px solid #b7b7ba;
  }

  & .MuiSvgIcon-root {
    color: #004a91;
  }
`

const PageContent = styled.div`
  display: flex;
  flex-direction: column;
  padding-block: 30px;
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 0px 4px 103px rgba(50, 50, 71, 0.01), 0px 4px 59px rgba(50, 50, 71, 0.06);
  align-items: center;
`
