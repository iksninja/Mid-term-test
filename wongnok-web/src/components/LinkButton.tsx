import { toggleFavorite } from "@/services/recipe.service"
import { useMutation } from "@tanstack/react-query"
import clsx from "clsx"
import { Heart } from "lucide-react"
import { useState } from "react"

type LikeButtonProps = {
    foodRecipeID: number
    isFavorited: boolean
    onRefresh?: () => void
}

const LikeButton = ({ foodRecipeID, isFavorited, onRefresh }: LikeButtonProps) => {
  const [liked, setLiked] = useState(isFavorited)

  const { mutate, isPending } =  useMutation({
    mutationFn: () => toggleFavorite(foodRecipeID, liked),
    onSuccess: () => {
      setLiked(!liked)
      if(onRefresh) onRefresh()
    },
  })

const toggleLike = () => {
    mutate()
  }
  return (
    <button onClick={toggleLike} aria-label="Liked" className="focus:outline-none">
        <Heart 
            className={clsx(
                'w-6 h-6 transition-colors duration-300' ,
                liked ? 'fill-red-500 text-red-500' : ''
            )}      
        />
    </button>
  )
}

export default LikeButton