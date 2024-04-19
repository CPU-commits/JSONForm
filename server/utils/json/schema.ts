export default {
	type: 'object',
	required: ['title', 'isPublic', 'questions', 'slug', 'uid'],
	properties: {
		title: {
			type: 'string',
			maxLength: 100,
		},
		uid: {
			type: 'string',
			maxLength: 100,
		},
		slug: {
			type: 'string',
			maxLength: 50,
		},
		description: {
			type: 'string',
			maxLength: 500,
		},
		lang: {
			type: 'string',
			maxLength: 5,
		},
		anonymous: {
			type: 'boolean',
		},
		isPublic: {
			type: 'boolean',
		},
		basedOnIndex: {
			type: 'boolean',
		},
		questions: {
			type: 'array',
			minItems: 1,
			items: {
				type: 'object',
				properties: {
					kind: {
						type: 'string',
						enum: [
							'Text',
							'Date',
							'File',
							'Select',
							'Multiple',
							'Number',
							'Email',
							'URL',
						],
					},
					index: {
						type: 'integer',
					},
					description: {
						type: 'string',
						maxLength: 500,
					},
					validations: {
						type: 'object',
						additionalProperties: true,
					},
					show: {
						type: 'object',
						properties: {
							depends: {
								type: 'array',
								items: {
									type: 'object',
									properties: {
										question: {
											type: 'integer',
										},
										value: {},
										not: {
											type: 'boolean',
										},
									},
									additionalProperties: false,
								},
							},
						},
						additionalProperties: false,
					},
					options: {
						type: 'array',
						items: {
							type: 'object',
							properties: {
								value: {
									type: 'string',
								},
								text: {
									type: 'string',
									maxLength: 100,
								},
							},
							additionalProperties: false,
						},
					},
				},
				additionalProperties: false,
			},
		},
		additionalProperties: false,
	},
	allOf: [
		{
			if: {
				properties: {
					basedOnIndex: {
						const: true,
					},
				},
				required: ['basedOnIndex'],
			},
			then: {
				type: 'object',
				properties: {
					questions: {
						type: 'array',
						items: {
							type: 'object',
							required: ['kind', 'index', 'description'],
						},
					},
				},
			},
			else: {
				properties: {
					questions: {
						type: 'array',
						items: {
							type: 'object',
							required: ['kind', 'description'],
						},
					},
				},
			},
		},
	],
}
