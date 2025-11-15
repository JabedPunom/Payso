'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Users, 
  Shield, 
  Clock, 
  DollarSign, 
  CheckCircle, 
  AlertCircle, 
  ArrowRight, 
  Zap,
  Settings,
  UserPlus,
  Signature,
  Key,
  Network,
  TrendingUp,
  LayoutDashboard
} from 'lucide-react'
import Link from 'next/link'

export default function HowItWorksPage() {
  const features = [
    {
      icon: Users,
      title: "Multi-Employer Authorization System",
      description: "Revolutionary feature allowing main employers to authorize multiple addresses for testing and operational purposes",
      details: [
        "Main employer retains full administrative control",
        "Authorized employers can schedule payments and verify work",
        "Perfect for judges, auditors, and team testing",
        "Secure authorization management through blockchain",
        "Easy addition and removal of authorized addresses"
      ],
      color: "indigo"
    },
    {
      icon: Shield,
      title: "Secure Payment Scheduling",
      description: "Automated payment system with built-in security and verification mechanisms",
      details: [
        "Time-locked payments with configurable release dates",
        "Multi-signature verification for work completion",
        "Support for both USDC and EURC stablecoins",
        "Automated currency conversion via FX Router",
        "Immutable payment records on blockchain"
      ],
      color: "green"
    },
    {
      icon: Clock,
      title: "Flexible Release Scheduling",
      description: "Advanced scheduling system for automated payment distribution",
      details: [
        "Customizable release dates and times",
        "Recurring payment support for ongoing work",
        "Immediate or delayed payment options",
        "Automatic payment execution at release time",
        "Worker notification system for upcoming payments"
      ],
      color: "blue"
    },
    {
      icon: DollarSign,
      title: "Multi-Currency Support",
      description: "Comprehensive stablecoin integration with automatic conversion",
      details: [
        "Native USDC and EURC token support",
        "Real-time exchange rate integration",
        "Automatic currency conversion at payment time",
        "Flexible payout currency selection",
        "Competitive FX rates via decentralized routers"
      ],
      color: "purple"
    }
  ]

  const workflowSteps = [
    {
      step: 1,
      title: "Connect Wallet",
      description: "Connect your Web3 wallet to access the Payso platform",
      icon: Key,
      details: "Supports MetaMask, WalletConnect, and other major Web3 wallets"
    },
    {
      step: 2,
      title: "Employer Authorization",
      description: "Main employer authorizes testing addresses (for judges/auditors)",
      icon: UserPlus,
      details: "Use the Settings page to add authorized employer addresses"
    },
    {
      step: 3,
      title: "Schedule Payment",
      description: "Employers create payment schedules with amounts and release dates",
      icon: Clock,
      details: "Set payment amount, release date, currency, and work requirements"
    },
    {
      step: 4,
      title: "Work Verification",
      description: "For work-based payments, employers verify completion with signatures",
      icon: Signature,
      details: "Cryptographic signatures ensure secure work verification"
    },
    {
      step: 5,
      title: "Payment Release",
      description: "Payments are automatically released at scheduled times",
      icon: Zap,
      details: "Smart contracts handle automatic payment execution"
    },
    {
      step: 6,
      title: "Worker Claims",
      description: "Workers claim their payments in their preferred currency",
      icon: TrendingUp,
      details: "Automatic currency conversion if worker prefers different stablecoin"
    }
  ]

  const technicalFeatures = [
    {
      title: "Smart Contract Architecture",
      items: [
        "Built on Solidity 0.8.30 with Foundry framework",
        "Comprehensive test coverage with 95%+ code coverage",
        "Gas-optimized contracts for cost-effective operations",
        "Multi-signature work verification system",
        "Emergency pause and upgrade mechanisms"
      ]
    },
    {
      title: "Frontend Technology",
      items: [
        "Next.js 16 with React 18 and TypeScript",
        "Wagmi and Viem for Web3 integration",
        "Tailwind CSS for responsive design",
        "Shadcn/ui for consistent UI components",
        "Real-time blockchain data synchronization"
      ]
    },
    {
      title: "Security Features",
      items: [
        "Role-based access control (RBAC)",
        "Input validation and sanitization",
        "Reentrancy protection in all contracts",
        "Secure signature verification system",
        "Comprehensive error handling and logging"
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1A3D] to-[#162447]">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            How Payso Works
          </h1>
          <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover the revolutionary multi-employer payroll system that transforms how teams manage 
            payments, work verification, and financial operations on the blockchain.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-3 rounded-xl">
                <LayoutDashboard className="h-5 w-5 mr-2" />
                Start Using Payso
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-3 rounded-xl">
                <Users className="h-5 w-5 mr-2" />
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Revolutionary Features</h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Payso introduces groundbreaking innovations in decentralized payroll management
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              const colorClasses = {
                indigo: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
                green: "bg-green-500/10 text-green-400 border-green-500/20",
                blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
                purple: "bg-purple-500/10 text-purple-400 border-purple-500/20"
              }
              
              return (
                <Card key={index} className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-3 rounded-lg ${colorClasses[feature.color as keyof typeof colorClasses]}`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
                    </div>
                    <CardDescription className="text-white/70 text-base">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {feature.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-white/80">
                          <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Workflow Steps */}
      <section className="py-20 px-4 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Step-by-Step Workflow</h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Follow this simple process to leverage Payso's powerful payroll automation
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workflowSteps.map((step, index) => {
              const IconComponent = step.icon
              return (
                <div key={index} className="relative">
                  <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl p-6 border border-white/10">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                        {step.step}
                      </div>
                      <IconComponent className="h-6 w-6 text-indigo-400" />
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-2">{step.title}</h3>
                    <p className="text-white/80 text-sm mb-3">{step.description}</p>
                    <p className="text-white/60 text-xs">{step.details}</p>
                  </div>
                  {index < workflowSteps.length - 1 && (
                    <div className="hidden lg:block absolute -right-3 top-1/2 transform -translate-y-1/2">
                      <ArrowRight className="h-6 w-6 text-indigo-400" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Technical Deep Dive */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Technical Architecture</h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Built with cutting-edge blockchain technology and security best practices
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {technicalFeatures.map((section, index) => (
              <Card key={index} className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white text-lg">{section.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {section.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-white/80">
                        <Network className="h-4 w-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Multi-Employer Authorization Deep Dive */}
      <section className="py-20 px-4 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-white mb-6">
              Multi-Employer Authorization System
            </h2>
            <p className="text-white/70 text-lg leading-relaxed">
              Payso's flagship feature that solves the critical problem of allowing multiple 
              judges, auditors, and team members to test and operate the payroll system independently.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Main Employer Controls
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <Badge className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20">1</Badge>
                  <div>
                    <p className="text-white font-medium">Add Authorized Employers</p>
                    <p className="text-white/60 text-sm">Main employer can add any Ethereum address as an authorized employer</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20">2</Badge>
                  <div>
                    <p className="text-white font-medium">Remove Authorization</p>
                    <p className="text-white/60 text-sm">Instant removal of authorization when testing is complete</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20">3</Badge>
                  <div>
                    <p className="text-white font-medium">Maintain Admin Control</p>
                    <p className="text-white/60 text-sm">Full administrative privileges remain with main employer</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Authorized Employer Powers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <Badge className="bg-green-500/10 text-green-400 border-green-500/20">✓</Badge>
                  <div>
                    <p className="text-white font-medium">Schedule Payments</p>
                    <p className="text-white/60 text-sm">Create new payment schedules for workers</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge className="bg-green-500/10 text-green-400 border-green-500/20">✓</Badge>
                  <div>
                    <p className="text-white font-medium">Verify Work</p>
                    <p className="text-white/60 text-sm">Sign and verify completed work with cryptographic signatures</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge className="bg-green-500/10 text-green-400 border-green-500/20">✓</Badge>
                  <div>
                    <p className="text-white font-medium">View All Data</p>
                    <p className="text-white/60 text-sm">Access all payment and verification data</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testing Guide */}
      <section className="py-20 px-4 bg-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Testing Guide for Judges</h2>
            <p className="text-white/70 text-lg">
              Step-by-step instructions for judges and auditors testing the Payso system
            </p>
          </div>
          
          <div className="space-y-6">
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <span className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">1</span>
                  Get Authorized by Main Employer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-2 text-white/80 list-decimal list-inside">
                  <li>Provide your Ethereum address to the main employer</li>
                  <li>Main employer adds your address via Settings → Employer Authorization</li>
                  <li>Verify your authorization status using the "Check Authorization Status" feature</li>
                  <li>Connect your wallet to the Payso platform</li>
                </ol>
              </CardContent>
            </Card>
            
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <span className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">2</span>
                  Test Payment Scheduling
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-2 text-white/80 list-decimal list-inside">
                  <li>Navigate to "Schedule Payment" in the dashboard</li>
                  <li>Enter worker address and payment amount</li>
                  <li>Set release date and preferred currency (USDC/EURC)</li>
                  <li>Choose whether work verification is required</li>
                  <li>Submit transaction and confirm in wallet</li>
                </ol>
              </CardContent>
            </Card>
            
            <Card className="bg-white/5 border-white-10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <span className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">3</span>
                  Test Work Verification
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-2 text-white/80 list-decimal list-inside">
                  <li>Wait for worker to complete their task</li>
                  <li>Generate cryptographic signature for work completion</li>
                  <li>Submit verification signature to the blockchain</li>
                  <li>Confirm verification status in payment details</li>
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Revolutionize Your Payroll?
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            Join the future of decentralized payroll management with Payso's multi-employer 
            authorization system and automated payment scheduling.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-3 rounded-xl text-lg">
                <LayoutDashboard className="h-5 w-5 mr-2" />
                Launch Dashboard
              </Button>
            </Link>
            <Link href="/features">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-3 rounded-xl text-lg">
                <ArrowRight className="h-5 w-5 mr-2" />
                Explore Features
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}