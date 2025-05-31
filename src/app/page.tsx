import Navbar from "@/components/nav/Navbar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Scale, Shield, BookOpen, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-gradient-to-b from-background to-secondary/5 min-h-screen w-screen flex flex-col items-center">
      <Navbar />

      <div className="max-w-[80rem]">
        {/* Hero Section */}
        <section className="container px-4 pt-16 pb-8 md:pt-24 md:pb-12 flex flex-col items-center">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm bg-background shadow-sm mb-4">
              <span className="text-muted-foreground">Your Personal Legal Assistant</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Legal Guidance Made Simple & Accessible
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              MishpatBot provides instant, reliable legal information and resources tailored to your specific needs. Navigate complex laws with an AI assistant designed to make legal knowledge more accessible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild size="lg" className="gap-2">
                <Link href="/chat">
                  Start Chatting <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="#features">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="container px-4 py-16 md:py-24 bg-primary/10 rounded-3xl shadow-lg border">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose MishpatBot</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Our AI is specialized in legal assistance, providing reliable information with these key features</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-card rounded-xl p-6 shadow-md border hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                <Scale className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Legal Knowledge</h3>
              <p className="text-muted-foreground">Access comprehensive legal information tailored to your specific situation and questions</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-card rounded-xl p-6 shadow-md border hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Privacy Focused</h3>
              <p className="text-muted-foreground">Your conversations and legal concerns remain private and secure with our encrypted system</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-card rounded-xl p-6 shadow-md border hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Plain Language</h3>
              <p className="text-muted-foreground">Complex legal concepts translated into easy-to-understand explanations for everyone</p>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="bg-secondary/10 py-16 md:py-24">
          <div className="container px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How MishpatBot Can Help You</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Real-world applications of our legal AI assistant</p>
            </div>

            <div className="space-y-8 max-w-4xl mx-auto">
              {/* Case 1 */}
              <div className="bg-card rounded-xl p-6 shadow-md border flex flex-col md:flex-row gap-6">
                <div className="md:w-2/3">
                  <h3 className="text-xl font-semibold mb-2">Understanding Legal Documents</h3>
                  <p className="text-muted-foreground">Get help understanding contracts, agreements, and other legal documents without the legal jargon.</p>
                </div>
                <div className="md:w-1/3 flex items-center justify-center">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <MessageSquare className="h-8 w-8 text-primary" />
                  </div>
                </div>
              </div>

              {/* Case 2 */}
              <div className="bg-card rounded-xl p-6 shadow-md border flex flex-col md:flex-row gap-6">
                <div className="md:w-2/3">
                  <h3 className="text-xl font-semibold mb-2">Researching Legal Questions</h3>
                  <p className="text-muted-foreground">Quickly find answers to your legal questions with accurate, up-to-date information.</p>
                </div>
                <div className="md:w-1/3 flex items-center justify-center">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <BookOpen className="h-8 w-8 text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container px-4 py-16 md:py-24">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 md:p-12 shadow-xl border">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">Start Your Legal Journey Today</h2>
              <p className="text-lg">Get access to our specialized AI legal assistant and navigate the complexities of law with confidence.</p>
              <Separator className="my-6" />
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="gap-2">
                  <Link href="/chat">
                    Chat with MishpatBot <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <footer className="bg-background py-8">
          <div className="container px-4 text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} MishpatBot. All rights reserved.</p>
            <div className="flex justify-center space-x-4 mt-4">
              <Link href="/privacy-policy" className="hover:underline">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="hover:underline">
                Terms of Service
              </Link>
              <Link href="/contact" className="hover:underline">
                Contact Us
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}