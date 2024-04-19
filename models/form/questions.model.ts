import { z } from 'zod'
// Export questions objects in zod
export type QuestionKind =
	| 'Text'
	| 'Date'
	| 'File'
	| 'Select'
	| 'Multiple'
	| 'Number'
	| 'Email'
	| 'URL'
	| 'Default'

export const Question = z.object({
	description: z.string().min(1).max(500),
	index: z.number().int().or(z.null()).optional(),
	kind: z.enum([
		'Text',
		'Date',
		'File',
		'Select',
		'Multiple',
		'Number',
		'Email',
		'URL',
		'Default',
	]),
	validations: z.object({}).optional(),
})
export type Question = z.infer<typeof Question>

// Text Question
export const TextSchema = z
	.object({
		kind: z.enum(['Text']),
		validations: z
			.object({
				minLength: z.number().min(1).optional(),
				maxLength: z.number().min(1).optional(),
				regex: z
					.string()
					.refine((v) => new RegExp(v))
					.optional(),
			})
			.optional(),
	})
	.and(Question)
export type Text = z.infer<typeof TextSchema>

// Date Question
export const DateSchema = z
	.object({
		kind: z.enum(['Date']),
		validations: z
			.object({
				minDate: z
					.string()
					.describe('YYYY-MM-DD')
					.refine((date) => dateIsYYYYMMDD(date))
					.optional(),
				maxDate: z
					.string()
					.describe('YYYY-MM-DD')
					.refine((date) => dateIsYYYYMMDD(date))
					.optional(),
			})
			.optional(),
	})
	.and(Question)
export type Date = z.infer<typeof DateSchema>

// File Question
export const FileSchema = z
	.object({
		kind: z.enum(['File']),
		validations: z
			.object({
				maxSize: z
					.number()
					.int()
					.describe('In bytes // Integer')
					.optional(),
				maxFiles: z.number().int(),
				mime: z.string().optional(),
			})
			.optional(),
	})
	.and(Question)
export type File = z.infer<typeof FileSchema>

// Select Question
export const SelectSchema = z
	.object({
		kind: z.enum(['Select']),
		options: z.array(
			z.object({
				value: z.string().min(1).max(50),
				text: z.string().min(1).max(100),
			}),
		).min(2),
	})
	.and(Question)
export type Select = z.infer<typeof SelectSchema>

// Multiple Question
export const MultipleSchema = z
	.object({
		kind: z.enum(['Multiple']),
		options: z.array(
			z.object({
				value: z.string().min(1).max(50),
				text: z.string().min(1).max(100),
			}),
		),
	})
	.and(Question)
export type Multiple = z.infer<typeof MultipleSchema>

// Number Question
export const NumberSchema = z
	.object({
		kind: z.enum(['Number']),
		validations: z
			.object({
				min: z.number().optional(),
				max: z.number().optional(),
				isFloat: z.boolean(),
			})
			.optional(),
	})
	.and(Question)
export type NumberQ = z.infer<typeof NumberSchema>

// URL Question
export const URLSchema = z
	.object({
		kind: z.enum(['URL']),
		validations: z
			.object({
				secure: z.boolean().optional(),
			})
			.optional(),
	})
	.and(Question)
export type URL = z.infer<typeof URLSchema>

// Email Question
export const EmailSchema = z
	.object({
		kind: z.enum(['Email']),
		validations: z
			.object({
				domains: z.array(z.string()).optional(),
			})
			.optional(),
	})
	.and(Question)
export type Email = z.infer<typeof EmailSchema>

// General Question Type
export const QuestionObjectSchema = TextSchema.or(DateSchema)
	.or(FileSchema)
	.or(SelectSchema)
	.or(MultipleSchema)
	.or(NumberSchema)
	.or(URLSchema)
	.or(EmailSchema)
export type QuestionObject<T extends QuestionKind = 'Default'> =
	T extends 'Text'
		? Text
		: T extends 'Date'
		  ? Date
		  : T extends 'File'
		    ? File
		    : T extends 'Select'
		      ? Select
		      : T extends 'Multiple'
		        ? Multiple
		        : T extends 'Number'
		          ? NumberQ
		          : T extends 'URL'
		            ? URL
		            : T extends 'Email'
		              ? Email
		              : Question
