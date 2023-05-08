import Header from 'components/Header'
import RecipeCard from 'components/RecipeCard'
import { useRecipesQuery } from 'gql'
import React from 'react'
import BiancoHeader1 from 'utils/typography/BiancoHeader1'

const Recipes = () => {
  const { data } = useRecipesQuery()

  return (
    <div className="container mx-auto px-6 sm:px-24 ">
      <Header />
      <div className="flex flex-col justify-center py-6 lg:py-12">
        <BiancoHeader1 className="text-bianco-red sm:text-4xl">
          Recipes
        </BiancoHeader1>
        <div>
          The world revolves around pizza. View, update, create, and delete
          pizza recipes here! 🍕
        </div>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,auto))]">
        {data &&
          data.recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
      </div>
    </div>
  )
}

export default Recipes
