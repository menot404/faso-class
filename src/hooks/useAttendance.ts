import { useQuery } from '@tanstack/react-query'
import { fetchAttendance, fetchAttendanceByDate } from '@/features/attendance/services/attendance-service';
import type { AttendanceFilters } from '@/types/attendance'
export const ATTENDANCE_QUERY_KEY = 'attendance'

export const useAttendance = (filters?: AttendanceFilters) => {
  return useQuery({
    queryKey: [ATTENDANCE_QUERY_KEY, filters],
    queryFn: () => fetchAttendance(filters),
  })
}

export const useAttendanceByDate = (date: string, classId?: string) => {
  return useQuery({
    queryKey: [ATTENDANCE_QUERY_KEY, 'date', date, classId],
    queryFn: () => fetchAttendanceByDate(date, classId),
    enabled: !!date,
  })
}