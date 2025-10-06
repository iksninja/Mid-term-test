import { UserForm } from '@/app/edit-profile/page'
import { api } from '@/lib/axios'


export type User = {
  id: number
  firstName: string
  lastName: string
  imageUrl: string
  nickName: string
}

export const getUser = async () => {
  const User = await api.get<User>(`/api/v1/users/`)
  return User.data
}

export const updateUser = async (data: UserForm) => {
  const User = await api.put<User>(`/api/v1/users/`, {
    nickName: data.nickname,
    imageUrl: data.imageUrl,
  })
  return User.data
}
