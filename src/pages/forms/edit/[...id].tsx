import Form from '@/components/Form'
import PageHeader from '@/components/PageHeader'
import { FormDataType, FormInputs } from '@/types/data'
import { useRouter } from 'next/router'
import { FC } from 'react'
import axios from 'axios'
import { GetServerSidePropsContext } from 'next'

interface SingleFormPageProps {
  form: FormDataType
}

const SingleFormPage: FC<SingleFormPageProps> = ({ form }) => {
  const router = useRouter()

  const id = router.query.id

  const updateFormHandler = async (formData: FormInputs) => {
    try {
      const response = await axios.put(`/api/forms/${id}`, {
        ...formData,
      })

      if (response.status === 201) {
        router.push('/forms')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const deleteFormHandler = async () => {
    try {
      const response = await axios.delete(`/api/forms/${id}`)

      if (response.status === 200) {
        router.push('/forms')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <PageHeader title="Custodian Form" description="Lorem ipsum dolor sit amet" />
      <Form
        title={form.title}
        formHandler={updateFormHandler}
        deleteFormHandler={deleteFormHandler}
      />
    </>
  )
}

export default SingleFormPage

export async function getServerSideProps({ params }: GetServerSidePropsContext) {
  try {
    const { id } = params!

    const data = await fetch(process.env.AWS_LAMBDA_API!, {
      method: 'GET',
    })
    const dataJson = await data.json()

    const forms = dataJson.forms
    const form = forms.find((form: any) => form.id === Number(id))

    if (!form) {
      return { notFound: true }
    }

    return {
      props: { form },
    }
  } catch (err) {
    return { notFound: true }
  }
}
