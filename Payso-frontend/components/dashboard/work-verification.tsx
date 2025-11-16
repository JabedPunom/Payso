'use client'

import { useState, useEffect } from 'react'
import { useAccount, useSignMessage } from 'wagmi'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { CheckCircle, Clock, AlertCircle, FileCheck } from 'lucide-react'
import { usePayrollEscrow, useGetPayment, useWorkVerified, usePaymentCounter, useEmployer } from '@/lib/contracts/hooks/usePayrollEscrow'
import { CONTRACT_ADDRESSES, STABLECOIN_SYMBOLS } from '@/lib/contracts/config'
import { formatTokenAmount, formatDateTime, formatAddress } from '@/lib/contracts/utils'
import { keccak256, encodePacked } from 'viem'

export function WorkVerification() {
  const { address, isConnected } = useAccount()
  const { data: employer } = useEmployer()
  const { data: paymentCounter } = usePaymentCounter()
  const { verifyWork, isPending, isConfirming, receipt, error } = usePayrollEscrow()
  const { signMessageAsync } = useSignMessage()
  
  const [signingPaymentId, setSigningPaymentId] = useState<bigint | null>(null)

  const showToast = (props: {title: string, description?: string, variant?: 'default' | 'destructive'}) => {
    if (props.variant === 'destructive') {
      toast.error(props.title, { description: props.description })
    } else {
      toast.success(props.title, { description: props.description })
    }
  }

  // Check if connected user is employer
  const isEmployer = address && employer && address.toLowerCase() === (employer as string).toLowerCase()

  // Get all payment IDs
  const totalPayments = paymentCounter ? Number(paymentCounter) : 0
  const paymentIds = Array.from({ length: totalPayments }, (_, i) => BigInt(i))

  useEffect(() => {
    if (receipt) {
      showToast({
        title: 'Work verified',
        description: 'Work has been successfully verified for this payment.',
      })
      setSigningPaymentId(null)
    }
    if (error) {
      showToast({
        title: 'Error',
        description: 'Failed to verify work. Please try again.',
        variant: 'destructive',
      })
      setSigningPaymentId(null)
    }
  }, [receipt, error])

  const handleVerifyWork = async (paymentId: bigint, recipient: string) => {
    if (!isConnected || !address || !employer) {
      showToast({
        title: 'Wallet not connected',
        description: 'Please connect your wallet to verify work.',
        variant: 'destructive',
      })
      return
    }

    if (!isEmployer) {
      showToast({
        title: 'Access denied',
        description: 'Only the employer can verify work.',
        variant: 'destructive',
      })
      return
    }

    try {
      setSigningPaymentId(paymentId)
      
      console.log('🔐 Generating signature for work verification:', {
        recipient,
        paymentId: paymentId.toString(),
        employer: employer
      })

      // Create message hash: keccak256(abi.encodePacked(recipient, paymentId, employer))
      const messageHash = keccak256(
        encodePacked(
          ['address', 'uint256', 'address'],
          [recipient as `0x${string}`, paymentId, employer as `0x${string}`]
        )
      )

      console.log('📝 Message hash:', messageHash)

      // Sign the message hash
      // Note: signMessageAsync automatically adds the Ethereum Signed Message prefix
      const signature = await signMessageAsync({
        message: { raw: messageHash }
      })

      console.log('✍️ Signature generated:', signature)

      // Submit verification to contract
      await verifyWork(paymentId, signature)

      console.log('✅ Work verification submitted')
    } catch (error) {
      console.error('❌ Error verifying work:', error)
      showToast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to verify work',
        variant: 'destructive',
      })
      setSigningPaymentId(null)
    }
  }

  if (!isConnected) {
    return (
      <Card className="bg-white/5 border-white/10">
        <CardContent className="p-8 text-center">
          <h3 className="text-lg font-semibold mb-2 text-white">Connect Your Wallet</h3>
          <p className="text-white/60">
            Please connect your wallet to verify work completion.
          </p>
        </CardContent>
      </Card>
    )
  }

  if (!isEmployer) {
    return (
      <Card className="bg-white/5 border-white/10">
        <CardContent className="p-8 text-center">
          <h3 className="text-lg font-semibold mb-2 text-white">Access Denied</h3>
          <p className="text-white/60">
            Only the contract employer can verify work completion.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileCheck className="h-5 w-5 text-indigo-400" />
            <CardTitle className="text-white">Work Verification</CardTitle>
          </div>
          <CardDescription className="text-white/60">
            Verify work completion for payments that require verification
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-blue-400">How Work Verification Works</p>
                  <ul className="text-sm text-white/70 space-y-1 list-disc list-inside">
                    <li>Review payments that require work verification</li>
                    <li>Click "Verify Work" to generate a cryptographic signature</li>
                    <li>Sign the message with your wallet</li>
                    <li>The signature is submitted to the blockchain</li>
                    <li>Employee can then claim the payment</li>
                  </ul>
                </div>
              </div>
            </div>

            {paymentIds.length === 0 ? (
              <div className="text-center py-8">
                <Clock className="h-12 w-12 text-white/40 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">No Payments Found</h3>
                <p className="text-white/60">
                  No payments have been created yet.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {paymentIds.map((paymentId) => (
                  <WorkVerificationCard
                    key={paymentId.toString()}
                    paymentId={paymentId}
                    onVerify={handleVerifyWork}
                    isVerifying={signingPaymentId === paymentId}
                    isPending={isPending || isConfirming}
                  />
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function WorkVerificationCard({
  paymentId,
  onVerify,
  isVerifying,
  isPending
}: {
  paymentId: bigint
  onVerify: (paymentId: bigint, recipient: string) => void
  isVerifying: boolean
  isPending: boolean
}) {
  const { data: payment } = useGetPayment(paymentId)
  const { data: workVerified } = useWorkVerified(paymentId)

  if (!payment) return null

  const paymentData = payment as {
    id: bigint
    recipient: string
    amount: bigint
    releaseAt: bigint
    claimed: boolean
    requiresWorkEvent: boolean
    stablecoin: string
    preferredPayout: string
  }

  // Only show payments that require work verification
  if (!paymentData.requiresWorkEvent) return null

  const isVerified = Boolean(workVerified)
  const isClaimed = paymentData.claimed

  return (
    <div className="bg-white/5 border-white/10 rounded-lg border p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-white">Payment #{paymentData.id.toString()}</span>
            <Badge 
              variant="secondary" 
              className={
                isVerified && isClaimed ? 'bg-green-500/10 text-green-400' :
                isVerified ? 'bg-blue-500/10 text-blue-400' :
                'bg-yellow-500/10 text-yellow-400'
              }
            >
              {isVerified && isClaimed ? (
                <>
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Verified & Claimed
                </>
              ) : isVerified ? (
                <>
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Verified
                </>
              ) : (
                <>
                  <Clock className="h-3 w-3 mr-1" />
                  Pending Verification
                </>
              )}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-white/60">Recipient</p>
              <p className="text-white font-medium">{formatAddress(paymentData.recipient)}</p>
            </div>
            <div>
              <p className="text-white/60">Amount</p>
              <p className="text-white font-medium">
                {formatTokenAmount(paymentData.amount)} {STABLECOIN_SYMBOLS[paymentData.stablecoin as keyof typeof STABLECOIN_SYMBOLS]}
              </p>
            </div>
            <div>
              <p className="text-white/60">Release Date</p>
              <p className="text-white font-medium">{formatDateTime(Number(paymentData.releaseAt))}</p>
            </div>
            <div>
              <p className="text-white/60">Status</p>
              <p className="text-white font-medium">
                {isClaimed ? 'Claimed' : isVerified ? 'Ready to Claim' : 'Awaiting Verification'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex-shrink-0">
          {isVerified ? (
            <div className="flex items-center gap-2 text-green-400">
              <CheckCircle className="h-5 w-5" />
              <span className="text-sm font-medium">Verified</span>
            </div>
          ) : (
            <Button
              onClick={() => onVerify(paymentId, paymentData.recipient)}
              disabled={isVerifying || isPending}
              size="sm"
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              {isVerifying ? 'Signing...' : isPending ? 'Submitting...' : 'Verify Work'}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

