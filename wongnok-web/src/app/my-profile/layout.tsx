'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { signIn, useSession } from 'next-auth/react'



const myProfileLayout = ({ children }: { children: React.ReactNode }) => {

  const {data: session} = useSession()

  return (
    <><div className='flex justify-between'>
      <h1 className='text-4xl font-bold py-8'>โปรไฟล์ของฉัน</h1>
      {session ? (<Link href='/edit-profile' >
        <Button
          variant='outline'
          className='text-primary-500 my-8 border-primary-500 flex justify-center'
        >
        <Image
          color='red'
          src='/icons/vector.svg'
          alt='icon vector'
          width={24}
          height={24} />
          แก้ไขโปรไฟล์
        </Button>
      </Link>) : (
        <Button
          className='text-primary-a'
          variant='ghost'
          onClick={() => signIn('keycloak')}
        >
        <Image
          color='red'
          src='/icons/vector.svg'
          alt='icon vector'
          width={24}
          height={24} />
          แก้ไขโปรไฟล์
        </Button>
      )}
      
    </div>
    <div>
      {children}
    </div></>
  )
}

export default myProfileLayout
