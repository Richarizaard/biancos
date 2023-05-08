class ChangeToppingsNotNullable < ActiveRecord::Migration[7.0]
  def change
    change_column_null :toppings, :name, false
    change_column_null :toppings, :description, false
  end
end
