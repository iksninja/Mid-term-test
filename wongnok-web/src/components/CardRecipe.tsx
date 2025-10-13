import { CardRecipeProps } from "@/app/page";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent, CardFooter } from "./ui/card";
import Image from 'next/image'
import LikeButton from "./LinkButton";




const CardRecipe = ({
  id,
  name,
  imageUrl,
  description,
  difficulty,
  cookingDuration,
  user,
  favorite,
  onClick,
  onRefresh,
}: CardRecipeProps & { onRefresh?: () => void }) => (
  <Card className='w-[276px] h-[390px]'>
    <div>
      <div className='h-[158px] relative rounded-t-lg pb-4' onClick={onClick}>
        <Image src={imageUrl} alt={`${name} image`} fill objectFit='cover' />
      </div>
      <div>
        <CardContent>
          <div className="flex justify-between">
            <h1 className='font-bold'>{name}</h1>
            <LikeButton
              foodRecipeID = {Number(id)}
              isFavorited={!!favorite?.id}
              onRefresh={onRefresh}
              />
          </div>
          <p className='text-secondary line-clamp-3'>{description}</p>
        </CardContent>
      </div>
    </div>

    <div>
      <CardFooter>
        <div className='flex w-full item-center'>
          <div className='flex p-1 grow'>
            <img src='/icons/av_timer.svg' alt='av timer' />
            <p>{difficulty.name}</p>
          </div>
          <div className='flex p-1 grow'>
            <img src='/icons/level.svg' alt='level' />
            <p>{cookingDuration.name}</p>
          </div>
        </div>
        <div>
          { user.imageUrl ? (<Avatar>
            <AvatarImage src={user.imageUrl} />
            <AvatarFallback>{user.firstName}</AvatarFallback>
          </Avatar>):(<Avatar>
            <AvatarImage src={`https://avatar.iran.liara.run/username?username=${user.firstName}+${user.lastName}`} />
            <AvatarFallback>{user.firstName}</AvatarFallback>
          </Avatar>)} 
        </div>
      </CardFooter>
    </div>
  </Card>
)

export default CardRecipe