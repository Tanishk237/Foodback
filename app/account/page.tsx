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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Clock, FileText, Settings, User } from "lucide-react"

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  bio: z.string().optional(),
  studentId: z.string().min(5, {
    message: "Student ID must be at least 5 characters.",
  }),
})

const notificationFormSchema = z.object({
  mealReminders: z.boolean().default(true),
  feedbackReminders: z.boolean().default(true),
  menuUpdates: z.boolean().default(true),
  specialMeals: z.boolean().default(true),
  messClosures: z.boolean().default(true),
  emailNotifications: z.boolean().default(false),
})

const dietaryFormSchema = z.object({
  dietaryPreferences: z.string().optional(),
  allergies: z.string().optional(),
  otherRestrictions: z.string().optional(),
})

// Mock user data
const userData = {
  name: "Tanishk Varshney",
  email: "e23cseu0909@edu.in",
  bio: "Computer Science student with a passion for good food.",
  studentId: "e23cseu0909",
  avatar: "/placeholder.svg?height=100&width=100",
  dietaryPreferences: "Non-Vegetarian",
  allergies: "None",
  otherRestrictions: "",
}

// Mock activity data
const activityData = [
  {
    id: 1,
    type: "feedback",
    title: "Gave feedback on White Sauce Pasta",
    rating: 4,
    date: "Today, 12:30 PM",
  },
  {
    id: 2,
    type: "issue",
    title: "Reported issue: Cold food at lunch",
    status: "In Progress",
    date: "Yesterday, 1:15 PM",
  },
  {
    id: 3,
    type: "suggestion",
    title: "Suggested: More vegan breakfast options",
    votes: 12,
    date: "3 days ago",
  },
  {
    id: 4,
    type: "feedback",
    title: "Gave feedback on Grilled Salmon",
    rating: 5,
    date: "Last week",
  },
  {
    id: 5,
    type: "suggestion",
    title: "Upvoted: Extended weekend breakfast hours",
    date: "Last week",
  },
]

export default function AccountPage() {
  const { toast } = useToast()
  const [avatarPreview, setAvatarPreview] = useState<string | null>(userData.avatar)

  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: userData.name,
      email: userData.email,
      bio: userData.bio,
      studentId: userData.studentId,
    },
  })

  const notificationForm = useForm<z.infer<typeof notificationFormSchema>>({
    resolver: zodResolver(notificationFormSchema),
    defaultValues: {
      mealReminders: true,
      feedbackReminders: true,
      menuUpdates: true,
      specialMeals: true,
      messClosures: true,
      emailNotifications: false,
    },
  })

  const dietaryForm = useForm<z.infer<typeof dietaryFormSchema>>({
    resolver: zodResolver(dietaryFormSchema),
    defaultValues: {
      dietaryPreferences: userData.dietaryPreferences,
      allergies: userData.allergies,
      otherRestrictions: userData.otherRestrictions,
    },
  })

  function onProfileSubmit(values: z.infer<typeof profileFormSchema>) {
    console.log(values)
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated.",
    })
  }

  function onNotificationSubmit(values: z.infer<typeof notificationFormSchema>) {
    console.log(values)
    toast({
      title: "Notification preferences updated",
      description: "Your notification preferences have been saved.",
    })
  }

  function onDietarySubmit(values: z.infer<typeof dietaryFormSchema>) {
    console.log(values)
    toast({
      title: "Dietary preferences updated",
      description: "Your dietary preferences have been saved.",
    })
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "feedback":
        return <FileText className="h-4 w-4" />
      case "issue":
        return <Bell className="h-4 w-4" />
      case "suggestion":
        return <Settings className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold">Account</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="dietary">Dietary Preferences</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your personal information and profile settings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row gap-8 items-start mb-8">
                    <div className="flex flex-col items-center gap-4">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={avatarPreview || ""} alt={userData.name} />
                        <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col items-center gap-2">
                        <Input
                          type="file"
                          accept="image/*"
                          id="avatar"
                          className="w-full max-w-xs"
                          onChange={handleAvatarChange}
                        />
                        <p className="text-xs text-muted-foreground">JPG, PNG or GIF. Max size 2MB.</p>
                      </div>
                    </div>
                    <Form {...profileForm}>
                      <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6 flex-1">
                        <FormField
                          control={profileForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={profileForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={profileForm.control}
                          name="studentId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Student ID</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={profileForm.control}
                          name="bio"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Bio</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Tell us a little about yourself"
                                  className="resize-none"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit">Update Profile</Button>
                      </form>
                    </Form>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Customize which notifications you receive and how</CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...notificationForm}>
                    <form onSubmit={notificationForm.handleSubmit(onNotificationSubmit)} className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Notification Types</h3>
                        <div className="space-y-4">
                          <FormField
                            control={notificationForm.control}
                            name="mealReminders"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base">Meal Reminders</FormLabel>
                                  <FormDescription>Receive reminders before meal times</FormDescription>
                                </div>
                                <FormControl>
                                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={notificationForm.control}
                            name="feedbackReminders"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base">Feedback Reminders</FormLabel>
                                  <FormDescription>Receive reminders to provide feedback after meals</FormDescription>
                                </div>
                                <FormControl>
                                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={notificationForm.control}
                            name="menuUpdates"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base">Menu Updates</FormLabel>
                                  <FormDescription>Receive notifications about menu changes</FormDescription>
                                </div>
                                <FormControl>
                                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={notificationForm.control}
                            name="specialMeals"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base">Special Meals</FormLabel>
                                  <FormDescription>Receive notifications about special or themed meals</FormDescription>
                                </div>
                                <FormControl>
                                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={notificationForm.control}
                            name="messClosures"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base">Mess Closures</FormLabel>
                                  <FormDescription>
                                    Receive notifications about mess closures or schedule changes
                                  </FormDescription>
                                </div>
                                <FormControl>
                                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Notification Channels</h3>
                        <FormField
                          control={notificationForm.control}
                          name="emailNotifications"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">Email Notifications</FormLabel>
                                <FormDescription>
                                  Receive notifications via email in addition to in-app notifications
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>

                      <Button type="submit">Save Preferences</Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="dietary">
              <Card>
                <CardHeader>
                  <CardTitle>Dietary Preferences</CardTitle>
                  <CardDescription>
                    Set your dietary preferences to help us provide better meal recommendations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...dietaryForm}>
                    <form onSubmit={dietaryForm.handleSubmit(onDietarySubmit)} className="space-y-6">
                      <FormField
                        control={dietaryForm.control}
                        name="dietaryPreferences"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Dietary Preferences</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select your dietary preference" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="none">No Specific Preference</SelectItem>
                                <SelectItem value="vegetarian">Vegetarian</SelectItem>
                                <SelectItem value="vegan">Vegan</SelectItem>
                                <SelectItem value="pescatarian">Pescatarian</SelectItem>
                                <SelectItem value="keto">Keto</SelectItem>
                                <SelectItem value="paleo">Paleo</SelectItem>
                                <SelectItem value="lowCarb">Low Carb</SelectItem>
                                <SelectItem value="highProtein">High Protein</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>This helps us highlight meals that match your preferences</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={dietaryForm.control}
                        name="allergies"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Allergies</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="List any food allergies you have..."
                                className="resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              This information helps us warn you about potential allergens
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={dietaryForm.control}
                        name="otherRestrictions"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Other Dietary Restrictions</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="List any other dietary restrictions or preferences..."
                                className="resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit">Save Preferences</Button>
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
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span>Your Profile</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.name} />
                  <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold">{userData.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{userData.email}</p>
                <p className="text-sm text-muted-foreground">ID: {userData.studentId}</p>
                <div className="w-full border-t my-4"></div>
                <div className="w-full text-left">
                  <h4 className="font-medium mb-2">Dietary Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Preference:</span>
                      <span>{userData.dietaryPreferences}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Allergies:</span>
                      <span>{userData.allergies || "None"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>Recent Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activityData.map((activity) => (
                  <div key={activity.id} className="flex gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" size="sm">
                View All Activity
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
