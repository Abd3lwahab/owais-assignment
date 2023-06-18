import { FC, useState } from 'react'
import { Box, Button, Grid, Tab, Tabs, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import Link from 'next/link'
import { FormInputs } from '@/types/data'

import UserIcon from '../../public/assets/svgs/user.svg'
import InfoIcon from '../../public/assets/svgs/info.svg'
import CheckkIcon from '../../public/assets/svgs/check.svg'
import TabPanel from './TabPanel'

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

interface FormProps {
  title?: string
  formHandler: (data: FormInputs) => void
  deleteFormHandler?: () => void
}

const Form: FC<FormProps> = ({ title, formHandler, deleteFormHandler }) => {
  const [tabValue, setTabValue] = useState(0)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>()

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const formCheckHandler = (data: FormInputs) => {
    if (!data.title) {
      setTabValue(0)
      return
    }
    formHandler(data)
  }

  return (
    <Grid container spacing={2}>
      <Grid item>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="form-tabs"
          orientation="vertical"
        >
          <FormTab
            label={
              <>
                <TabIcon>
                  <UserIcon />
                </TabIcon>
                <span>Custodian Details</span>
              </>
            }
            {...a11yProps(0)}
          />
          <FormTab
            label={
              <>
                <TabIcon>
                  <InfoIcon />
                </TabIcon>
                <span>Other Information</span>
              </>
            }
            {...a11yProps(1)}
          />
          <FormTab
            label={
              <>
                <TabIcon>
                  <CheckkIcon />
                </TabIcon>
                <span>Certification</span>
              </>
            }
            {...a11yProps(2)}
          />
        </Tabs>
      </Grid>
      <Grid item xs={12} md>
        <FormTabContent onSubmit={handleSubmit(formCheckHandler)}>
          <TabPanel value={tabValue} index={0}>
            <FormTabTitle>Custodian Details</FormTabTitle>
            <Grid container rowSpacing={2} columnSpacing={4}>
              <Grid item xs={12} md={6}>
                <FormInput
                  {...register('title', {
                    required: 'This field is required',
                  })}
                  label="Name *"
                  variant="outlined"
                  fullWidth
                  error={!!errors.title}
                  defaultValue={title}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormInput
                  {...register('address', {
                    required: 'This field is required',
                  })}
                  label="Address of Correspondence *"
                  variant="outlined"
                  fullWidth
                  error={!!errors.address}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormInput
                  {...register('accountName', {
                    required: 'This field is required',
                  })}
                  label="Account Name *"
                  variant="outlined"
                  fullWidth
                  error={!!errors.accountName}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormInput
                  {...register('accountNum', {
                    required: 'This field is required',
                  })}
                  label="Account Number *"
                  variant="outlined"
                  fullWidth
                  error={!!errors.accountNum}
                />
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            Other Information
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            Certification
          </TabPanel>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 8 }}>
            <Link href="/forms" style={{ display: 'contents' }}>
              <FormButton sx={{ border: '1px solid #004a91' }}>Cancel</FormButton>
            </Link>
            {deleteFormHandler && (
              <FormButton
                sx={{
                  backgroundColor: '#c00000',
                  color: '#ffffff',
                  ml: 2,
                }}
                type="button"
                onClick={deleteFormHandler}
              >
                Delete
              </FormButton>
            )}
            <FormButton sx={{ backgroundColor: '#004A91', color: '#ffffff', ml: 2 }} type="submit">
              Save
            </FormButton>
          </Box>
        </FormTabContent>
      </Grid>
    </Grid>
  )
}

export default Form

const FormButton = styled(Button)`
  &.MuiButtonBase-root {
    border-radius: 0;
    padding: 14px 20px;
    text-transform: capitalize;
    width: 180px;
    font-weight: 600;
    font-size: 16px;
    line-height: 140%;
    display: flex;
    align-items: center;
    letter-spacing: 0.1px;

    :hover {
      background-color: #ffffff;
      color: #004a91;
      border: 1px solid #004a91;
    }
  }
`

const FormInput = styled(TextField)`
  & .MuiInputBase-root {
    border-radius: 0px;
    color: #004a91;
    background-color: #ffffff;
  }

  & .MuiOutlinedInput-notchedOutline {
    border-color: #b7b7ba;
    border-width: 1px;
    border: 1px solid #b7b7ba;
  }
`

const FormTabTitle = styled.p`
  font-weight: 600;
  font-size: 18px;
  line-height: 27px;
  color: #004a91;
  margin-bottom: 23px;
`

const FormTabContent = styled.form`
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 0px 4px 103px rgba(50, 50, 71, 0.01), 0px 4px 59px rgba(50, 50, 71, 0.06);
  width: 100%;
  padding: 25px 30px;
`

const FormTab = styled(Tab)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 10px 18px;
  gap: 10px;
  height: 43px;
  min-width: 232px;
  font-size: 15px;
  line-height: 22px;
  color: #004a91;
  text-transform: capitalize;
  background-color: #ffffff;
  margin-bottom: 5px;

  &.Mui-selected {
    background-color: #004a91;
    color: #ffffff;
  }
`
const TabIcon = styled.div`
  width: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`
