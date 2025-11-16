'use client'

import { useAccount } from 'wagmi'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { EmployerDashboard } from '@/components/dashboard/employer-dashboard'
import { EmployeeDashboard } from '@/components/dashboard/employee-dashboard'
import { useEmployer, useIsAuthorizedEmployer } from '@/lib/contracts/hooks/usePayrollEscrow'
import { useEffect } from 'react'

export default function PaymentsPage() {
  const { address, isConnected } = useAccount()
  const { data: employer, isLoading: employerLoading, error: employerError } = useEmployer()
  const { data: isAuthorized, isLoading: authLoading, error: authError } = useIsAuthorizedEmployer(
    address && isConnected ? address : undefined
  )

  // Debug logging
  useEffect(() => {
    console.log('=== PAYMENTS PAGE ROLE DETECTION ===')
    console.log('Address:', address)
    console.log('Is connected:', isConnected)
    console.log('Employer data:', employer)
    console.log('Employer loading:', employerLoading)
    console.log('Employer error:', employerError)
    console.log('Is authorized:', isAuthorized)
    console.log('Auth loading:', authLoading)
    console.log('Auth error:', authError)
    console.log('====================================')
  }, [address, isConnected, employer, employerLoading, employerError, isAuthorized, authLoading, authError])

  const isEmployer = address && isConnected && employer && (
    address.toLowerCase() === (employer as string).toLowerCase() || Boolean(isAuthorized)
  )

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Payments</h1>
            <p className="text-white/60 mt-1">
              {isEmployer ? 'Manage all your payroll payments' : 'View all your payment history'}
            </p>
          </div>
        </div>

        {!isConnected ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-white mb-2">Connect Your Wallet</h2>
            <p className="text-white/60">Please connect your wallet to access your payments.</p>
          </div>
        ) : employerLoading || authLoading ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-white mb-2">Loading...</h2>
            <p className="text-white/60">Detecting your role...</p>
          </div>
        ) : (
          <>
            {isEmployer ? (
              <EmployerDashboard />
            ) : (
              <EmployeeDashboard />
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  )
}