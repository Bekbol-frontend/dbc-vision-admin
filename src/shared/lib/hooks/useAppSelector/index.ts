import type { RootState } from '@/app/provider/StoreProvider'
import { useSelector } from 'react-redux'

export const useAppSelector = useSelector.withTypes<RootState>()