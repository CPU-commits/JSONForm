import { H3Event } from 'h3'
import { StatusCodes } from 'http-status-codes'
import { getServerSession } from '#auth'

export default async (event: H3Event, role?: 'a' | 'b') => {
	const session = await getServerSession(event)
	if (!session)
		throw createError({
			statusCode: StatusCodes.FORBIDDEN,
			statusMessage: 'Unauthorized',
		})
	if (role && session.user.role !== role)
		throw createError({
			statusCode: StatusCodes.UNAUTHORIZED,
			statusMessage: 'Unauthorized',
		})
}
