'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const myProfileLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  return (
    <><div className='flex justify-between'>
      <h1 className='text-4xl font-bold py-8'>แก้ไขโปรไฟล์ของฉัน</h1>
      <div className='flex flex-col'>
      </div>
      
    </div>
    <div>
      {children}
    </div></>
  )
}

export default myProfileLayout
