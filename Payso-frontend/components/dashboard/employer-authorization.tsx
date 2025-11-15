'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Users, UserPlus, UserMinus, CheckCircle, AlertCircle } from 'lucide-react'
import { formatAddress } from '@/lib/utils'
import { 
  useIsAuthorizedEmployer, 
  useAddAuthorizedEmployer, 
  useRemoveAuthorizedEmployer 
} from '@/lib/contracts/hooks/usePayrollEscrow'
import { isAddress } from 'viem'

interface EmployerAuthorizationProps {
  mainEmployer: string
}

export function EmployerAuthorization({ mainEmployer }: EmployerAuthorizationProps) {
  const { address } = useAccount()
  const [newEmployerAddress, setNewEmployerAddress] = useState('')
  const [checkAddress, setCheckAddress] = useState('')
  
  // Check authorization status
  const { data: isAuthorized, refetch: refetchAuthorization } = useIsAuthorizedEmployer(checkAddress as `0x${string}`)
  
  // Authorization management hooks
  const { addAuthorizedEmployer, isPending: isAdding, error: addError } = useAddAuthorizedEmployer()
  const { removeAuthorizedEmployer, isPending: isRemoving, error: removeError } = useRemoveAuthorizedEmployer()
  
  const isMainEmployer = address?.toLowerCase() === mainEmployer.toLowerCase()
  
  const handleAddEmployer = async () => {
    if (!isAddress(newEmployerAddress)) {
      alert('Please enter a valid Ethereum address')
      return
    }
    
    try {
      await addAuthorizedEmployer(newEmployerAddress as `0x${string}`)
      setNewEmployerAddress('')
      if (checkAddress.toLowerCase() === newEmployerAddress.toLowerCase()) {
        refetchAuthorization()
      }
    } catch (error) {
      console.error('Failed to add employer:', error)
    }
  }
  
  const handleRemoveEmployer = async (employerAddress: string) => {
    try {
      await removeAuthorizedEmployer(employerAddress as `0x${string}`)
      if (checkAddress.toLowerCase() === employerAddress.toLowerCase()) {
        refetchAuthorization()
      }
    } catch (error) {
      console.error('Failed to remove employer:', error)
    }
  }
  
  const handleCheckAuthorization = () => {
    if (!isAddress(checkAddress)) {
      alert('Please enter a valid Ethereum address')
      return
    }
    refetchAuthorization()
  }
  
  return (
    <Card className="bg-white/5 border-white/10">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-indigo-400" />
          <CardTitle className="text-white">Employer Authorization</CardTitle>
        </div>
        <CardDescription className="text-white/60">
          Manage authorized employers who can schedule payments and verify work
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Authorization Status Check */}
        <div className="space-y-4 p-4 rounded-lg bg-white/5 border border-white/10">
          <h3 className="text-sm font-medium text-white">Check Authorization Status</h3>
          <div className="flex gap-2">
            <Input
              placeholder="Enter address to check (0x...)"
              value={checkAddress}
              onChange={(e) => setCheckAddress(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
            />
            <Button 
              onClick={handleCheckAuthorization}
              size="sm"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/5"
            >
              Check
            </Button>
          </div>
          {checkAddress && isAddress(checkAddress) && (
            <div className="flex items-center gap-2">
              {isAuthorized ? (
                <>
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-sm text-green-400">
                    {formatAddress(checkAddress)} is authorized as employer
                  </span>
                </>
              ) : (
                <>
                  <AlertCircle className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm text-yellow-400">
                    {formatAddress(checkAddress)} is not authorized
                  </span>
                </>
              )}
            </div>
          )}
        </div>

        {/* Main Employer Controls */}
        {isMainEmployer && (
          <div className="space-y-4 p-4 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
            <h3 className="text-sm font-medium text-indigo-400">Main Employer Controls</h3>
            <p className="text-xs text-white/60">As the main employer, you can authorize other addresses to schedule payments and verify work.</p>
            
            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  placeholder="Enter address to authorize (0x...)"
                  value={newEmployerAddress}
                  onChange={(e) => setNewEmployerAddress(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                />
                <Button 
                  onClick={handleAddEmployer}
                  disabled={isAdding}
                  size="sm"
                  className="bg-indigo-500 hover:bg-indigo-600 text-white"
                >
                  {isAdding ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-1" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-4 w-4 mr-1" />
                      Add
                    </>
                  )}
                </Button>
              </div>
              
              {(addError || removeError) && (
                <div className="text-sm text-red-400 bg-red-500/10 p-2 rounded border border-red-500/20">
                  Error: {addError?.message || removeError?.message}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Current Authorizations */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-white">Quick Actions</h3>
          
          <div className="grid gap-2">
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-indigo-500/10 text-indigo-400">
                  Main
                </Badge>
                <span className="text-sm text-white/80">Main Employer</span>
              </div>
              <span className="text-xs text-white/60">{formatAddress(mainEmployer)}</span>
            </div>
            
            {isMainEmployer && (
              <div className="text-xs text-white/60 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                <p>💡 <strong>Testing Tip:</strong> Add judge addresses above to let them test payment scheduling and work verification.</p>
              </div>
            )}
            
            {!isMainEmployer && (
              <div className="text-xs text-white/60 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <p>ℹ️ <strong>Info:</strong> Only the main employer can add/remove authorized employers.</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}