/* $svelte\fluent-svelte-raw\TextBox\TextBoxButton.svelte generated by Svelte v3.46.4 */
import {
	SvelteComponent,
	action_destroyer,
	append_styles,
	assign,
	binding_callbacks,
	compute_rest_props,
	create_slot,
	detach,
	element as element_1,
	exclude_internal_props,
	get_all_dirty_from_scope,
	get_slot_changes,
	get_spread_update,
	init,
	insert,
	safe_not_equal,
	set_attributes,
	toggle_class,
	transition_in,
	transition_out,
	update_slot_base
} from "mth://.svelte/internal";

import { createEventForwarder } from "../internal";
import { get_current_component } from "mth://.svelte/internal";

function add_css(target) {
	append_styles(target, "svelte-159a5xt", ".text-box-button.svelte-159a5xt{align-items:center;background-color:var(--fds-subtle-fill-transparent);border:none;border-radius:var(--fds-control-corner-radius);box-sizing:border-box;color:var(--fds-text-secondary);display:flex;justify-content:center;min-block-size:22px;min-inline-size:26px;outline:none;padding:3px 5px}.text-box-button.svelte-159a5xt:focus-visible{box-shadow:var(--fds-focus-stroke)}.text-box-button.svelte-159a5xt:hover{background-color:var(--fds-subtle-fill-secondary)}.text-box-button.svelte-159a5xt:active{background-color:var(--fds-subtle-fill-tertiary);color:var(--fds-text-tertiary)}.text-box-button.svelte-159a5xt:disabled{background-color:var(--fds-subtle-fill-tertiary);color:var(--fds-text-disabled)}.text-box-button.svelte-159a5xt svg{fill:currentColor;min-block-size:12px;min-inline-size:12px;pointer-events:none}");
}

function create_fragment(ctx) {
	let button;
	let button_class_value;
	let forwardEvents_action;
	let current;
	let mounted;
	let dispose;
	const default_slot_template = /*#slots*/ ctx[6].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[5], null);

	let button_levels = [
		{
			class: button_class_value = "text-box-button " + /*className*/ ctx[2]
		},
		{ type: /*type*/ ctx[1] },
		/*$$restProps*/ ctx[4]
	];

	let button_data = {};

	for (let i = 0; i < button_levels.length; i += 1) {
		button_data = assign(button_data, button_levels[i]);
	}

	return {
		c() {
			button = element_1("button");
			if (default_slot) default_slot.c();
			set_attributes(button, button_data);
			toggle_class(button, "svelte-159a5xt", true);
		},
		m(target, anchor) {
			insert(target, button, anchor);

			if (default_slot) {
				default_slot.m(button, null);
			}

			if (button.autofocus) button.focus();
			/*button_binding*/ ctx[7](button);
			current = true;

			if (!mounted) {
				dispose = action_destroyer(forwardEvents_action = /*forwardEvents*/ ctx[3].call(null, button));
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 32)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[5],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[5])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[5], dirty, null),
						null
					);
				}
			}

			set_attributes(button, button_data = get_spread_update(button_levels, [
				(!current || dirty & /*className*/ 4 && button_class_value !== (button_class_value = "text-box-button " + /*className*/ ctx[2])) && { class: button_class_value },
				(!current || dirty & /*type*/ 2) && { type: /*type*/ ctx[1] },
				dirty & /*$$restProps*/ 16 && /*$$restProps*/ ctx[4]
			]));

			toggle_class(button, "svelte-159a5xt", true);
		},
		i(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(button);
			if (default_slot) default_slot.d(detaching);
			/*button_binding*/ ctx[7](null);
			mounted = false;
			dispose();
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	const omit_props_names = ["type","class","element"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	let { type = "button" } = $$props;
	let { class: className = "" } = $$props;
	let { element = null } = $$props;
	const forwardEvents = createEventForwarder(get_current_component());

	function button_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			element = $$value;
			$$invalidate(0, element);
		});
	}

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(4, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('type' in $$new_props) $$invalidate(1, type = $$new_props.type);
		if ('class' in $$new_props) $$invalidate(2, className = $$new_props.class);
		if ('element' in $$new_props) $$invalidate(0, element = $$new_props.element);
		if ('$$scope' in $$new_props) $$invalidate(5, $$scope = $$new_props.$$scope);
	};

	return [
		element,
		type,
		className,
		forwardEvents,
		$$restProps,
		$$scope,
		slots,
		button_binding
	];
}

class TextBoxButton extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { type: 1, class: 2, element: 0 }, add_css);
	}
}

export default TextBoxButton;