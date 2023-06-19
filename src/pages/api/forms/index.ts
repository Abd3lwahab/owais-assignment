import { NextApiRequest, NextApiResponse } from 'next'

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

    const response = await fetch(process.env.AWS_LAMBDA_API!, {
      method: 'POST',
      body: JSON.stringify({ title: body.title }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Error trying to save the file')
    }

    res.status(201).json({ message: 'Form data saved successfully' })
  } catch {
    res.status(500).json({ error: 'Error trying to save the file' })
  }
}

const formGetHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = await fetch(process.env.AWS_LAMBDA_API!, {
      method: 'GET',
    })
    const dataJson = await data.json()

    res.status(200).json(dataJson)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error })
  }
}
