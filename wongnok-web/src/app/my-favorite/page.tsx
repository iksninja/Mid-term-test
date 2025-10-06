'use client'

import CardRecipe from "@/components/CardRecipe"
import SkeletonCardLoading from '@/components/SkeletonCardLoading'
import { Button } from "@/components/ui/button"
import { fetchRecipeFavorite, Recipe } from "@/services/recipe.service"
import { useMutation } from "@tanstack/react-query"
import Link from "next/link"
import Image from 'next/image'
import { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"

type User = {
  id: string
  firstName: string
  lastName: string
}

type favorite = {
  foodRecipeID: number
  id: number
  UserID: string
 }

export type CardRecipeProps = {
  id: string
  name: string
  imageUrl: string
  description: string
  cookingDuration: {
    id: number
    name: string
  }
  difficulty: {
    id: number
    name: string
  }
  user: User
  favorite : favorite
}

const MyFavorite =  () => {

    const [recipesData, setRecipesData] = useState<{
    results: Recipe[]
    total: number
    }>({
        results: [],
        total: 0,
    })

    const {
        mutateAsync: getRecipe,
        isPending: isRecipeLoading,
        isError: isRecipeError,
    } = useMutation({
        mutationFn: fetchRecipeFavorite,
        onError: () => {
            console.log('error fetching')
        },
        onSuccess: (data) => {
            setRecipesData(data)
        },
    })

    const limitDataPerPage = 5
    const pathname = usePathname()

    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams)
    params.set('limit', String(limitDataPerPage))
    
    const router = useRouter()
    const [currentPage, setCurrentPage] = useState<number>(
        Number(searchParams.get('page') ?? 1)
    )
    const [searchInput, setSearchInput] = useState<string>(
    searchParams.get('search') ?? ''
  )

    useEffect(() => {
        params.set('page', String(currentPage))
        router.replace(`${pathname}?${params.toString()}`)
        getRecipe({
          page: Number(currentPage),
          limit: limitDataPerPage,
          search: searchInput,
        })
      }, [currentPage])

    const handleSearch = useDebouncedCallback((data) => {
        params.set('page', '1')
        if (searchInput === '') {
          params.delete('search')
        } else {
          params.set('search', searchInput)
        }
        router.replace(`${pathname}?${params.toString()}`)
        getRecipe({
          page: Number(currentPage),
          limit: limitDataPerPage,
          search: data,
        })
      }, 1000)

    if (isRecipeError) return <h1>Error</h1>

    return (
        <div>
        <div className='flex justify-between items-center py-8'>
            <h1 className='font-bold xl:text-4xl lg:text-3xl sm:text-sm'>สูตรอาหารสุดโปรด</h1>
            <Link href={'/create-recipe'}>
            <Button className='bg-primary-500'>​+ สร้างสูตรอาหาร</Button>
            </Link>
        </div>
        {recipesData && recipesData.results.length > 0 ? (
            <div className='flex flex-wrap gap-8'>
            {recipesData.results.map((recipe, i) => (
                <CardRecipe {...recipe} key={i} />
            ))}
            </div>
        ) : (
            <div className="flex items-center flex-col">
                <Image
                    src='/Illustration-Food _ butcher.png'
                    alt='Illustration-Food _ butcher'
                    width={323}
                    height={323}
                />
                <div className="text-2xl">ยังไม่มีรายการสูตรอาหารสุดโปรด</div>
                <Link href={'/'}>
                    <Button className='bg-primary-500'>กลับหน้าสูตรอาหารทั้งหมด</Button>
                </Link>
                  
            </div>
            
        )}
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                    onClick={() => {
                        setCurrentPage((prev) => {
                        return prev <= 1 ? prev : prev - 1
                        })
                    }}
                    />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink>{currentPage}</PaginationLink>
                </PaginationItem>
                {/* <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem> */}
                <PaginationItem>
                    <PaginationNext
                    onClick={() => {
                        setCurrentPage((prev) => {
                        return prev >= Math.ceil(recipesData.total / limitDataPerPage)
                            ? prev
                            : prev + 1
                        })
                    }}
                    />
                </PaginationItem>
            </PaginationContent>
      </Pagination>
        </div>
    )
}

export default MyFavorite