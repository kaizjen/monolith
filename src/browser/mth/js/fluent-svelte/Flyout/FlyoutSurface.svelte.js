/* $svelte\fluent-svelte-raw\Flyout\FlyoutSurface.svelte generated by Svelte v3.46.4 */
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

import { get_current_component } from "mth://.svelte/internal";
import { createEventForwarder } from "../internal";

function add_css(target) {
	append_styles(target, "svelte-zbytle", ".flyout.svelte-zbytle{background-clip:padding-box;background-color:var(--fds-solid-background-quarternary);border:1px solid var(--fds-surface-stroke-flyout);border-radius:var(--fds-overlay-corner-radius);box-shadow:var(--fds-flyout-shadow);box-sizing:border-box;color:var(--fds-text-primary);font-family:var(--fds-font-family-text);font-size:var(--fds-body-font-size);font-weight:400;line-height:20px;min-inline-size:320px;padding:16px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}");
}

function create_fragment(ctx) {
	let div;
	let div_class_value;
	let forwardEvents_action;
	let current;
	let mounted;
	let dispose;
	const default_slot_template = /*#slots*/ ctx[5].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[4], null);

	let div_levels = [
		{
			class: div_class_value = "flyout " + /*className*/ ctx[1]
		},
		/*$$restProps*/ ctx[3]
	];

	let div_data = {};

	for (let i = 0; i < div_levels.length; i += 1) {
		div_data = assign(div_data, div_levels[i]);
	}

	return {
		c() {
			div = element_1("div");
			if (default_slot) default_slot.c();
			set_attributes(div, div_data);
			toggle_class(div, "svelte-zbytle", true);
		},
		m(target, anchor) {
			insert(target, div, anchor);

			if (default_slot) {
				default_slot.m(div, null);
			}

			/*div_binding*/ ctx[6](div);
			current = true;

			if (!mounted) {
				dispose = action_destroyer(forwardEvents_action = /*forwardEvents*/ ctx[2].call(null, div));
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 16)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[4],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[4])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[4], dirty, null),
						null
					);
				}
			}

			set_attributes(div, div_data = get_spread_update(div_levels, [
				(!current || dirty & /*className*/ 2 && div_class_value !== (div_class_value = "flyout " + /*className*/ ctx[1])) && { class: div_class_value },
				dirty & /*$$restProps*/ 8 && /*$$restProps*/ ctx[3]
			]));

			toggle_class(div, "svelte-zbytle", true);
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
			if (detaching) detach(div);
			if (default_slot) default_slot.d(detaching);
			/*div_binding*/ ctx[6](null);
			mounted = false;
			dispose();
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	const omit_props_names = ["class","element"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	let { class: className = "" } = $$props;
	let { element = null } = $$props;
	const forwardEvents = createEventForwarder(get_current_component());

	function div_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			element = $$value;
			$$invalidate(0, element);
		});
	}

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(3, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('class' in $$new_props) $$invalidate(1, className = $$new_props.class);
		if ('element' in $$new_props) $$invalidate(0, element = $$new_props.element);
		if ('$$scope' in $$new_props) $$invalidate(4, $$scope = $$new_props.$$scope);
	};

	return [element, className, forwardEvents, $$restProps, $$scope, slots, div_binding];
}

class FlyoutSurface extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { class: 1, element: 0 }, add_css);
	}
}

export default FlyoutSurface;