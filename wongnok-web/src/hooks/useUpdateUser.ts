import { UserForm } from '@/app/edit-profile/page'

const useUpdateUser = () => {
  const mapUserPayload = (data: UserForm) => {
    return {
      imageUrl: data.imageUrl,
      nickname : data.nickname,
    }
  }

  return { mapUserPayload }
}

export default useUpdateUser