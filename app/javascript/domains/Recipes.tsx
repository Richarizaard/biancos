import EmptyRecipeCard from 'components/EmptyRecipeCard'
import Header from 'components/Header'
import RecipeCard from 'components/RecipeCard'
import { SliderContext } from 'components/SliderContext'
import { useRecipesQuery } from 'gql'
import React, { useContext } from 'react'
import BiancoHeader1 from 'utils/typography/BiancoHeader1'

const Recipes = () => {
  const { data } = useRecipesQuery()
  const { isChef } = useContext(SliderContext)

  return (
    <div className="container mx-auto px-6 sm:px-24 ">
      <Header />
      <div className="flex flex-col justify-center py-6 lg:py-12">
        <BiancoHeader1 className="text-bianco-red sm:text-4xl">
          Recipes
        </BiancoHeader1>
        <div>
        The world revolves around pizza. But you can't have pizza without recipes! View, update, create, and delete
          pizza recipes here! 🍕 (Sorry, chefs only)
        </div>
        <span className="font-medium text-end">
          {data?.recipes?.length || 0} recipes
        </span>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,auto))]">
        {isChef && <EmptyRecipeCard />}
        {data &&
          data.recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
      </div>
    </div>
  )
}

export default Recipes
