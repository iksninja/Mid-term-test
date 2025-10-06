import { RecipeForm } from '@/app/create-recipe/page'
import { api } from '@/lib/axios'
import { User } from './user.service'


type CookingDuration = {
  id: number
  name: string
}

type Difficulty = {
  id: number
  name: string
}

export type Recipe = {
  id: number
  name: string
  imageUrl: string
  description: string
  favorite : Favorite
  cookingDuration: CookingDuration
  difficulty: Difficulty
  user: User
  
}

export type RecipePayload = {
  name: string
  description: string
  ingredient: string
  instruction: string
  imageURL: string
  cookingDurationID: number
  difficultyID: number
}

export type RecipeDetails = {
  id: number
  name: string
  description: string
  ingredient: string
  instruction: string
  imageUrl: string
  favorite : Favorite
  cookingDuration: CookingDuration
  difficulty: Difficulty
  createdAt: string
  updatedAt: string
  averageRating: number
  user: User
}
export type Favorite = {
  foodRecipeID: number
  id: number
  UserID: string
 }

type fetchRecipeRequest = {
  page: number
  limit: number
  search: string
}

export const fetchRecipes = async (data: fetchRecipeRequest) => {
  try {
    const recipesFetch = await api.get<{
      results: Recipe[]
      total: number
    }>(
       `/api/v1/food-recipes?page=${data.page}&limit=${data.limit}&search=${data.search}`
      //'/api/v1/food-recipes?page=1&limit=10'
    )

    return recipesFetch.data
  } catch (e) {
    console.error(e)
  }
}

export const fetchRecipeDetails = async (recipeId: string) => {
  const recipeDetails = await api.get<RecipeDetails>(`/api/v1/food-recipes/${recipeId}`)
  return recipeDetails
}

export const createRecipe = async (data: RecipePayload) => {
  const recipeDetails = await api.post<RecipeForm>(
    '/api/v1/food-recipes',
    {
      ...data,
    }
  )
  return recipeDetails
}

export const fetchRecipesByUser = async (
  userId?: string,
  token: string = ''
) => {
  console.log('user', userId)
  const recipes = await api.get<{ results: Recipe[] }>(
    `/api/v1/users/${userId}/food-recipes`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  return recipes.data.results
}

export const fetchRecipeFavorite = async (data: fetchRecipeRequest) => {
  try {
    const recipesFavorite = await api.get<{
      results: Recipe[]
      total: number
    }>(
       `/api/v1/food-recipes/favorites?page=${data.page}&limit=${data.limit}&search=${data.search}`
    )

    return recipesFavorite.data
  } catch (e) {
    console.error(e)
  }
}
