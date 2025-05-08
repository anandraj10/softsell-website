"use client"

import { Shield, Clock, BadgeDollarSign, Award } from "lucide-react"
import { motion } from "framer-motion"

export function WhyChooseUs() {
  const reasons = [
    {
      title: "Secure Transactions",
      description: "Enterprise-grade security protocols protect your data and transactions",
      icon: Shield,
    },
    {
      title: "Fast Turnaround",
      description: "Get valuations within 24 hours and payment within 3 business days",
      icon: Clock,
    },
    {
      title: "Best Market Rates",
      description: "Our extensive network ensures you get the highest value for your licenses",
      icon: BadgeDollarSign,
    },
    {
      title: "Compliance Guaranteed",
      description: "All transfers are legally compliant with software licensing regulations",
      icon: Award,
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 2 }}
        className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-b from-gray-200/30 to-transparent dark:from-gray-700/30 rounded-bl-full"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-t from-gray-200/30 to-transparent dark:from-gray-700/30 rounded-tr-full"
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Why Choose Us</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            SoftSell offers unmatched benefits when selling your software licenses
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                y: -10,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm transition-all duration-300"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 300, delay: index * 0.1 }}
                className="w-12 h-12 mb-4 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700"
              >
                <reason.icon className="w-6 h-6 text-gray-900 dark:text-white" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{reason.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{reason.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
