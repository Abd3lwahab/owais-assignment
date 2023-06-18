import { FormDataType } from '@/types/data'
import { getFilePath, readFile, writeFile } from '@/utils/data-storge'
import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case 'PUT':
      return formPutHandler(req, res)

    case 'DELETE':
      return formDeleteHandler(req, res)

    default:
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

const formDeleteHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const id = Number(req.query.id)

    if (!id) {
      res.status(400).json({ error: 'Missing id' })
      return
    }

    const filePath = getFilePath()
    const data = await readFile(filePath)

    const updatedForms = data.forms.filter((form: FormDataType) => {
      if (form.id !== id) {
        return { ...form }
      }
    })

    const newData = {
      forms: updatedForms,
    }

    await writeFile(filePath, newData)

    res.status(200).json({ message: 'Form data deleted successfully' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Somthing went wrong!' })
  }
}

const formPutHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const body = req.body
    const id = Number(req.query.id)

    if (!id) {
      res.status(400).json({ error: 'Missing id' })
    }

    const filePath = getFilePath()
    const data = await readFile(filePath)

    const updatedForms = data.forms.map((form: FormDataType) => {
      if (form.id === id) {
        return { ...form, title: body.title }
      }
      return form
    })

    const newData = {
      forms: updatedForms,
    }

    await writeFile(filePath, newData)

    res.status(201).json({ message: 'Form data saved successfully' })
  } catch {
    res.status(500).json({ error: 'Somthing went wrong!' })
  }
}
