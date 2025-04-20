"use client"

import type React from "react"

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
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, CheckCircle, Clock, Filter, Search } from "lucide-react"

const formSchema = z.object({
  issueType: z.string({
    required_error: "Please select an issue type",
  }),
  mealTime: z.string({
    required_error: "Please select when this issue occurred",
  }),
  title: z.string().min(5, {
    message: "Title must be at least 5 characters",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters",
  }),
  location: z.string().optional(),
  anonymous: z.boolean().default(false),
  image: z.string().optional(),
})

// Mock data for reported issues
const reportedIssues = [
  {
    id: 1,
    title: "Cold food served at lunch",
    type: "Temperature",
    mealTime: "Lunch",
    description: "The pasta was served cold today at lunch. Several students noticed the same issue.",
    status: "Open",
    priority: "Medium",
    createdAt: "2 hours ago",
    createdBy: "Anonymous",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "Undercooked chicken",
    type: "Food Safety",
    mealTime: "Dinner",
    description: "The chicken served at dinner was undercooked in the center. This is a serious health concern.",
    status: "In Progress",
    priority: "High",
    createdAt: "1 day ago",
    createdBy: "John D.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    title: "Missing vegetarian options",
    type: "Menu",
    mealTime: "Breakfast",
    description: "There were no vegetarian options available at breakfast today.",
    status: "Resolved",
    priority: "Medium",
    createdAt: "3 days ago",
    createdBy: "Sarah M.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    title: "Dirty utensils",
    type: "Hygiene",
    mealTime: "Lunch",
    description: "Several forks and spoons were not properly cleaned.",
    status: "Open",
    priority: "Medium",
    createdAt: "5 hours ago",
    createdBy: "Anonymous",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 5,
    title: "Long waiting time",
    type: "Service",
    mealTime: "Dinner",
    description: "The waiting time for dinner was over 30 minutes today.",
    status: "In Progress",
    priority: "Low",
    createdAt: "2 days ago",
    createdBy: "Mike T.",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function IssuesPage() {
  const { toast } = useToast()
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [selectedIssue, setSelectedIssue] = useState<number | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      anonymous: false,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    toast({
      title: "Issue reported",
      description: "Thank you for reporting this issue. We'll look into it right away.",
    })
    form.reset()
    setImagePreview(null)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
        form.setValue("image", reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "In Progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "Resolved":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "High":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "Medium":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "Low":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      default:
        return null
    }
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold">Issue Reporting</h1>
        <p className="text-muted-foreground">Report food-related issues to help us improve the dining experience</p>
      </div>

      <Tabs defaultValue="report" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="report">Report an Issue</TabsTrigger>
          <TabsTrigger value="view">View Reported Issues</TabsTrigger>
        </TabsList>

        <TabsContent value="report">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Report a Food Issue</CardTitle>
              <CardDescription>Please provide details about the issue you encountered</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="issueType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Issue Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select issue type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="temperature">Temperature (Cold/Hot)</SelectItem>
                              <SelectItem value="quality">Food Quality</SelectItem>
                              <SelectItem value="safety">Food Safety</SelectItem>
                              <SelectItem value="hygiene">Hygiene</SelectItem>
                              <SelectItem value="service">Service</SelectItem>
                              <SelectItem value="menu">Menu Options</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="mealTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Meal Time</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="When did this occur?" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="breakfast">Breakfast</SelectItem>
                              <SelectItem value="lunch">Lunch</SelectItem>
                              <SelectItem value="dinner">Dinner</SelectItem>
                              <SelectItem value="snack">Snack</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Issue Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Brief title of the issue" {...field} />
                        </FormControl>
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
                            placeholder="Please describe the issue in detail..."
                            className="resize-none min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Where did this issue occur?" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Upload Image (Optional)</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              handleImageChange(e)
                              field.onChange(e)
                            }}
                            className="mt-2"
                          />
                        </FormControl>
                        <FormDescription>Upload an image to help us better understand the issue</FormDescription>
                        {imagePreview && (
                          <div className="mt-4">
                            <img
                              src={imagePreview || "/placeholder.svg"}
                              alt="Preview"
                              className="max-h-48 rounded-md"
                            />
                          </div>
                        )}
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="anonymous"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Submit Anonymously</FormLabel>
                          <FormDescription>Your identity will not be revealed to the mess staff</FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full">
                    Report Issue
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="view">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search issues..." className="w-full pl-8" />
              </div>
              <Button variant="outline" size="sm" className="w-full sm:w-auto">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>

            <div className="space-y-4">
              {reportedIssues.map((issue) => (
                <Card key={issue.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{issue.title}</CardTitle>
                        <CardDescription>
                          {issue.type} • {issue.mealTime} • Reported {issue.createdAt} by {issue.createdBy}
                        </CardDescription>
                      </div>
                      <div className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(issue.status)}`}>
                        {issue.status}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{issue.description}</p>

                    {selectedIssue === issue.id && (
                      <div className="mt-4">
                        <img
                          src={issue.image || "/placeholder.svg"}
                          alt={issue.title}
                          className="rounded-md w-full max-h-64 object-cover"
                        />
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between pt-0">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      {getPriorityIcon(issue.priority)}
                      <span>{issue.priority} Priority</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedIssue(selectedIssue === issue.id ? null : issue.id)}
                    >
                      {selectedIssue === issue.id ? "Hide Details" : "View Details"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
