import type { AppDispatch } from '@/app/provider/StoreProvider'
import { useDispatch } from 'react-redux'

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()