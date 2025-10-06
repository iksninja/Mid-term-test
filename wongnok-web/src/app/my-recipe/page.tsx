'use client'

import CardRecipe from '@/components/CardRecipe'
import { Button } from '@/components/ui/button'
import { fetchRecipesByUser } from '@/services/recipe.service'
import Link from 'next/link'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

// const MyRecipe = async() => {
//   const data = await fetchRecipesByUser()

//   return (
//     <div>
//       <div className='flex justify-between items-center py-8'>
//         <h1 className='font-bold xl:text-4xl lg:text-3xl sm:text-sm'>สูตรอาหารของฉัน</h1>
//         <Link href={'/create-recipe'}>
//           <Button className='bg-primary-500'>​+ สร้างสูตรอาหาร</Button>
//         </Link>
//       </div>
//       {data && data.length > 0 ? (
//         <div className='flex flex-wrap gap-8'>
//           {data.map((recipe, i) => (
//             <CardRecipe {...recipe} key={i} />
//           ))}
//         </div>
//       ) : (
//         <div>ยังไม่มีสูตรอาหารของตัวเอง</div>
//       )}
//     </div>
//   )
// }

const MyRecipe = () => {
  const { data: session } = useSession()
  const router = useRouter()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['recipesByUser'],
    queryFn: () => fetchRecipesByUser(session?.userId, session?.accessToken),
    enabled: !!session?.userId && !!session?.accessToken,
  })

  if (isLoading || isFetching || !data)
    return (
      <div>
        <div className='flex flex-col py-8'>
          <h1 className='font-bold text-4xl'>สูตรอาหารของฉัน</h1>
          <div className='my-4'>Loading.....</div>
        </div>
      </div>
    )

  return (
    <div>
      <div className='flex justify-between items-center py-8'>
        <h1 className='font-bold text-4xl'>สูตรอาหารของฉัน</h1>
        {data && data.length > 0 && (
          <Link href={'/create-recipe'}>
            <Button className='bg-primary-500 cursor-pointer'>+ สร้างสูตรอาหาร</Button>
          </Link>
        )}
      </div>
      {data && data.length > 0 ? (
        <div className='flex flex-wrap gap-8'>
          {data.map((recipe) => {
            return (
                  <CardRecipe key={recipe.id} {...recipe} 
                    onClick={() => router.push(`recipe-details/${recipe.id}`)}
                  />
            )
          })}
        </div>
      ) : (
        <div className='flex-1 flex flex-col justify-center items-center '>
          <Image
            src='/Illustration-Food _ butcher.png'
            alt='Illustration-Food _ butcher'
            width={323}
            height={323}
          />
          <div className='text-lg my-6'>ยังไม่มีสูตรอาหารของตัวเอง</div>
          <Link href={'/create-recipe'}>
            <Button className='bg-primary-500 cursor-pointer'>+ สร้างสูตรอาหาร</Button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default MyRecipe
