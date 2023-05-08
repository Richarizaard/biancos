class CreateRecipeToppings < ActiveRecord::Migration[7.0]
  def change
    create_table :recipe_toppings do |t|
      t.references :topping
      t.references :recipe

      t.timestamps
    end
  end
end
