import dayjs from 'dayjs'

export function dateIsYYYYMMDD(date: string) {
	return dayjs(date, 'YYYY-MM-DD', true).isValid()
}

export function formatDate(date: string | Date) {
	return dayjs(date).format('DD/MM/YYYY')
}

export function datesAreDifferent(
	dateOne: string | Date,
	dateTwo: string | Date,
) {
	return dayjs(dateOne).diff(dayjs(dateTwo)) !== 0
}
