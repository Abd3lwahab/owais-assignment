import fs from 'fs'
import path from 'path'

const filePath = path.join(process.cwd(), 'src/data/index.json')

export function getFilePath(): string {
  return filePath
}

export async function readFile(filePath: string) {
  try {
    const rawData = await fs.promises.readFile(filePath, 'utf8')
    const data = JSON.parse(rawData)

    return data
  } catch (error) {
    throw Error('Got an error trying to read the file')
  }
}

export async function writeFile(filePath: string, data: any) {
  try {
    await fs.promises.writeFile(filePath, JSON.stringify(data))
  } catch (error) {
    throw Error('Got an error trying to write the file')
  }
}
