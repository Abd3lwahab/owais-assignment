import { Box } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import styled from 'styled-components'

const Header: FC = ({}) => {
  return (
    <HeaderContainer
      display={{
        sm: 'flex',
        xs: 'none',
      }}
    >
      <HeaderButton href={'/forms/new'}>Individual Investor</HeaderButton>
      <HeaderIconsWrapper>
        <HeaderIcon src="/assets/svgs/vector.svg" alt="search" width={30} height={30} />
        <HeaderIcon src="/assets/svgs/notification.svg" alt="search" width={30} height={30} />
      </HeaderIconsWrapper>
      <LanguageChanger>
        <LanguageChangerText>EN</LanguageChangerText>
        <SelectedLanguage>ع</SelectedLanguage>
      </LanguageChanger>
      <ManageAccount>
        <UserIcon>BA</UserIcon>
        <UserNameWrapper>
          <WelcomeText>Welcome!</WelcomeText>
          <UserName>Bader Alobaidi</UserName>
        </UserNameWrapper>
        <Image src="/assets/svgs/arrow-down.svg" alt="arrow-down" width={24} height={24} />
      </ManageAccount>
    </HeaderContainer>
  )
}

export default Header

const HeaderContainer = styled(Box)`
  justify-content: flex-end;
  align-items: center;
  padding: 23px 20px;
`

const HeaderButton = styled(Link)`
  background: #004a91;
  border-radius: 5px;
  font-weight: 600;
  font-size: 13.023px;
  color: #ffffff;
  padding: 10px 16px;
  font-family: inherit;
  cursor: pointer;
  margin-right: 14px;
  text-decoration: none;
`

const HeaderIconsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-right: 9px;
`

const HeaderIcon = styled(Image)`
  width: 30px;
  height: 30px;
  cursor: pointer;
`

const LanguageChanger = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #2a2522;
  border-radius: 5px;
  height: 35px;
  padding: 4px;
  margin-right: 18px;
  cursor: pointer;
`

const LanguageChangerText = styled.p`
  display: flex;
  font-weight: 400;
  font-size: 11px;
  line-height: 13px;
  color: #ffffff;
  width: 38px;
  height: 28px;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
`

const SelectedLanguage = styled(LanguageChangerText)`
  background: #dcac00;
`

const ManageAccount = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(0, 74, 145, 0.35);
  border-radius: 5px;
  padding: 10px 8px;
  gap: 10px;
  cursor: pointer;
`

const UserIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: #004a91;
  border-radius: 6.67px;
  color: #ffffff;
  font-weight: 600;
  font-size: 14px;
  line-height: 10px;
`

const UserNameWrapper = styled.p`
  display: flex;
  flex-direction: column;
`

const WelcomeText = styled.span`
  font-weight: 500;
  font-size: 10px;
  line-height: 15px;
  color: #64646c;
`

const UserName = styled.span`
  font-weight: 500;
  font-size: 17px;
  line-height: 17px;
  color: #64646c;
`
