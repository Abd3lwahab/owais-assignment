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

    const response = await fetch(process.env.AWS_LAMBDA_API!, {
      method: 'DELETE',
      body: JSON.stringify({ id: id }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Error trying to delete the form')
    }

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

    if (!id || !body.title) {
      res.status(400).json({ error: 'Missing id or title' })
      return
    }

    const response = await fetch(process.env.AWS_LAMBDA_API!, {
      method: 'PUT',
      body: JSON.stringify({ id: id, title: body.title }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Error trying to delete the form')
    }

    res.status(201).json({ message: 'Form data saved successfully' })
  } catch {
    res.status(500).json({ error: 'Somthing went wrong!' })
  }
}
