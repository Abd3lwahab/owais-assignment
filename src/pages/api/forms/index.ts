import { NextApiRequest, NextApiResponse } from 'next'

import { getFilePath, readFile, writeFile } from '@/utils/data-storge'
import { FormDataType } from '@/types/data'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case 'POST':
      return formPostHandler(req, res)

    case 'GET':
      return formGetHandler(req, res)

    default:
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

const formPostHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const body = req.body

    const filePath = getFilePath()
    const data = await readFile(filePath)

    const newForm = {
      id: data.forms.length + 1,
      title: body.title,
      status: 'pending',
      timestamp: 'June 18, 2023',
    }

    const newForms = [...data.forms, newForm]

    const newData = {
      forms: newForms,
    }

    await writeFile(filePath, newData)

    res.status(201).json({ message: 'Form data saved successfully' })
  } catch {
    res.status(500).json({ error: 'Error trying to save the file' })
  }
}

const formGetHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const filePath = getFilePath()
    const data = await readFile(filePath)

    res.status(200).json(data)
  } catch {
    res.status(500).json({ error: 'Error trying to read the file' })
  }
}
