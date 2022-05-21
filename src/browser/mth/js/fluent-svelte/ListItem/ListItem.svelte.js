/* $svelte\fluent-svelte-raw\ListItem\ListItem.svelte generated by Svelte v3.46.4 */
import {
	SvelteComponent,
	action_destroyer,
	append,
	append_styles,
	assign,
	binding_callbacks,
	check_outros,
	compute_rest_props,
	create_component,
	create_slot,
	destroy_component,
	detach,
	element as element_1,
	empty,
	exclude_internal_props,
	get_all_dirty_from_scope,
	get_slot_changes,
	get_spread_update,
	group_outros,
	init,
	insert,
	listen,
	mount_component,
	run_all,
	safe_not_equal,
	set_attributes,
	space,
	toggle_class,
	transition_in,
	transition_out,
	update_slot_base
} from "mth://.svelte/internal";

import { createEventDispatcher } from "mth://.svelte/internal";
import { get_current_component } from "mth://.svelte/internal";
import { createEventForwarder } from "../internal";
import TextBlock from "../TextBlock/TextBlock.svelte";

function add_css(target) {
	append_styles(target, "svelte-1ye4o7x", ".list-item.svelte-1ye4o7x{align-items:center;background-color:var(--fds-subtle-fill-transparent);block-size:34px;border-radius:var(--fds-control-corner-radius);box-sizing:border-box;color:var(--fds-text-primary);cursor:default;display:flex;flex:0 0 auto;inline-size:calc(100% - 10px);margin:3px 5px;outline:none;padding-inline:12px;position:relative;text-decoration:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.list-item.svelte-1ye4o7x:before{background-color:var(--fds-accent-default);block-size:16px;border-radius:3px;content:\"\";inline-size:3px;inset-inline-start:0;opacity:0;position:absolute;transform:scaleY(0);transition:transform var(--fds-control-fast-duration) var(--fds-control-fast-out-slow-in-easing)}.list-item.selected.svelte-1ye4o7x:before{opacity:1;transform:scaleY(1)}.list-item.svelte-1ye4o7x:focus-visible{box-shadow:var(--fds-focus-stroke)}.list-item.selected.svelte-1ye4o7x,.list-item.svelte-1ye4o7x:hover{background-color:var(--fds-subtle-fill-secondary)}.list-item.svelte-1ye4o7x:active{background-color:var(--fds-subtle-fill-tertiary);color:var(--fds-text-secondary)}.list-item.svelte-1ye4o7x:active:before{transform:scaleY(.625)}.list-item.disabled.svelte-1ye4o7x{background-color:var(--fds-subtle-fill-transparent);color:var(--fds-text-disabled);pointer-events:none}.list-item.disabled.selected.svelte-1ye4o7x{background-color:var(--fds-subtle-fill-secondary)}.list-item.disabled.selected.svelte-1ye4o7x:before{background-color:var(--fds-accent-disabled)}.list-item.svelte-1ye4o7x>svg{fill:currentColor;-webkit-margin-end:16px;block-size:auto;inline-size:16px;margin-inline-end:16px}");
}

const get_icon_slot_changes_1 = dirty => ({});
const get_icon_slot_context_1 = ctx => ({});
const get_icon_slot_changes = dirty => ({});
const get_icon_slot_context = ctx => ({});

// (56:0) {:else}
function create_else_block(ctx) {
	let li;
	let t;
	let textblock;
	let li_tabindex_value;
	let li_class_value;
	let forwardEvents_action;
	let current;
	let mounted;
	let dispose;
	const icon_slot_template = /*#slots*/ ctx[8].icon;
	const icon_slot = create_slot(icon_slot_template, ctx, /*$$scope*/ ctx[11], get_icon_slot_context_1);

	textblock = new TextBlock({
			props: {
				$$slots: { default: [create_default_slot_1] },
				$$scope: { ctx }
			}
		});

	let li_levels = [
		{
			tabindex: li_tabindex_value = /*disabled*/ ctx[2] ? -1 : 0
		},
		{ "aria-selected": /*selected*/ ctx[1] },
		{
			class: li_class_value = "list-item " + /*className*/ ctx[5]
		},
		{ href: /*href*/ ctx[3] },
		{ role: /*role*/ ctx[4] },
		/*$$restProps*/ ctx[7]
	];

	let li_data = {};

	for (let i = 0; i < li_levels.length; i += 1) {
		li_data = assign(li_data, li_levels[i]);
	}

	return {
		c() {
			li = element_1("li");
			if (icon_slot) icon_slot.c();
			t = space();
			create_component(textblock.$$.fragment);
			set_attributes(li, li_data);
			toggle_class(li, "selected", /*selected*/ ctx[1]);
			toggle_class(li, "disabled", /*disabled*/ ctx[2]);
			toggle_class(li, "svelte-1ye4o7x", true);
		},
		m(target, anchor) {
			insert(target, li, anchor);

			if (icon_slot) {
				icon_slot.m(li, null);
			}

			append(li, t);
			mount_component(textblock, li, null);
			/*li_binding*/ ctx[10](li);
			current = true;

			if (!mounted) {
				dispose = [
					action_destroyer(forwardEvents_action = /*forwardEvents*/ ctx[6].call(null, li)),
					listen(li, "keydown", handleKeyDown)
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (icon_slot) {
				if (icon_slot.p && (!current || dirty & /*$$scope*/ 2048)) {
					update_slot_base(
						icon_slot,
						icon_slot_template,
						ctx,
						/*$$scope*/ ctx[11],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[11])
						: get_slot_changes(icon_slot_template, /*$$scope*/ ctx[11], dirty, get_icon_slot_changes_1),
						get_icon_slot_context_1
					);
				}
			}

			const textblock_changes = {};

			if (dirty & /*$$scope*/ 2048) {
				textblock_changes.$$scope = { dirty, ctx };
			}

			textblock.$set(textblock_changes);

			set_attributes(li, li_data = get_spread_update(li_levels, [
				(!current || dirty & /*disabled*/ 4 && li_tabindex_value !== (li_tabindex_value = /*disabled*/ ctx[2] ? -1 : 0)) && { tabindex: li_tabindex_value },
				(!current || dirty & /*selected*/ 2) && { "aria-selected": /*selected*/ ctx[1] },
				(!current || dirty & /*className*/ 32 && li_class_value !== (li_class_value = "list-item " + /*className*/ ctx[5])) && { class: li_class_value },
				(!current || dirty & /*href*/ 8) && { href: /*href*/ ctx[3] },
				(!current || dirty & /*role*/ 16) && { role: /*role*/ ctx[4] },
				dirty & /*$$restProps*/ 128 && /*$$restProps*/ ctx[7]
			]));

			toggle_class(li, "selected", /*selected*/ ctx[1]);
			toggle_class(li, "disabled", /*disabled*/ ctx[2]);
			toggle_class(li, "svelte-1ye4o7x", true);
		},
		i(local) {
			if (current) return;
			transition_in(icon_slot, local);
			transition_in(textblock.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(icon_slot, local);
			transition_out(textblock.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(li);
			if (icon_slot) icon_slot.d(detaching);
			destroy_component(textblock);
			/*li_binding*/ ctx[10](null);
			mounted = false;
			run_all(dispose);
		}
	};
}

// (37:0) {#if href && !disabled}
function create_if_block(ctx) {
	let a;
	let t;
	let textblock;
	let a_tabindex_value;
	let a_class_value;
	let forwardEvents_action;
	let current;
	let mounted;
	let dispose;
	const icon_slot_template = /*#slots*/ ctx[8].icon;
	const icon_slot = create_slot(icon_slot_template, ctx, /*$$scope*/ ctx[11], get_icon_slot_context);

	textblock = new TextBlock({
			props: {
				$$slots: { default: [create_default_slot] },
				$$scope: { ctx }
			}
		});

	let a_levels = [
		{
			tabindex: a_tabindex_value = /*disabled*/ ctx[2] ? -1 : 0
		},
		{ "aria-selected": /*selected*/ ctx[1] },
		{
			class: a_class_value = "list-item " + /*className*/ ctx[5]
		},
		{ href: /*href*/ ctx[3] },
		{ role: /*role*/ ctx[4] },
		/*$$restProps*/ ctx[7]
	];

	let a_data = {};

	for (let i = 0; i < a_levels.length; i += 1) {
		a_data = assign(a_data, a_levels[i]);
	}

	return {
		c() {
			a = element_1("a");
			if (icon_slot) icon_slot.c();
			t = space();
			create_component(textblock.$$.fragment);
			set_attributes(a, a_data);
			toggle_class(a, "selected", /*selected*/ ctx[1]);
			toggle_class(a, "disabled", /*disabled*/ ctx[2]);
			toggle_class(a, "svelte-1ye4o7x", true);
		},
		m(target, anchor) {
			insert(target, a, anchor);

			if (icon_slot) {
				icon_slot.m(a, null);
			}

			append(a, t);
			mount_component(textblock, a, null);
			/*a_binding*/ ctx[9](a);
			current = true;

			if (!mounted) {
				dispose = [
					action_destroyer(forwardEvents_action = /*forwardEvents*/ ctx[6].call(null, a)),
					listen(a, "keydown", handleKeyDown)
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (icon_slot) {
				if (icon_slot.p && (!current || dirty & /*$$scope*/ 2048)) {
					update_slot_base(
						icon_slot,
						icon_slot_template,
						ctx,
						/*$$scope*/ ctx[11],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[11])
						: get_slot_changes(icon_slot_template, /*$$scope*/ ctx[11], dirty, get_icon_slot_changes),
						get_icon_slot_context
					);
				}
			}

			const textblock_changes = {};

			if (dirty & /*$$scope*/ 2048) {
				textblock_changes.$$scope = { dirty, ctx };
			}

			textblock.$set(textblock_changes);

			set_attributes(a, a_data = get_spread_update(a_levels, [
				(!current || dirty & /*disabled*/ 4 && a_tabindex_value !== (a_tabindex_value = /*disabled*/ ctx[2] ? -1 : 0)) && { tabindex: a_tabindex_value },
				(!current || dirty & /*selected*/ 2) && { "aria-selected": /*selected*/ ctx[1] },
				(!current || dirty & /*className*/ 32 && a_class_value !== (a_class_value = "list-item " + /*className*/ ctx[5])) && { class: a_class_value },
				(!current || dirty & /*href*/ 8) && { href: /*href*/ ctx[3] },
				(!current || dirty & /*role*/ 16) && { role: /*role*/ ctx[4] },
				dirty & /*$$restProps*/ 128 && /*$$restProps*/ ctx[7]
			]));

			toggle_class(a, "selected", /*selected*/ ctx[1]);
			toggle_class(a, "disabled", /*disabled*/ ctx[2]);
			toggle_class(a, "svelte-1ye4o7x", true);
		},
		i(local) {
			if (current) return;
			transition_in(icon_slot, local);
			transition_in(textblock.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(icon_slot, local);
			transition_out(textblock.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(a);
			if (icon_slot) icon_slot.d(detaching);
			destroy_component(textblock);
			/*a_binding*/ ctx[9](null);
			mounted = false;
			run_all(dispose);
		}
	};
}

// (71:2) <TextBlock>
function create_default_slot_1(ctx) {
	let current;
	const default_slot_template = /*#slots*/ ctx[8].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[11], null);

	return {
		c() {
			if (default_slot) default_slot.c();
		},
		m(target, anchor) {
			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 2048)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[11],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[11])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[11], dirty, null),
						null
					);
				}
			}
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
			if (default_slot) default_slot.d(detaching);
		}
	};
}

// (52:2) <TextBlock>
function create_default_slot(ctx) {
	let current;
	const default_slot_template = /*#slots*/ ctx[8].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[11], null);

	return {
		c() {
			if (default_slot) default_slot.c();
		},
		m(target, anchor) {
			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 2048)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[11],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[11])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[11], dirty, null),
						null
					);
				}
			}
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
			if (default_slot) default_slot.d(detaching);
		}
	};
}

function create_fragment(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block, create_else_block];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*href*/ ctx[3] && !/*disabled*/ ctx[2]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx, -1);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	return {
		c() {
			if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if_blocks[current_block_type_index].m(target, anchor);
			insert(target, if_block_anchor, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx, dirty);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(if_block_anchor.parentNode, if_block_anchor);
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if_blocks[current_block_type_index].d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

function handleKeyDown({ key, target }) {
	if (key === "Enter") target.click();
}

function instance($$self, $$props, $$invalidate) {
	const omit_props_names = ["selected","disabled","href","role","class","element"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	let { selected = false } = $$props;
	let { disabled = false } = $$props;
	let { href = "" } = $$props;
	let { role = "listitem" } = $$props;
	let { class: className = "" } = $$props;
	let { element = null } = $$props;
	const forwardEvents = createEventForwarder(get_current_component(), ["select"]);
	const dispatch = createEventDispatcher();

	function a_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			element = $$value;
			$$invalidate(0, element);
		});
	}

	function li_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			element = $$value;
			$$invalidate(0, element);
		});
	}

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(7, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('selected' in $$new_props) $$invalidate(1, selected = $$new_props.selected);
		if ('disabled' in $$new_props) $$invalidate(2, disabled = $$new_props.disabled);
		if ('href' in $$new_props) $$invalidate(3, href = $$new_props.href);
		if ('role' in $$new_props) $$invalidate(4, role = $$new_props.role);
		if ('class' in $$new_props) $$invalidate(5, className = $$new_props.class);
		if ('element' in $$new_props) $$invalidate(0, element = $$new_props.element);
		if ('$$scope' in $$new_props) $$invalidate(11, $$scope = $$new_props.$$scope);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*selected*/ 2) {
			$: if (selected) dispatch("select");
		}
	};

	return [
		element,
		selected,
		disabled,
		href,
		role,
		className,
		forwardEvents,
		$$restProps,
		slots,
		a_binding,
		li_binding,
		$$scope
	];
}

class ListItem extends SvelteComponent {
	constructor(options) {
		super();

		init(
			this,
			options,
			instance,
			create_fragment,
			safe_not_equal,
			{
				selected: 1,
				disabled: 2,
				href: 3,
				role: 4,
				class: 5,
				element: 0
			},
			add_css
		);
	}
}

export default ListItem;