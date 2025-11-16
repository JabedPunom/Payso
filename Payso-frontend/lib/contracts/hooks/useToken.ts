import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { Address, formatUnits, parseUnits } from 'viem'
import { useEffect } from 'react'
import ERC20ABI from '../abis/ERC20.json'
import { CONTRACT_ADDRESSES, TOKEN_DECIMALS } from '../config'

export function useTokenBalance(tokenAddress: Address, account: Address | undefined) {
  return useReadContract({
    address: tokenAddress,
    abi: ERC20ABI,
    functionName: 'balanceOf',
    args: account ? [account] : undefined,
    query: {
      enabled: !!account,
    },
  })
}

export function useTokenAllowance(
  tokenAddress: Address,
  owner: Address | undefined,
  spender: Address
) {
  return useReadContract({
    address: tokenAddress,
    abi: ERC20ABI,
    functionName: 'allowance',
    args: owner ? [owner, spender] : undefined,
    query: {
      enabled: !!owner,
    },
  })
}

export function useApproveToken() {
  const { writeContractAsync, data: hash, error, isPending } = useWriteContract()

  const { data: receipt, isLoading: isConfirming } = useWaitForTransactionReceipt({
    hash,
  })

  // Add detailed logging for approval receipt
  useEffect(() => {
    if (receipt) {
      console.log('🎉 Token approval confirmed! Receipt:', {
        transactionHash: receipt.transactionHash,
        blockNumber: receipt.blockNumber,
        gasUsed: receipt.gasUsed?.toString(),
        status: receipt.status,
        logs: receipt.logs
      })
    }
  }, [receipt])

  const approve = async (
    tokenAddress: Address,
    spender: Address,
    amount: string
  ) => {
    const amountInWei = parseUnits(amount, TOKEN_DECIMALS)

    console.log('🔄 Token approval request:', {
      tokenAddress,
      spender,
      amount,
      amountInWei: amountInWei.toString()
    })

    // Use writeContractAsync to get the transaction hash
    const txHash = await writeContractAsync({
      address: tokenAddress,
      abi: ERC20ABI,
      functionName: 'approve',
      args: [spender, amountInWei],
    })

    console.log('✅ Approval transaction submitted:', txHash)
    return txHash
  }

  return {
    approve,
    hash,
    receipt,
    error,
    isPending,
    isConfirming,
  }
}

export function useTokenInfo(tokenAddress: Address) {
  const name = useReadContract({
    address: tokenAddress,
    abi: ERC20ABI,
    functionName: 'name',
  })

  const symbol = useReadContract({
    address: tokenAddress,
    abi: ERC20ABI,
    functionName: 'symbol',
  })

  const decimals = useReadContract({
    address: tokenAddress,
    abi: ERC20ABI,
    functionName: 'decimals',
  })

  return {
    name: name.data,
    symbol: symbol.data,
    decimals: decimals.data,
    isLoading: name.isLoading || symbol.isLoading || decimals.isLoading,
  }
}