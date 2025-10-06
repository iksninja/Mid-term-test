import clsx from "clsx"
import { Heart } from "lucide-react"
import { useState } from "react"


const LikeButton = () => {
  const [liked, setLiked] = useState(false)



  const toggleLike = () => {
    setLiked(!liked)
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