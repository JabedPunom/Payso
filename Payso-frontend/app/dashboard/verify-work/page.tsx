'use client'

import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { WorkVerification } from '@/components/dashboard/work-verification'

export default function VerifyWorkPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Work Verification</h1>
          <p className="text-white/60 mt-1">
            Verify work completion for payments that require verification
          </p>
        </div>

        <WorkVerification />
      </div>
    </DashboardLayout>
  )
}

