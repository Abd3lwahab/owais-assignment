export interface FormDataType {
  id: number
  title: string
  timestamp: string
  status: 'approved' | 'pending' | 'under review' | 'submitted'
}

export interface FormInputs {
  title: string
  address: string
  accountName: string
  accountNum: string
}
