'use client'

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import Image from 'next/image'
import z from "zod"
import { useSession } from "next-auth/react"
import { Avatar, AvatarProfileImage } from "@/components/ui/avatar"
import { useQuery } from "@tanstack/react-query"
import { getUser, User } from "@/services/user.service"
import { useEffect } from "react"



const MyProfile = () => {
    const {data: session} = useSession()

    const myProfileSchema = z.object({
        user: z.string(),
        nickname: z.string().min(1, {
            message: "Nickname lest 1 Char.",
        }),
        imageUrl: z.string(),
    })

    type myProfileSchemaType = z.infer<typeof myProfileSchema>

    const form = useForm<myProfileSchemaType>({
                resolver: zodResolver(myProfileSchema),
                defaultValues:{
                    user: '',
                    nickname:'',
                    imageUrl:'',
                },
            })

    const { data, isLoading, isError } = useQuery<User>({
        queryKey: ['userProfile'],
        queryFn: () => getUser(),
    })

         useEffect(() => {
                if (data) {
                form.reset({
                    user: `${data?.firstName} ${data?.lastName}`,
                    nickname: data.nickName,
                    imageUrl: data.imageUrl,
                })
                }
            }, [data])


        
        if (isLoading) return <div>Loading</div>
        if (isError) return <Form {...form}>
                <form className="space-y-4">
                    <FormField
                        control={form.control}
                        name="user"
                        render={({ field }) => (
                            <div className="flex justify-center">
                                <FormItem>
                                    <Image
                                        src='/Default-user-image.svg'
                                        alt='Default-user-image'
                                        width={152}
                                        height={152} 
                                    />
                                        <h2 className="text-4xl font-bold place-items-center">
                                        <FormLabel>ผู้ใช้งานทั่วไป</FormLabel>
                                        </h2>
                                </FormItem>
                            </div>
                        )}
                    />
                    
                    <FormField
                        control={form.control}
                        name="nickname"
                        render={({ field }) => (
                            <div className="flex justify-center">
                                <FormItem >
                                    <FormLabel>ชื่อเล่น</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ninja" {...field} />
                                    </FormControl>
                                </FormItem>
                            </div>
                        )}
                    />
                </form>
            </Form>
            

        return(
            <Form {...form}>
                <form className="space-y-4">
                    <FormField
                        control={form.control}
                        name="user"
                        render={({ field }) => (
                            <div className="flex justify-center">
                                <FormItem>
                                    { data?.imageUrl ? (<Avatar>
                                        <AvatarProfileImage
                                            src= {data.imageUrl}
                                            width={152}
                                            height={152} 
                                        />
                                    </Avatar>
                                    ):(
                                    <Avatar>
                                        <AvatarProfileImage
                                            src= {`https://avatar.iran.liara.run/username?username=${data?.firstName}+${data?.lastName}`}
                                            width={152}
                                            height={152} 
                                        />
                                    </Avatar>
                                ) }
                                        <h2 className="text-4xl font-bold place-items-center">
                                        <FormLabel>{data?.firstName} {data?.lastName}</FormLabel>
                                        </h2>
                                </FormItem>
                            </div>
                        )}
                    />
                    
                    <FormField
                        control={form.control}
                        name="nickname"
                        render={({ field }) => (
                            <div className="flex justify-center">
                                <FormItem >
                                    <FormLabel>ชื่อเล่น</FormLabel>
                                    <FormControl>
                                        <Input placeholder= "ชื่อเล่นของฉัน" {...field} value={`${data?.nickName}`}/>
                                    </FormControl>
                                </FormItem>
                            </div>
                        )}
                    />
                </form>
            </Form>
        )

}

export default MyProfile