import PageHeader from '@/components/PageHeader'
import { FC } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { FormInputs } from '@/types/data'
import Form from '@/components/Form'

const Page: FC = ({}) => {
  const router = useRouter()

  const postFormHandler = async (data: FormInputs) => {
    try {
      const response = await axios.post('/api/forms', data)

      if (response.status === 201) {
        router.push('/forms')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <PageHeader title="Custodian Form" description="Lorem ipsum dolor sit amet" />
      <Form formHandler={postFormHandler} />
    </>
  )
}

export default Page
