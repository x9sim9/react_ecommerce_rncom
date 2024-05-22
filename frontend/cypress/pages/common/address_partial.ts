import { Common } from '@pages/common'


export type ClickNewUserButtonProps = {
	verify?: boolean
}

export type ClickSubmitOrder = {
	ignoreDisabled?: boolean
	verify?: boolean
}


export type VisitProps = {
	verify?: boolean
}

export type LoginAsCustomerProps = {
	verify?: boolean
}

class AddressPartial extends Common {
	elements = {
		...this.commonElements,

		city: ({ idPrefix }: { idPrefix: string }) => this.get(`[data-testid="${idPrefix}.city"]`),
		line1: ({ idPrefix }: { idPrefix: string }) => this.get(`[data-testid="${idPrefix}.line1"]`),
		line2: ({ idPrefix }: { idPrefix: string }) => this.get(`[data-testid="${idPrefix}.line2"]`),
		postcode: ({ idPrefix }: { idPrefix: string }) => this.get(`[data-testid="${idPrefix}.postcode"]`),
	}
}

export default (new AddressPartial)