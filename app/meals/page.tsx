import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Mock data for meals with real images
const meals = {
  breakfast: [
    {
      id: 1,
      name: "Omelette",
      description: "Fresh vegetable omelette with whole wheat toast",
      image:
        "https://images.unsplash.com/photo-1510693206972-df098062cb71?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8b21lbGV0dGV8ZW58MHx8MHx8fDA%3D",
      nutrition: {
        calories: 320,
        protein: "18g",
        carbs: "24g",
        fat: "16g",
      },
      tags: ["High Protein", "Vegetarian"],
      votes: { up: 45, down: 8 },
      comments: 12,
    },
    {
      id: 2,
      name: "Oats",
      description: "Steel-cut oats with fresh seasonal fruits and honey",
      image:
        "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8b2F0bWVhbHxlbnwwfHwwfHx8MA%3D%3D",
      nutrition: {
        calories: 280,
        protein: "8g",
        carbs: "48g",
        fat: "6g",
      },
      tags: ["Low Fat", "Vegan"],
      votes: { up: 38, down: 5 },
      comments: 9,
    },
    {
      id: 3,
      name: "Pancakes",
      description: "Fluffy pancakes with maple syrup and fresh berries",
      image:
        "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFuY2FrZXN8ZW58MHx8MHx8fDA%3D",
      nutrition: {
        calories: 420,
        protein: "10g",
        carbs: "68g",
        fat: "12g",
      },
      tags: ["High Carb"],
      votes: { up: 52, down: 12 },
      comments: 15,
    },
  ],
  lunch: [
    {
      id: 4,
      name: "Grilled Chicken Salad",
      description: "Grilled chicken breast with mixed greens and vinaigrette",
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNhbGFkfGVufDB8fDB8fHww",
      nutrition: {
        calories: 380,
        protein: "32g",
        carbs: "18g",
        fat: "20g",
      },
      tags: ["High Protein", "Low Carb"],
      votes: { up: 62, down: 7 },
      comments: 18,
    },
    {
      id: 5,
      name: "White Sauce Pasta",
      description: "Whole wheat pasta with seasonal vegetables and tomato sauce",
      image:
        "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFzdGF8ZW58MHx8MHx8fDA%3D",
      nutrition: {
        calories: 420,
        protein: "14g",
        carbs: "72g",
        fat: "10g",
      },
      tags: ["Vegetarian", "High Carb"],
      votes: { up: 41, down: 14 },
      comments: 11,
    },
    {
      id: 6,
      name: "Vegetable Dal",
      description: "Hearty lentil soup with vegetables and herbs",
      image:
        "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGVudGlsJTIwc291cHxlbnwwfHwwfHx8MA%3D%3D",
      nutrition: {
        calories: 280,
        protein: "16g",
        carbs: "42g",
        fat: "6g",
      },
      tags: ["Vegan", "Low Fat"],
      votes: { up: 35, down: 8 },
      comments: 7,
    },
  ],
  dinner: [
    {
      id: 7,
      name: "Grilled Potato",
      description: "Grilled Potato with roasted vegetables and quinoa",
      image:
        "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FsbW9ufGVufDB8fDB8fHww",
      nutrition: {
        calories: 450,
        protein: "36g",
        carbs: "32g",
        fat: "22g",
      },
      tags: ["High Protein", "Omega-3"],
      votes: { up: 58, down: 6 },
      comments: 14,
    },
    {
      id: 8,
      name: "Vegetable Curry",
      description: "Mixed vegetable curry with steamed rice",
      image:
        "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmVnZXRhYmxlJTIwY3Vycnl8ZW58MHx8MHx8fDA%3D",
      nutrition: {
        calories: 380,
        protein: "12g",
        carbs: "64g",
        fat: "10g",
      },
      tags: ["Vegan", "Gluten-Free"],
      votes: { up: 47, down: 9 },
      comments: 13,
    },
    {
      id: 9,
      name: "Stir Fry",
      description: "Chicken stir fry with vegetables and brown rice",
      image:
        "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpY2tlbiUyMHN0aXIlMjBmcnl8ZW58MHx8MHx8fDA%3D",
      nutrition: {
        calories: 420,
        protein: "30g",
        carbs: "48g",
        fat: "14g",
      },
      tags: ["High Protein", "Low Fat"],
      votes: { up: 51, down: 11 },
      comments: 16,
    },
  ],
}

export default function MealsPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold">Today's Meals</h1>
        <p className="text-muted-foreground">Browse today's menu with nutrition information and community ratings</p>
      </div>

      <Tabs defaultValue="breakfast" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="breakfast">Breakfast</TabsTrigger>
          <TabsTrigger value="lunch">Lunch</TabsTrigger>
          <TabsTrigger value="dinner">Dinner</TabsTrigger>
        </TabsList>

        {Object.entries(meals).map(([mealTime, mealItems]) => (
          <TabsContent key={mealTime} value={mealTime} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mealItems.map((meal) => (
                <Card key={meal.id} className="overflow-hidden">
                  <img src={meal.image || "/placeholder.svg"} alt={meal.name} className="w-full h-48 object-cover" />
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle>{meal.name}</CardTitle>
                    </div>
                    <CardDescription>{meal.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {meal.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-sm">
                      <div className="flex flex-col">
                        <span className="font-medium">Calories</span>
                        <span>{meal.nutrition.calories}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium">Protein</span>
                        <span>{meal.nutrition.protein}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium">Carbs</span>
                        <span>{meal.nutrition.carbs}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium">Fat</span>
                        <span>{meal.nutrition.fat}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ThumbsUp className="h-4 w-4" />
                        </Button>
                        <span className="text-sm">{meal.votes.up}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ThumbsDown className="h-4 w-4" />
                        </Button>
                        <span className="text-sm">{meal.votes.down}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                        <span className="text-sm">{meal.comments}</span>
                      </div>
                    </div>
                    <Link href={`/feedback?meal=${meal.id}`}>
                      <Button variant="outline" size="sm">
                        Rate Meal
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
