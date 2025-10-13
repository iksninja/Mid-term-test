'use client'

import Image from 'next/image'
import { Button } from './ui/button'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useState } from 'react'
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from './ui/navigation-menu'
import  Link  from 'next/link'

const Navbar = () => {
  const {data: session} = useSession()

  const [hidden, sethidden] = useState<boolean>(false)

  const forSetHidden = () => {
    sethidden(!hidden)
  }

  return (
    <div className='flex justify-between'>
      <Link href="/">
      <Image
        src='/wongnok-with-name-logo.png'
        width={182}
        height={49}
        alt='wongnok-logo'
      />
      </Link>
      {session ? (
        <NavigationMenu viewport={false} className='flex flex-col relative cursor-pointer navbar'>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>{session.user?.name}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul>
                  <li >
                    <NavigationMenuLink asChild>
                      <Link href="/my-profile" className='hover:bg-primary-100'>โปรไฟล์ของฉัน</Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link href="/my-recipe" className='hover:bg-primary-100'>สูตรอาหารของฉัน</Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link href="/my-favorite" className='hover:bg-primary-100'>สูตรอาหารสุดโปรด</Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <div onClick={() => signOut()} className='hover:bg-primary-100'>ออกจากระบบ</div>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      ) : (
        <Button
          className='text-primary-a'
          variant='ghost'
          onClick={() => signIn('keycloak')}
        >
          <Image
            color='red'
            src='/icons/person.svg'
            alt='icon person'
            width={24}
            height={24}
          />
          เข้าสู่ระบบ
        </Button>
      )}
    </div>
  )
}

export default Navbar
