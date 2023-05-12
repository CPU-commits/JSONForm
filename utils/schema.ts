export default {
	type: 'object',
	required: ['title', 'isPublic', 'questions'],
	properties: {
		title: {
			type: 'string',
			maxLength: 100,
		},
		description: {
			type: 'string',
			maxLength: 500,
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
				properties: {
					questions: {
						items: {
							required: ['kind', 'index', 'description'],
						},
					},
				},
			},
			else: {
				properties: {
					questions: {
						items: {
							required: ['kind', 'description'],
						},
					},
				},
			},
		},
	],
}
