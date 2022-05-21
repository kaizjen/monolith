/* $svelte\fluent-svelte-raw\MenuFlyout\MenuFlyoutDivider.svelte generated by Svelte v3.46.4 */
import {
	SvelteComponent,
	append_styles,
	assign,
	binding_callbacks,
	compute_rest_props,
	detach,
	element as element_1,
	exclude_internal_props,
	get_spread_update,
	init,
	insert,
	noop,
	safe_not_equal,
	set_attributes,
	toggle_class
} from "mth://.svelte/internal";

function add_css(target) {
	append_styles(target, "svelte-1fs8gxj", ".menu-flyout-divider.svelte-1fs8gxj{-webkit-border-before:1px solid var(--fds-divider-stroke-default);block-size:1px;border:none;border-block-start:1px solid var(--fds-divider-stroke-default);inline-size:100%;margin-block:2px}");
}

function create_fragment(ctx) {
	let hr;
	let hr_class_value;

	let hr_levels = [
		{
			class: hr_class_value = "menu-flyout-divider " + /*className*/ ctx[1]
		},
		/*$$restProps*/ ctx[2]
	];

	let hr_data = {};

	for (let i = 0; i < hr_levels.length; i += 1) {
		hr_data = assign(hr_data, hr_levels[i]);
	}

	return {
		c() {
			hr = element_1("hr");
			set_attributes(hr, hr_data);
			toggle_class(hr, "svelte-1fs8gxj", true);
		},
		m(target, anchor) {
			insert(target, hr, anchor);
			/*hr_binding*/ ctx[3](hr);
		},
		p(ctx, [dirty]) {
			set_attributes(hr, hr_data = get_spread_update(hr_levels, [
				dirty & /*className*/ 2 && hr_class_value !== (hr_class_value = "menu-flyout-divider " + /*className*/ ctx[1]) && { class: hr_class_value },
				dirty & /*$$restProps*/ 4 && /*$$restProps*/ ctx[2]
			]));

			toggle_class(hr, "svelte-1fs8gxj", true);
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(hr);
			/*hr_binding*/ ctx[3](null);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	const omit_props_names = ["class","element"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { class: className = "" } = $$props;
	let { element = null } = $$props;

	function hr_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			element = $$value;
			$$invalidate(0, element);
		});
	}

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(2, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('class' in $$new_props) $$invalidate(1, className = $$new_props.class);
		if ('element' in $$new_props) $$invalidate(0, element = $$new_props.element);
	};

	return [element, className, $$restProps, hr_binding];
}

class MenuFlyoutDivider extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { class: 1, element: 0 }, add_css);
	}
}

export default MenuFlyoutDivider;