namespace :toppings do
    task populate: :environment do
        toppings = {
            "bacon": "Everything, even pizza, is better with bacon. Try one of Bianco's bacon pizzas, like the Cali Chicken Bacon Ranch, or build your own for dinner delivery tonight.",
            "banana peppers": "Banana peppers add a surprisingly sweet, tangy flavor to pizzas and sandwiches. Experiment by adding banana peppers to your usual Bianco's order or build your own pizza or pasta.",
            "bbq chicken": "There's a reason BBQ chicken is a summer picnic staple: It's hugely popular. Order Bianco's Memphis BBQ Chicken pizza for your next party and watch the crowd go wild.",
            "beef": "Our seasoned beef is a flavorful addition to any Bianco's pizza, from the Spinach & Feta to the Bacon Cheeseburger Feast. Order online for pickup or delivery.",
            "black olives": "Earthy black olives complement meats and veggies perfectly on pizza, making black olives a popular addition to pizzas like Bianco's MeatZZa Feast or Spinach & Feta",
            "buffalo chicken": "For those who love the spicy sweetness of buffalo sauce without the messiness of wings, the Bianco's Buffalo Chicken pizza gets you the best of both worlds.",
            "cheddar cheese": "At Bianco's, we know you can't get enough melty cheddar cheese. Order Bianco's Stuffed Cheesy Bread, cheesy chicken bites, or one of our Specialty Pizzas today.",
            "cheese": "Cheese is an essential ingredient in Bianco's recipes. Professionals test cheddar, mozzarella, feta, Parmesan, and provolone cheeses for ideal flavor and freshness.",
            "chicken": "Bianco's uses whole breast white meat chicken, which we feature in pizzas like Buffalo Chicken and Memphis BBQ. Add an order of Specialty Chicken for more goodness.",
            "diced tomatoes": "Diced tomatoes are perfect for Italian dishes, especially pizza. Add a little or a lot for a burst of freshness to your favorite Bianco's pizza.",
            "feta cheese": "Feta cheese from Bianco's is a delicious addition to our Specialty Pizzas, Stuffed Cheesy Bread, and pastas. Track your Spinach &amp; Feta pizza with Online.",
            "garlic": "Bianco's Pizza With the Great Taste of Garlic | Order Delivery Today",
            "green peppers": "Green peppers are delicious on pizza and sandwiches. Order the Philly Cheese Steak or Deluxe pizzas or build your own pie with extra green pepper crunch.",
            "habanero": "Our Sweet Mango Habanero sauce is surprisingly versatile, adding a tangy kick to sandwiches, chicken, wings, and even pizza, especially the Honolulu Hawaiian.",
            "ham": "Ham on pizza pairs well with other meats, spicy sauces, and fruit. Order online and prepare to go on a Hawaiian adventure when your pineapple and ham pizza arrives.",
            "italian sausage": "Spicy, rich Italian sausage is one of America's favorite pizza toppings. Order online your Bianco's pizza with Italian sausage for Pickup or Delivery.",
            "jalapeno peppers": "JalapeÃ±o peppers perk up any Bianco's pizza. They also add spice to our Oven Baked Sandwiches.",
            "mushrooms": "Mushrooms add mild, earthy flavor and tasty texture to pizzas of any variety, from meat to vegetarian. Try your favorite Bianco's pizza with mushrooms today.",
            "onions": "When added to pizzas, pastas, and sandwiches, onions highlight the flavors of meats, cheeses, and other vegetables. Order your Bianco's favorite with onions today.",
            "peppers": "All types of peppers make versatile and beloved pizza toppings. Try one of Bianco's pepper ful pizzas, like the Deluxe or Honolulu Hawaiian Specialty Pizzas, or build your own.",
            "pineapple": "Bianco's makes the Hawaiian pineapple pizza even better with our Honolulu Hawaiian pizza, which features traditional ham and pineapple as well as smoked bacon.",
            "provolone cheese": "Try provolone cheese on our Specialty Pizzas, like the Honolulu Hawaiian, or on our Oven Baked Sandwiches. You can also build your own pizza or pasta with provolone cheese.",
            "roasted red peppers": "Roasted red peppers pair well with meats, such as premium chicken, beef, and Philly steak. Add roasted red peppers to your Bianco's pizza or sandwich today!",
            "salami": "At Bianco's, salami adds subtle flavor to any pizza and takes center stage in our Italian sandwich. Order delivery and track your order via the Bianco's Tracker.",
            "spinach": "Spinach adds texture and flavor to a variety of Bianco's pizzas, as well as our Stuffed Cheesy Bread. Try the popular Spinach & Feta pizza today."
            }

        toppings.each do |name, desc|
            Topping.create(name: name, description: desc)
        end
    end
end
