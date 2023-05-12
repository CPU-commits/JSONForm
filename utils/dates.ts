import dayjs from 'dayjs'

export function dateIsYYYYMMDD(date: string) {
	return dayjs(date, 'YYYY-MM-DD', true).isValid()
}
