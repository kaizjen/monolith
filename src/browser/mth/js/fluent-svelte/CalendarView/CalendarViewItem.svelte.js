/* $svelte\fluent-svelte-raw\CalendarView\CalendarViewItem.svelte generated by Svelte v3.46.4 */
import {
	SvelteComponent,
	append,
	append_styles,
	assign,
	attr,
	bubble,
	compute_rest_props,
	create_slot,
	detach,
	element,
	exclude_internal_props,
	get_all_dirty_from_scope,
	get_slot_changes,
	get_spread_update,
	init,
	insert,
	listen,
	run_all,
	safe_not_equal,
	set_attributes,
	set_data,
	space,
	text,
	toggle_class,
	transition_in,
	transition_out,
	update_slot_base
} from "mth://.svelte/internal";

function add_css(target) {
	append_styles(target, "svelte-13n7j23", ".calendar-view-item.svelte-13n7j23.svelte-13n7j23{align-items:center;background-color:var(--fds-subtle-fill-transparent);border:1px solid transparent;border-radius:50%;box-sizing:border-box;color:var(--fds-text-primary);display:inline-flex;font-family:var(--fds-font-family-text);font-size:14px;font-weight:400;justify-content:center;line-height:20px;outline:none;padding:0;position:relative;text-align:center;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.calendar-view-item.svelte-13n7j23.svelte-13n7j23:focus-visible{box-shadow:var(--fds-focus-stroke)}.calendar-view-item.svelte-13n7j23.svelte-13n7j23:hover{background-color:var(--fds-subtle-fill-secondary)}.calendar-view-item.svelte-13n7j23.svelte-13n7j23:active{background-color:var(--fds-subtle-fill-tertiary)}.calendar-view-item.out-of-range.svelte-13n7j23.svelte-13n7j23,.calendar-view-item.svelte-13n7j23.svelte-13n7j23:active{color:var(--fds-text-secondary)}.calendar-view-item.out-of-range.svelte-13n7j23.svelte-13n7j23:active{color:var(--fds-text-tertiary)}.calendar-view-item.disabled.svelte-13n7j23.svelte-13n7j23{background-color:var(--fds-subtle-fill-disabled);color:var(--fds-text-disabled)}.calendar-view-item.disabled.blackout.svelte-13n7j23.svelte-13n7j23:after{content:none}.calendar-view-item.blackout.svelte-13n7j23.svelte-13n7j23{pointer-events:none}.calendar-view-item.blackout.svelte-13n7j23.svelte-13n7j23:after{-webkit-border-before:1px solid var(--fds-control-strong-stroke-default);block-size:1px;border-block-start:1px solid var(--fds-control-strong-stroke-default);content:\"\";inline-size:26px;position:absolute;transform:matrix(-.71,-.71,-.71,.71,0,0);transform-origin:center}.calendar-view-item.type-day.svelte-13n7j23.svelte-13n7j23{block-size:40px;inline-size:40px}.calendar-view-item.type-day.svelte-13n7j23 small.svelte-13n7j23{inset-block-start:2px}.calendar-view-item.type-month-year.svelte-13n7j23.svelte-13n7j23{block-size:56px;inline-size:56px}.calendar-view-item.type-month-year.svelte-13n7j23 small.svelte-13n7j23{inset-block-start:9.58px}.calendar-view-item.selected.svelte-13n7j23.svelte-13n7j23{border:1px solid var(--fds-accent-default);color:var(--fds-accent-text-primary)}.calendar-view-item.selected.svelte-13n7j23.svelte-13n7j23:hover{background-color:var(--fds-subtle-fill-secondary);border-color:var(--fds-accent-secondary)}.calendar-view-item.selected.svelte-13n7j23.svelte-13n7j23:active{background-color:var(--fds-subtle-fill-tertiary);border-color:var(--fds-accent-tertiary)}.calendar-view-item.selected.disabled.svelte-13n7j23.svelte-13n7j23{background-color:var(--fds-subtle-fill-disabled);border-color:var(--fds-accent-disabled);color:var(--fds-accent-text-disabled)}.calendar-view-item.selected.current.svelte-13n7j23.svelte-13n7j23{box-shadow:inset 0 0 0 1px var(--fds-text-on-accent-primary)}.calendar-view-item.selected.current.svelte-13n7j23.svelte-13n7j23:focus-visible{box-shadow:inset 0 0 0 1px var(--fds-text-on-accent-primary),var(--fds-focus-stroke)}.calendar-view-item.selected.blackout.svelte-13n7j23.svelte-13n7j23:after{border-block-start-color:var(--fds-accent-tertiary)}.calendar-view-item.current.svelte-13n7j23.svelte-13n7j23{background-color:var(--fds-accent-default);color:var(--fds-text-on-accent-primary)}.calendar-view-item.current.svelte-13n7j23.svelte-13n7j23:hover{background-color:var(--fds-accent-secondary)}.calendar-view-item.current.svelte-13n7j23.svelte-13n7j23:active{background-color:var(--fds-accent-tertiary);color:var(--fds-text-on-accent-secondary)}.calendar-view-item.current.disabled.svelte-13n7j23.svelte-13n7j23{background-color:var(--fds-accent-disabled)}.calendar-view-item.current.blackout.svelte-13n7j23.svelte-13n7j23:after{border-block-start-color:var(--fds-text-on-accent-primary)}.calendar-view-item.svelte-13n7j23 small.svelte-13n7j23{color:inherit;font-family:var(--fds-font-family-small);font-size:8px;font-weight:400;inline-size:100%;letter-spacing:.04em;line-height:12px;padding-inline:1px;pointer-events:none;position:absolute;text-align:center}");
}

// (24:1) {#if header}
function create_if_block(ctx) {
	let small;
	let t;

	return {
		c() {
			small = element("small");
			t = text(/*header*/ ctx[6]);
			attr(small, "class", "svelte-13n7j23");
		},
		m(target, anchor) {
			insert(target, small, anchor);
			append(small, t);
		},
		p(ctx, dirty) {
			if (dirty & /*header*/ 64) set_data(t, /*header*/ ctx[6]);
		},
		d(detaching) {
			if (detaching) detach(small);
		}
	};
}

function create_fragment(ctx) {
	let button;
	let t;
	let button_class_value;
	let button_disabled_value;
	let current;
	let mounted;
	let dispose;
	let if_block = /*header*/ ctx[6] && create_if_block(ctx);
	const default_slot_template = /*#slots*/ ctx[9].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[8], null);

	let button_levels = [
		{ type: "button" },
		{
			class: button_class_value = "calendar-view-item type-" + (/*variant*/ ctx[5] === 'day' ? 'day' : 'month-year')
		},
		{
			disabled: button_disabled_value = /*disabled*/ ctx[1] || /*blackout*/ ctx[2]
		},
		{ "aria-selected": /*selected*/ ctx[0] },
		/*$$restProps*/ ctx[7]
	];

	let button_data = {};

	for (let i = 0; i < button_levels.length; i += 1) {
		button_data = assign(button_data, button_levels[i]);
	}

	return {
		c() {
			button = element("button");
			if (if_block) if_block.c();
			t = space();
			if (default_slot) default_slot.c();
			set_attributes(button, button_data);
			toggle_class(button, "selected", /*selected*/ ctx[0]);
			toggle_class(button, "current", /*current*/ ctx[3]);
			toggle_class(button, "blackout", /*blackout*/ ctx[2]);
			toggle_class(button, "disabled", /*disabled*/ ctx[1]);
			toggle_class(button, "out-of-range", /*outOfRange*/ ctx[4]);
			toggle_class(button, "svelte-13n7j23", true);
		},
		m(target, anchor) {
			insert(target, button, anchor);
			if (if_block) if_block.m(button, null);
			append(button, t);

			if (default_slot) {
				default_slot.m(button, null);
			}

			if (button.autofocus) button.focus();
			current = true;

			if (!mounted) {
				dispose = [
					listen(button, "click", /*click_handler*/ ctx[10]),
					listen(button, "keydown", /*keydown_handler*/ ctx[11])
				];

				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (/*header*/ ctx[6]) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					if_block.m(button, t);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}

			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 256)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[8],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[8])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[8], dirty, null),
						null
					);
				}
			}

			set_attributes(button, button_data = get_spread_update(button_levels, [
				{ type: "button" },
				(!current || dirty & /*variant*/ 32 && button_class_value !== (button_class_value = "calendar-view-item type-" + (/*variant*/ ctx[5] === 'day' ? 'day' : 'month-year'))) && { class: button_class_value },
				(!current || dirty & /*disabled, blackout*/ 6 && button_disabled_value !== (button_disabled_value = /*disabled*/ ctx[1] || /*blackout*/ ctx[2])) && { disabled: button_disabled_value },
				(!current || dirty & /*selected*/ 1) && { "aria-selected": /*selected*/ ctx[0] },
				dirty & /*$$restProps*/ 128 && /*$$restProps*/ ctx[7]
			]));

			toggle_class(button, "selected", /*selected*/ ctx[0]);
			toggle_class(button, "current", /*current*/ ctx[3]);
			toggle_class(button, "blackout", /*blackout*/ ctx[2]);
			toggle_class(button, "disabled", /*disabled*/ ctx[1]);
			toggle_class(button, "out-of-range", /*outOfRange*/ ctx[4]);
			toggle_class(button, "svelte-13n7j23", true);
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
			if (if_block) if_block.d();
			if (default_slot) default_slot.d(detaching);
			mounted = false;
			run_all(dispose);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	const omit_props_names = ["selected","disabled","blackout","current","outOfRange","variant","header"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	let { selected = false } = $$props;
	let { disabled = false } = $$props;
	let { blackout = false } = $$props;
	let { current = false } = $$props;
	let { outOfRange = false } = $$props;
	let { variant = "day" } = $$props;
	let { header = "" } = $$props;

	function click_handler(event) {
		bubble.call(this, $$self, event);
	}

	function keydown_handler(event) {
		bubble.call(this, $$self, event);
	}

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(7, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('selected' in $$new_props) $$invalidate(0, selected = $$new_props.selected);
		if ('disabled' in $$new_props) $$invalidate(1, disabled = $$new_props.disabled);
		if ('blackout' in $$new_props) $$invalidate(2, blackout = $$new_props.blackout);
		if ('current' in $$new_props) $$invalidate(3, current = $$new_props.current);
		if ('outOfRange' in $$new_props) $$invalidate(4, outOfRange = $$new_props.outOfRange);
		if ('variant' in $$new_props) $$invalidate(5, variant = $$new_props.variant);
		if ('header' in $$new_props) $$invalidate(6, header = $$new_props.header);
		if ('$$scope' in $$new_props) $$invalidate(8, $$scope = $$new_props.$$scope);
	};

	return [
		selected,
		disabled,
		blackout,
		current,
		outOfRange,
		variant,
		header,
		$$restProps,
		$$scope,
		slots,
		click_handler,
		keydown_handler
	];
}

class CalendarViewItem extends SvelteComponent {
	constructor(options) {
		super();

		init(
			this,
			options,
			instance,
			create_fragment,
			safe_not_equal,
			{
				selected: 0,
				disabled: 1,
				blackout: 2,
				current: 3,
				outOfRange: 4,
				variant: 5,
				header: 6
			},
			add_css
		);
	}
}

export default CalendarViewItem;