"use client"

import type React from "react"

import { ArrowRight, Upload, DollarSign, BarChart } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"

export function HowItWorks() {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
  const [valuationDialogOpen, setValuationDialogOpen] = useState(false)
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const steps = [
    {
      title: "Upload License",
      description: "Submit your software license details through our secure portal",
      icon: Upload,
      action: () => setUploadDialogOpen(true),
    },
    {
      title: "Get Valuation",
      description: "Receive a competitive market valuation within 24 hours",
      icon: BarChart,
      action: () => setValuationDialogOpen(true),
    },
    {
      title: "Get Paid",
      description: "Accept our offer and receive payment via your preferred method",
      icon: DollarSign,
      action: () => setPaymentDialogOpen(true),
    },
  ]

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "License uploaded successfully!",
        description: "We'll review your license and provide a valuation within 24 hours.",
      })
      setIsSubmitting(false)
      setUploadDialogOpen(false)
      setSelectedFile(null)
    }, 1500)
  }

  const handleValuationSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Valuation request submitted!",
        description: "We'll analyze your license details and provide a valuation within 24 hours.",
      })
      setIsSubmitting(false)
      setValuationDialogOpen(false)
    }, 1500)
  }

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Payment details submitted!",
        description: "We'll process your payment within 3 business days.",
      })
      setIsSubmitting(false)
      setPaymentDialogOpen(false)
    }, 1500)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">How It Works</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our streamlined process makes selling your unused software licenses simple and efficient
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-col items-center text-center relative cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={step.action}
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 300, delay: index * 0.2 }}
                className="w-16 h-16 mb-6 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800"
              >
                <step.icon className="w-8 h-8 text-gray-900 dark:text-white" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
              <Button variant="link" className="mt-2" onClick={step.action}>
                {step.title} Now
              </Button>

              {index < steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 + index * 0.2 }}
                  className="hidden md:block absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2"
                >
                  <ArrowRight className="w-6 h-6 text-gray-400" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Upload License Dialog */}
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upload License</DialogTitle>
            <DialogDescription>Upload your software license details to get started.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUploadSubmit} className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="licenseType">License Type</Label>
              <Input id="licenseType" placeholder="e.g., Microsoft Office, Adobe Creative Cloud" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="licenseKey">License Key</Label>
              <Input id="licenseKey" placeholder="Enter your license key" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="licenseFile">License File (Optional)</Label>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="licenseFile"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-3 text-gray-500 dark:text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">PDF, PNG, JPG or TXT (MAX. 10MB)</p>
                  </div>
                  <input
                    id="licenseFile"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept=".pdf,.png,.jpg,.jpeg,.txt"
                  />
                </label>
              </div>
              {selectedFile && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Selected file: {selectedFile.name}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="additionalInfo">Additional Information</Label>
              <Textarea id="additionalInfo" placeholder="Provide any additional details about your license" rows={3} />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setUploadDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Uploading..." : "Upload License"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Get Valuation Dialog */}
      <Dialog open={valuationDialogOpen} onOpenChange={setValuationDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Get Valuation</DialogTitle>
            <DialogDescription>Provide details about your software license to receive a valuation.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleValuationSubmit} className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="softwareName">Software Name</Label>
              <Input id="softwareName" placeholder="e.g., Microsoft Office 365" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="licenseVersion">Version</Label>
              <Input id="licenseVersion" placeholder="e.g., 2021, Enterprise" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="licenseQuantity">Number of Licenses</Label>
              <Input id="licenseQuantity" type="number" min="1" placeholder="e.g., 10" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="purchaseDate">Purchase Date (Approximate)</Label>
              <Input id="purchaseDate" type="date" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactEmail">Contact Email</Label>
              <Input id="contactEmail" type="email" placeholder="your.email@company.com" required />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setValuationDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Get Valuation"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Get Paid Dialog */}
      <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Get Paid</DialogTitle>
            <DialogDescription>
              Provide your payment details to receive payment for your software licenses.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handlePaymentSubmit} className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" placeholder="Your full name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input id="companyName" placeholder="Your company name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="paymentMethod">Payment Method</Label>
              <select
                id="paymentMethod"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required
              >
                <option value="">Select payment method</option>
                <option value="bankTransfer">Bank Transfer</option>
                <option value="paypal">PayPal</option>
                <option value="check">Check</option>
                <option value="crypto">Cryptocurrency</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="paymentDetails">Payment Details</Label>
              <Textarea
                id="paymentDetails"
                placeholder="Provide your payment details (e.g., bank account number, PayPal email)"
                rows={3}
                required
              />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setPaymentDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Payment Details"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  )
}
