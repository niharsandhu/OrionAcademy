"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { subject: "DSA", attendance: 275, fill: "var(--color-chrome)" },
  { subject: "Java", attendance: 200, fill: "var(--color-safari)" },
  { subject: "OOSE", attendance: 187, fill: "var(--color-firefox)" },
  { subject: "Python", attendance: 173, fill: "var(--color-edge)" },
  { subject: "CyberSecurity", attendance: 90, fill: "var(--color-other)" },
]
 
const chartConfig = {
  attendance: {
    label: "Attendance",
  },
  DSA: {
    label: "DSA",
    color: "hsl(var(--chart-1))",
  },
  Java: {
    label: "Java",
    color: "hsl(var(--chart-2))",
  },
  OOSE: {
    label: "OOSE",
    color: "hsl(var(--chart-3))",
  },
  Python: {
    label: "Python",
    color: "hsl(var(--chart-4))",
  },
  CyberSecurity: {
    label: "Cyber Security",
    color: "hsl(var(--chart-5))",
  },
}

export function ChartComponent() {
  return (
    <Card className='bg-zinc-900 border-none text-white'>
      <CardHeader>
        <CardTitle>Marks Trend</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="subject"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value]?.label
              }
            />
            <XAxis dataKey="attendance" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent labelFormatter={() => "Attendance"} />}
            />
            <Bar dataKey="attendance" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total attendance for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
