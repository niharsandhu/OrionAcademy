
"use client";
import { useState } from "react"
import { UserCog, Mail, Lock } from 'lucide-react'
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Registration() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    role: "",
    name: "",
    group: "",
    rollNo: "",
    year: "",
    mentorName: "",
    clubName: "",
    branch: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSelectChange = (name, value) => {
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Sending registration data:', credentials);
      
      const response = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
      });
  
      // Log the raw response
      const responseText = await response.text();
      console.log('Raw response:', responseText);
  
      // Try to parse as JSON
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('Failed to parse response as JSON:', parseError);
        throw new Error('Server response was not valid JSON');
      }
  
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
  
      // Store the token in localStorage
      localStorage.setItem('token', data.token);
      
      // Redirect based on role
      switch (credentials.role) {
        case 'student':
          router.push('/student/dashboard');
          break;
        case 'mentor':
          router.push('/mentor/dashboard');
          break;
        case 'organizer':
          router.push('/organizer/dashboard');
          break;
        default:
          router.push('/dashboard');
      }
    } catch (error) {
      console.error('Registration error:', error);
      // Add better error display
      alert(`Registration failed: ${error.message}`);
    }
  };

  const renderRoleSpecificFields = () => {
    switch (credentials.role) {
      case "mentor":
        return (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="group">Group</Label>
              <Input
                id="group"
                name="group"
                value={credentials.group}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        )

      case "student":
        return (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="rollNo">Roll Number</Label>
              <Input
                id="rollNo"
                name="rollNo"
                value={credentials.rollNo}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="group">Group</Label>
              <Input
                id="group"
                name="group"
                value={credentials.group}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                name="year"
                type="number"
                min="1"
                max="4"
                value={credentials.year}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mentorName">Mentor Name</Label>
              <Input
                id="mentorName"
                name="mentorName"
                value={credentials.mentorName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        )

      case "organizer":
        return (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="clubName">Club Name</Label>
              <Input
                id="clubName"
                name="clubName"
                value={credentials.clubName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="branch">Branch</Label>
              <Input
                id="branch"
                name="branch"
                value={credentials.branch}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="h-screen bg-background px-4 max-w-4xl mx-auto mb-12 flex flex-col items-center justify-center">
      <Card className="border shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-4">
            <UserCog className="h-8 w-8 text-primary" />
            <CardTitle className="text-2xl">Sign Up</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={credentials.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={credentials.email}
                      onChange={handleChange}
                      className="pl-9"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={credentials.password}
                      onChange={handleChange}
                      className="pl-9"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select 
                    name="role" 
                    onValueChange={(value) => handleSelectChange("role", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mentor">Mentor</SelectItem>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="organizer">Event Organizer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Role Specific Fields */}
            {credentials.role && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Additional Information</h2>
                {renderRoleSpecificFields()}
              </div>
            )}

            <div className="flex flex-col gap-4">
              <Button type="submit" size="lg" className="w-full">
                Create Account
              </Button>
              <p className="text-center text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}