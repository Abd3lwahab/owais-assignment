import { Box } from '@mui/material'
import Image from 'next/image'
import { FC, ReactNode } from 'react'
import styled from 'styled-components'

interface PageHeaderProps {
  title: string
  description: string
  hasAction?: boolean
  actions?: ReactNode
}

const PageHeader: FC<PageHeaderProps> = ({ title, description, hasAction, actions }) => {
  return (
    <PageHeaderWrapper
      flexDirection={{
        xs: 'column',
        md: 'row',
      }}
      display={'flex'}
    >
      <FlexRow>
        <PageIcon>
          <Image src="/assets/svgs/form-icon.svg" width={28} height={28} alt="details" />
        </PageIcon>
        <PageDetails>
          <PageTitle>{title}</PageTitle>
          <PageDescription>{description}</PageDescription>
        </PageDetails>
      </FlexRow>
      {hasAction && (
        <FormAction
          flexDirection={{
            xs: 'column',
            md: 'row',
          }}
        >
          {actions}
        </FormAction>
      )}
    </PageHeaderWrapper>
  )
}

export default PageHeader

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const PageHeaderWrapper = styled(Box)`
  padding-block: 20px;
  padding-inline: 30px;
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 0px 4px 103px rgba(50, 50, 71, 0.01), 0px 4px 59px rgba(50, 50, 71, 0.06);
  justify-content: space-between;
  gap: 6px;
`

const PageDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`

const PageIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 64px;
  height: 64px;
  background: #004a91;
  border-radius: 50%;
  margin-right: 16px;
`

const PageTitle = styled.span`
  font-weight: 600;
  font-size: 18px;
  line-height: 27px;
  color: #004a91;
`

const PageDescription = styled.span`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #004a91;
  opacity: 0.5;
`

const FormAction = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
`
