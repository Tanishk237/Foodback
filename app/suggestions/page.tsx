"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { ArrowBigDown, ArrowBigUp, MessageSquare, ThumbsUp } from "lucide-react"

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters",
  }),
  category: z.string({
    required_error: "Please select a category",
  }),
})

// Mock data for suggestions
const suggestions = [
  {
    id: 1,
    title: "Add more vegetarian options",
    description:
      "We need more diverse vegetarian options beyond just salads. Consider adding vegetarian protein sources like tofu, tempeh, and seitan dishes.",
    category: "Menu",
    votes: { up: 78, down: 12 },
    comments: 15,
    status: "Under Review",
    createdAt: "3 days ago",
    createdBy: "Alex J.",
  },
  {
    id: 2,
    title: "Extend breakfast hours on weekends",
    description:
      "Many students wake up later on weekends. It would be great if breakfast hours could be extended until 11 AM on Saturdays and Sundays.",
    category: "Schedule",
    votes: { up: 92, down: 8 },
    comments: 23,
    status: "Approved",
    createdAt: "1 week ago",
    createdBy: "Taylor M.",
  },
  {
    id: 3,
    title: "Add a build-your-own stir fry station",
    description:
      "A station where students can select their own vegetables, protein, and sauce for a custom stir fry would be popular and accommodate many dietary preferences.",
    category: "Menu",
    votes: { up: 65, down: 15 },
    comments: 12,
    status: "Under Review",
    createdAt: "5 days ago",
    createdBy: "Jordan P.",
  },
  {
    id: 4,
    title: "Offer more gluten-free options",
    description:
      "There are many students with gluten sensitivities who struggle to find suitable options. Please consider adding more clearly labeled gluten-free choices.",
    category: "Menu",
    votes: { up: 42, down: 5 },
    comments: 8,
    status: "Pending",
    createdAt: "2 days ago",
    createdBy: "Sam T.",
  },
  {
    id: 5,
    title: "Theme nights once a month",
    description:
      "It would be fun to have themed dinner nights once a month (Italian, Mexican, Asian, etc.) with decorations and special menu items.",
    category: "Events",
    votes: { up: 87, down: 9 },
    comments: 19,
    status: "Approved",
    createdAt: "2 weeks ago",
    createdBy: "Morgan L.",
  },
]

// Mock data for most loved meals
const lovedMeals = [
  {
    id: 1,
    name: "Grilled Salmon with Quinoa",
    image: "/placeholder.svg?height=100&width=150",
    votes: 92,
    category: "Dinner",
  },
  {
    id: 2,
    name: "Vegetable Stir Fry",
    image: "/placeholder.svg?height=100&width=150",
    votes: 85,
    category: "Lunch",
  },
  {
    id: 3,
    name: "Breakfast Burrito",
    image: "/placeholder.svg?height=100&width=150",
    votes: 78,
    category: "Breakfast",
  },
  {
    id: 4,
    name: "Chicken Caesar Salad",
    image: "/placeholder.svg?height=100&width=150",
    votes: 72,
    category: "Lunch",
  },
]

export default function SuggestionsPage() {
  const { toast } = useToast()
  const [userVotes, setUserVotes] = useState<Record<number, "up" | "down" | null>>({})

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    toast({
      title: "Suggestion submitted",
      description: "Thank you for your suggestion! It has been submitted for review.",
    })
    form.reset()
  }

  const handleVote = (id: number, voteType: "up" | "down") => {
    setUserVotes((prev) => {
      // If user already voted this way, remove the vote
      if (prev[id] === voteType) {
        const newVotes = { ...prev }
        delete newVotes[id]
        return newVotes
      }
      // Otherwise set the vote
      return { ...prev, [id]: voteType }
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Under Review":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "Pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold">Suggestions & Community Voting</h1>
        <p className="text-muted-foreground">
          Share your ideas and vote on suggestions to improve the dining experience
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs defaultValue="browse" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="browse">Browse Suggestions</TabsTrigger>
              <TabsTrigger value="submit">Submit Suggestion</TabsTrigger>
            </TabsList>

            <TabsContent value="browse">
              <div className="space-y-6">
                {suggestions.map((suggestion) => (
                  <Card key={suggestion.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{suggestion.title}</CardTitle>
                          <CardDescription>
                            {suggestion.category} • Suggested {suggestion.createdAt} by {suggestion.createdBy}
                          </CardDescription>
                        </div>
                        <div
                          className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(suggestion.status)}`}
                        >
                          {suggestion.status}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{suggestion.description}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-2 border-t">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className={`h-8 w-8 ${userVotes[suggestion.id] === "up" ? "text-primary" : ""}`}
                            onClick={() => handleVote(suggestion.id, "up")}
                          >
                            <ArrowBigUp className="h-5 w-5" />
                          </Button>
                          <span className="text-sm">
                            {suggestion.votes.up + (userVotes[suggestion.id] === "up" ? 1 : 0)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className={`h-8 w-8 ${userVotes[suggestion.id] === "down" ? "text-primary" : ""}`}
                            onClick={() => handleVote(suggestion.id, "down")}
                          >
                            <ArrowBigDown className="h-5 w-5" />
                          </Button>
                          <span className="text-sm">
                            {suggestion.votes.down + (userVotes[suggestion.id] === "down" ? 1 : 0)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                          <span className="text-sm">{suggestion.comments}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="submit">
              <Card>
                <CardHeader>
                  <CardTitle>Submit a Suggestion</CardTitle>
                  <CardDescription>Share your ideas to improve the dining experience</CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Suggestion Title</FormLabel>
                            <FormControl>
                              <Input placeholder="Brief title for your suggestion" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="menu">Menu</SelectItem>
                                <SelectItem value="schedule">Schedule</SelectItem>
                                <SelectItem value="service">Service</SelectItem>
                                <SelectItem value="facilities">Facilities</SelectItem>
                                <SelectItem value="events">Events</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Describe your suggestion in detail..."
                                className="resize-none min-h-[150px]"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>Be specific and provide examples if possible</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit" className="w-full">
                        Submit Suggestion
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Most Loved Meals</CardTitle>
              <CardDescription>Top rated meals from the past week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lovedMeals.map((meal) => (
                  <div key={meal.id} className="flex items-center gap-4">
                    <img
                      src={meal.image || "/placeholder.svg"}
                      alt={meal.name}
                      className="w-16 h-16 rounded-md object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">{meal.name}</h4>
                      <p className="text-xs text-muted-foreground">{meal.category}</p>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <ThumbsUp className="h-4 w-4 text-primary" />
                      <span>{meal.votes}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" size="sm">
                View All Top Meals
              </Button>
            </CardFooter>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Suggestion Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="font-medium">Be specific:</span>
                  <span>Clearly describe what you're suggesting and why it would be beneficial.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-medium">Be constructive:</span>
                  <span>Focus on improvements rather than just complaints.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-medium">Be realistic:</span>
                  <span>Consider budget and implementation constraints.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-medium">Be respectful:</span>
                  <span>Use appropriate language and respect others' viewpoints.</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
