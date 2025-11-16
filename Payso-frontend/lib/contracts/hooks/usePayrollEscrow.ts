import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { Address, formatUnits, parseUnits } from 'viem'
import { useEffect } from 'react'
import PayrollEscrowABI from '../abis/PayrollEscrow.json'
import { CONTRACT_ADDRESSES, TOKEN_DECIMALS } from '../config'

export interface Payment {
  id: bigint
  recipient: Address
  amount: bigint
  releaseAt: bigint
  claimed: boolean
  requiresWorkEvent: boolean
  stablecoin: Address
  preferredPayout: Address
}

export function usePayrollEscrow() {
  const { writeContract, data: hash, error, isPending } = useWriteContract()

  const { data: receipt, isLoading: isConfirming } = useWaitForTransactionReceipt({
    hash,
  })

  // Add detailed logging for transaction receipt
  useEffect(() => {
    if (receipt) {
      console.log('🎉 Transaction confirmed! Receipt:', receipt)
      console.log('Transaction hash:', receipt.transactionHash)
      console.log('Block number:', receipt.blockNumber)
      console.log('Gas used:', receipt.gasUsed?.toString())
      console.log('Status:', receipt.status)

      // Log events if any
      if (receipt.logs && receipt.logs.length > 0) {
        console.log('Transaction logs:', receipt.logs)
        receipt.logs.forEach((log, index) => {
          console.log(`Log ${index}:`, {
            address: log.address,
            topics: log.topics,
            data: log.data
          })
        })
      }

      // Trigger a page reload after successful transaction to refresh all data
      console.log('🔄 Triggering page reload to refresh payment data...')
      setTimeout(() => {
        window.location.reload()
      }, 2000) // Wait 2 seconds for blockchain to update
    }
  }, [receipt])

  const depositAndSchedule = async (
    recipient: Address,
    amount: string,
    releaseAt: number,
    requiresWorkEvent: boolean,
    stablecoin: Address,
    preferredPayout: Address
  ) => {
    const amountInWei = parseUnits(amount, TOKEN_DECIMALS)
    
    console.log('🚀 Calling depositAndSchedule with:', {
      recipient,
      amountInWei: amountInWei.toString(),
      releaseAt: BigInt(releaseAt).toString(),
      requiresWorkEvent,
      stablecoin,
      preferredPayout,
      contractAddress: CONTRACT_ADDRESSES.PayrollEscrow
    })
    
    return writeContract({
      address: CONTRACT_ADDRESSES.PayrollEscrow,
      abi: PayrollEscrowABI,
      functionName: 'depositAndSchedule',
      args: [
        recipient,
        amountInWei,
        BigInt(releaseAt),
        requiresWorkEvent,
        stablecoin,
        preferredPayout,
      ],
    })
  }

  const claimPayment = async (paymentId: bigint) => {
    console.log('🚀 Calling claimPayment with:', {
      paymentId: paymentId.toString(),
      contractAddress: CONTRACT_ADDRESSES.PayrollEscrow
    })
    
    writeContract({
      address: CONTRACT_ADDRESSES.PayrollEscrow,
      abi: PayrollEscrowABI,
      functionName: 'claimPayment',
      args: [paymentId],
    })
  }

  const verifyWork = async (paymentId: bigint, signature: `0x${string}`) => {
    writeContract({
      address: CONTRACT_ADDRESSES.PayrollEscrow,
      abi: PayrollEscrowABI,
      functionName: 'verifyWork',
      args: [paymentId, signature],
    })
  }

  return {
    depositAndSchedule,
    claimPayment,
    verifyWork,
    hash,
    receipt,
    error,
    isPending,
    isConfirming,
  }
}

export function useGetPayment(paymentId: bigint) {
  return useReadContract({
    address: CONTRACT_ADDRESSES.PayrollEscrow,
    abi: PayrollEscrowABI,
    functionName: 'getPayment',
    args: [paymentId],
    query: {
      // Refetch every 30 seconds to avoid rate limiting
      refetchInterval: 30000,
      staleTime: 10000,
    }
  })
}

export function useGetPaymentsByRecipient(recipient?: Address) {
  return useReadContract({
    address: CONTRACT_ADDRESSES.PayrollEscrow,
    abi: PayrollEscrowABI,
    functionName: 'getPaymentsByRecipient',
    args: recipient ? [recipient] : undefined,
    // Use query options for conditional execution
    query: {
      enabled: Boolean(recipient), // Only enable if recipient is provided
      // Refetch every 30 seconds to avoid rate limiting
      refetchInterval: 30000,
      staleTime: 10000,
    },
  })
}

export function useIsClaimable(paymentId: bigint) {
  return useReadContract({
    address: CONTRACT_ADDRESSES.PayrollEscrow,
    abi: PayrollEscrowABI,
    functionName: 'isClaimable',
    args: [paymentId],
  })
}

export function useWorkVerified(paymentId: bigint) {
  return useReadContract({
    address: CONTRACT_ADDRESSES.PayrollEscrow,
    abi: PayrollEscrowABI,
    functionName: 'workVerified',
    args: [paymentId],
  })
}

export function usePaymentCounter() {
  const result = useReadContract({
    address: CONTRACT_ADDRESSES.PayrollEscrow,
    abi: PayrollEscrowABI,
    functionName: 'paymentCounter',
    query: {
      // Refetch every 30 seconds to avoid rate limiting
      refetchInterval: 30000,
      // Cache for 10 seconds
      staleTime: 10000,
    }
  })

  // Add detailed logging for the payment counter
  useEffect(() => {
    console.log('📊 Payment counter hook result:', {
      data: result.data,
      isLoading: result.isLoading,
      error: result.error,
      isError: result.isError
    })
  }, [result.data, result.isLoading, result.error, result.isError])

  return result
}

// New function to get the latest payment ID specifically
export function useLatestPaymentId() {
  const { data: counter } = usePaymentCounter()
  
  return {
    data: counter && counter > 0 ? counter - BigInt(1) : undefined,
    isLoading: false,
    error: null
  }
}

export function useEmployer() {
  return useReadContract({
    address: CONTRACT_ADDRESSES.PayrollEscrow,
    abi: PayrollEscrowABI,
    functionName: 'employer',
  })
}

export function useIsAuthorizedEmployer(address?: Address) {
  return useReadContract({
    address: CONTRACT_ADDRESSES.PayrollEscrow,
    abi: PayrollEscrowABI,
    functionName: 'isAuthorizedEmployer',
    args: address ? [address] : undefined,
    // Use query options for conditional execution
    query: {
      enabled: Boolean(address), // Only enable if address is provided
      retry: 2,
      retryDelay: 1000,
    },
  })
}

export function useAddAuthorizedEmployer() {
  const { writeContract, data: hash, error, isPending } = useWriteContract()
  
  const { data: receipt, isLoading: isConfirming } = useWaitForTransactionReceipt({
    hash,
  })

  const addAuthorizedEmployer = async (newEmployer: Address) => {
    writeContract({
      address: CONTRACT_ADDRESSES.PayrollEscrow,
      abi: PayrollEscrowABI,
      functionName: 'addAuthorizedEmployer',
      args: [newEmployer],
    })
  }

  return {
    addAuthorizedEmployer,
    hash,
    receipt,
    error,
    isPending,
    isConfirming,
  }
}

export function useRemoveAuthorizedEmployer() {
  const { writeContract, data: hash, error, isPending } = useWriteContract()
  
  const { data: receipt, isLoading: isConfirming } = useWaitForTransactionReceipt({
    hash,
  })

  const removeAuthorizedEmployer = async (employerToRemove: Address) => {
    writeContract({
      address: CONTRACT_ADDRESSES.PayrollEscrow,
      abi: PayrollEscrowABI,
      functionName: 'removeAuthorizedEmployer',
      args: [employerToRemove],
    })
  }

  return {
    removeAuthorizedEmployer,
    hash,
    receipt,
    error,
    isPending,
    isConfirming,
  }
}