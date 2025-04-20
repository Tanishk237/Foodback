"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

// Mock data for meals
const meals = [
  { id: "1", name: "Omelette" },
  { id: "2", name: "Oats" },
  { id: "3", name: "Pancakes" },
  { id: "4", name: "Salad" },
  { id: "5", name: "White Sauce Pasta" },
  { id: "6", name: "Yellow Dal" },
  { id: "7", name: "Grilled Potato" },
  { id: "8", name: "Vegetable Curry" },
  { id: "9", name: "Stir Fry" },
]

const formSchema = z.object({
  mealId: z.string({
    required_error: "Please select a meal to rate",
  }),
  taste: z.string({
    required_error: "Please rate the taste",
  }),
  hygiene: z.string({
    required_error: "Please rate the hygiene",
  }),
  quality: z.string({
    required_error: "Please rate the quality",
  }),
  variety: z.string({
    required_error: "Please rate the variety",
  }),
  comments: z.string().optional(),
  emoji: z.string().optional(),
})

const emojiOptions = [
  { value: "😋", label: "Delicious" },
  { value: "😊", label: "Good" },
  { value: "😐", label: "Okay" },
  { value: "😕", label: "Disappointed" },
  { value: "🤢", label: "Bad" },
]

export default function FeedbackPage() {
  const searchParams = useSearchParams()
  const mealId = searchParams.get("meal")
  const { toast } = useToast()
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mealId: mealId || "",
      taste: "",
      hygiene: "",
      quality: "",
      variety: "",
      comments: "",
      emoji: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    toast({
      title: "Feedback submitted",
      description: "Thank you for your feedback!",
    })
    form.reset()
    setSelectedEmoji(null)
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold">Meal Feedback</h1>
        <p className="text-muted-foreground">Your feedback helps us improve the dining experience for everyone</p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Rate Your Meal</CardTitle>
          <CardDescription>Please rate your dining experience and provide any additional comments</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="mealId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Meal</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a meal to rate" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {meals.map((meal) => (
                          <SelectItem key={meal.id} value={meal.id}>
                            {meal.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="taste"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Taste</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          {[5, 4, 3, 2, 1].map((rating) => (
                            <FormItem key={rating} className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value={rating.toString()} />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {rating} {rating === 5 ? "(Excellent)" : rating === 1 ? "(Poor)" : ""}
                              </FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="hygiene"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Hygiene</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          {[5, 4, 3, 2, 1].map((rating) => (
                            <FormItem key={rating} className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value={rating.toString()} />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {rating} {rating === 5 ? "(Excellent)" : rating === 1 ? "(Poor)" : ""}
                              </FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="quality"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Quality</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          {[5, 4, 3, 2, 1].map((rating) => (
                            <FormItem key={rating} className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value={rating.toString()} />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {rating} {rating === 5 ? "(Excellent)" : rating === 1 ? "(Poor)" : ""}
                              </FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="variety"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Variety</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          {[5, 4, 3, 2, 1].map((rating) => (
                            <FormItem key={rating} className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value={rating.toString()} />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {rating} {rating === 5 ? "(Excellent)" : rating === 1 ? "(Poor)" : ""}
                              </FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="emoji"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>How did you feel about this meal?</FormLabel>
                    <FormDescription>Select an emoji that best represents your experience</FormDescription>
                    <div className="flex flex-wrap gap-4 mt-2">
                      {emojiOptions.map((emoji) => (
                        <Button
                          key={emoji.value}
                          type="button"
                          variant={selectedEmoji === emoji.value ? "default" : "outline"}
                          className="text-2xl h-12 w-12 p-0"
                          onClick={() => {
                            setSelectedEmoji(emoji.value)
                            field.onChange(emoji.value)
                          }}
                        >
                          {emoji.value}
                        </Button>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="comments"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Comments</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Share your thoughts about this meal..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Submit Feedback
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
