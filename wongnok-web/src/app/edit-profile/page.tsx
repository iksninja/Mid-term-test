'use client'

import { Avatar, AvatarFallback, AvatarImage, AvatarProfileImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import Image from 'next/image'
import z from "zod"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { updateUser } from "@/services/user.service"
import useUpdateUser from "@/hooks/useUpdateUser"

export type UserForm = {
  //user: string
  imageUrl?: string
  nickname : string
}

const editProfileSchema = z.object({
        //user: z.string(),
        nickname: z.string().min(1, {
            message: "Nickname lest 1 Char.",
        }),
        imageUrl: z.url().optional(),
    })
type editProfileSchemaType = z.infer<typeof editProfileSchema>

const editProfile = () => {
    const router = useRouter()
    const {data: session} = useSession()

    const { mapUserPayload } = useUpdateUser()

    const { mutateAsync: postUpdateUser } = useMutation({
        mutationFn: updateUser,
        onError: () => {
            console.log('error fetching')
        },
        onSuccess: () => {
            router.replace('/my-profile')
        }
    })

        const form = useForm<editProfileSchemaType>({
            resolver: zodResolver(editProfileSchema),
            defaultValues:{
                //user:'',
                nickname:'',
                imageUrl:'',
            },
        })

        const onSubmit: SubmitHandler<UserForm> = (data) => {
            const userPayload = mapUserPayload(data)
            postUpdateUser(userPayload)
        }

        return(
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="flex justify-center">
                            <FormItem>
                                <Avatar>
                                    <AvatarProfileImage 
                                            src= {`https://avatar.iran.liara.run/username?username=${session?.user?.name}`}
                                            width={152}
                                            height={152} 
                                    />
                                </Avatar>
                                <h2 className="text-4xl font-bold place-items-center">
                                    <FormLabel>{session?.user?.name}</FormLabel>
                                </h2>
                            </FormItem>
                        </div>                       
                    <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                        <div className="flex justify-center">
                            <FormItem >
                                <FormLabel>Profile Image Url</FormLabel>
                                    <FormControl>
                                        <Input placeholder= {`https://avatar.iran.liara.run/username?username=${session?.user?.name}`} {...field} />
                                    </FormControl>
                                <FormDescription>
                                </FormDescription>
                                <FormMessage />
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
                                <FormDescription>
                                </FormDescription>
                                <FormMessage />
                                <Button className='bg-primary-500' type="submit">บันทึกข้อมูล</Button>
                            </FormItem>
                        </div>
                        )}
                    />              
                </form>               
            </Form>
        )
}

export default editProfile