import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

export default function LegalResearchTool() {
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search functionality
    console.log("Searching...")
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Legal Research Tool</CardTitle>
          <CardDescription>Search for legal materials and filter results</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="mb-4">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search legal materials..."
                className="pl-4"
              />
            </div>
          </form>
          <div className="grid gap-4 md:grid-cols-4">
            {/* Filters Sidebar */}
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Filters</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Categories Filter */}
                  <div>
                    <Label>Categories</Label>
                    <ScrollArea className="h-[100px]">
                      {["Laws", "Case Studies", "Articles", "Statutes"].map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox id={category} />
                          <label
                            htmlFor={category}
                            className="text-sm font-medium leading-none"
                          >
                            {category}
                          </label>
                        </div>
                      ))}
                    </ScrollArea>
                  </div>

                  {/* Jurisdiction Filter */}
                  <div>
                    <Label>Jurisdiction</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select jurisdiction" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="federal">Federal</SelectItem>
                        <SelectItem value="state">State</SelectItem>
                        <SelectItem value="international">International</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Practice Area Filter */}
                  <div>
                    <Label>Practice Area</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select practice area" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="corporate">Corporate Law</SelectItem>
                        <SelectItem value="criminal">Criminal Law</SelectItem>
                        <SelectItem value="family">Family Law</SelectItem>
                        <SelectItem value="intellectual">Intellectual Property</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Search Results Area */}
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Search Results</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  {[{
                    title: "Smith v. Jones (2022)",
                    type: "Case Study",
                    snippet: "Landmark decision on contract law...",
                  },
                  {
                    title: "Intellectual Property Act of 2021",
                    type: "Law",
                    snippet: "Recent legislation on patent protection...",
                  },
                  {
                    title: "The Future of AI in Legal Practice",
                    type: "Article",
                    snippet: "Exploring the impact of artificial intelligence...",
                  },
                  {
                    title: "Brown v. Board of Education (1954)",
                    type: "Case Study",
                    snippet: "Historic civil rights case...",
                  },
                  {
                    title: "Data Privacy Regulations: A Comparative Study",
                    type: "Article",
                    snippet: "Analysis of data protection laws across jurisdictions...",
                  }].map((result, index) => (
                    <div key={index} className="mb-4 p-4 border rounded-md">
                      <h3 className="font-semibold">{result.title}</h3>
                      <Badge className="my-1">{result.type}</Badge>
                      <p className="text-sm text-muted-foreground">{result.snippet}</p>
                      <Button variant="link" className="p-0">View Full Document</Button>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
