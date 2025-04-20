import Link from "next/link"
import { ArrowRight, ChevronRight, Star, ThumbsUp, Utensils } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Revolutionize Your Campus Dining Experience
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Foodback integrates student feedback, nutrition insights, and issue reporting into a unified system
                  for better campus dining.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/meals">
                  <Button size="lg">
                    View Today's Meals
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/feedback">
                  <Button size="lg" variant="outline">
                    Give Feedback
                  </Button>
                </Link>
              </div>
            </div>
            <img
              src="https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNhbXB1cyUyMGRpbmluZ3xlbnwwfHwwfHx8MA%3D%3D"
              alt="Campus dining hall"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
            />
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Core Features</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Foodback offers a comprehensive set of features to improve your dining experience
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
            <Card>
              <CardHeader className="pb-2">
                <Star className="h-6 w-6 text-primary mb-2" />
                <CardTitle>Daily Meal Feedback</CardTitle>
                <CardDescription>
                  Rate food on taste, hygiene, quality, and variety with emoji-based feedback
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Link href="/feedback" className="text-sm text-primary flex items-center">
                  Give Feedback <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <ThumbsUp className="h-6 w-6 text-primary mb-2" />
                <CardTitle>Community Voting</CardTitle>
                <CardDescription>Upvote or downvote meals and see "Most Loved Meals of the Week"</CardDescription>
              </CardHeader>
              <CardFooter>
                <Link href="/suggestions" className="text-sm text-primary flex items-center">
                  View Suggestions <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <Utensils className="h-6 w-6 text-primary mb-2" />
                <CardTitle>Nutrition Insights</CardTitle>
                <CardDescription>
                  View nutrition indicators next to each meal highlighting healthier options
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Link href="/meals" className="text-sm text-primary flex items-center">
                  View Meals <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
