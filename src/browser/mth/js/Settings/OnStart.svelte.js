/* src\browser\mth\$svelte\src\Settings\OnStart.svelte generated by Svelte v3.48.0 */
import {
	SvelteComponentDev,
	add_flush_callback,
	add_location,
	append_dev,
	attr_dev,
	bind,
	binding_callbacks,
	check_outros,
	component_subscribe,
	create_component,
	destroy_component,
	detach_dev,
	dispatch_dev,
	element,
	empty,
	group_outros,
	init,
	insert_dev,
	mount_component,
	safe_not_equal,
	set_store_value,
	set_style,
	space,
	text,
	transition_in,
	transition_out,
	validate_slots,
	validate_store
} from "mth://.svelte/internal";

import {
	RadioButton,
	TextBlock,
	TextBox,
	Button
} from "mth://js/fluent-svelte/index.js";

import { getContext } from "mth://.svelte/internal";
import noFirstTime from "mth://js/nft.js";
const file = "src\\browser\\mth\\$svelte\\src\\Settings\\OnStart.svelte";

// (45:6) <TextBlock>
function create_default_slot_6(ctx) {
	let t;

	const block = {
		c: function create() {
			t = text("Open a new tab");
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(t);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_6.name,
		type: "slot",
		source: "(45:6) <TextBlock>",
		ctx
	});

	return block;
}

// (43:2) <RadioButton bind:group value="new-tab">
function create_default_slot_5(ctx) {
	let div;
	let textblock;
	let current;

	textblock = new TextBlock({
			props: {
				$$slots: { default: [create_default_slot_6] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			div = element("div");
			create_component(textblock.$$.fragment);
			add_location(div, file, 43, 4, 950);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			mount_component(textblock, div, null);
			current = true;
		},
		p: function update(ctx, dirty) {
			const textblock_changes = {};

			if (dirty & /*$$scope*/ 2048) {
				textblock_changes.$$scope = { dirty, ctx };
			}

			textblock.$set(textblock_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(textblock.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(textblock.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			destroy_component(textblock);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_5.name,
		type: "slot",
		source: "(43:2) <RadioButton bind:group value=\\\"new-tab\\\">",
		ctx
	});

	return block;
}

// (52:6) <TextBlock>
function create_default_slot_4(ctx) {
	let t;

	const block = {
		c: function create() {
			t = text("Open the tabs from the previous session");
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(t);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_4.name,
		type: "slot",
		source: "(52:6) <TextBlock>",
		ctx
	});

	return block;
}

// (50:2) <RadioButton bind:group value="last-tabs">
function create_default_slot_3(ctx) {
	let div;
	let textblock;
	let current;

	textblock = new TextBlock({
			props: {
				$$slots: { default: [create_default_slot_4] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			div = element("div");
			create_component(textblock.$$.fragment);
			add_location(div, file, 50, 4, 1116);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			mount_component(textblock, div, null);
			current = true;
		},
		p: function update(ctx, dirty) {
			const textblock_changes = {};

			if (dirty & /*$$scope*/ 2048) {
				textblock_changes.$$scope = { dirty, ctx };
			}

			textblock.$set(textblock_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(textblock.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(textblock.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			destroy_component(textblock);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_3.name,
		type: "slot",
		source: "(50:2) <RadioButton bind:group value=\\\"last-tabs\\\">",
		ctx
	});

	return block;
}

// (59:6) <TextBlock>
function create_default_slot_2(ctx) {
	let t;

	const block = {
		c: function create() {
			t = text("Open a specific page");
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(t);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_2.name,
		type: "slot",
		source: "(59:6) <TextBlock>",
		ctx
	});

	return block;
}

// (57:2) <RadioButton bind:group value="page">
function create_default_slot_1(ctx) {
	let div;
	let textblock;
	let current;

	textblock = new TextBlock({
			props: {
				$$slots: { default: [create_default_slot_2] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			div = element("div");
			create_component(textblock.$$.fragment);
			add_location(div, file, 57, 4, 1302);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			mount_component(textblock, div, null);
			current = true;
		},
		p: function update(ctx, dirty) {
			const textblock_changes = {};

			if (dirty & /*$$scope*/ 2048) {
				textblock_changes.$$scope = { dirty, ctx };
			}

			textblock.$set(textblock_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(textblock.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(textblock.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			destroy_component(textblock);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_1.name,
		type: "slot",
		source: "(57:2) <RadioButton bind:group value=\\\"page\\\">",
		ctx
	});

	return block;
}

// (63:0) {#if group == 'page'}
function create_if_block(ctx) {
	let div;
	let textbox;
	let updating_value;
	let t;
	let button;
	let current;

	function textbox_value_binding(value) {
		/*textbox_value_binding*/ ctx[8](value);
	}

	let textbox_props = {
		placeholder: "The URL of the page that should open."
	};

	if (/*currentUrl*/ ctx[1] !== void 0) {
		textbox_props.value = /*currentUrl*/ ctx[1];
	}

	textbox = new TextBox({ props: textbox_props, $$inline: true });
	binding_callbacks.push(() => bind(textbox, 'value', textbox_value_binding));

	button = new Button({
			props: {
				variant: "accent",
				style: "margin-left: 20px;",
				disabled: !isValidURL(/*currentUrl*/ ctx[1]),
				$$slots: { default: [create_default_slot] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	button.$on("click", /*handleSave*/ ctx[3]);

	const block = {
		c: function create() {
			div = element("div");
			create_component(textbox.$$.fragment);
			t = space();
			create_component(button.$$.fragment);
			attr_dev(div, "class", "s-option");
			set_style(div, "margin-left", "25px");
			add_location(div, file, 63, 2, 1425);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			mount_component(textbox, div, null);
			append_dev(div, t);
			mount_component(button, div, null);
			current = true;
		},
		p: function update(ctx, dirty) {
			const textbox_changes = {};

			if (!updating_value && dirty & /*currentUrl*/ 2) {
				updating_value = true;
				textbox_changes.value = /*currentUrl*/ ctx[1];
				add_flush_callback(() => updating_value = false);
			}

			textbox.$set(textbox_changes);
			const button_changes = {};
			if (dirty & /*currentUrl*/ 2) button_changes.disabled = !isValidURL(/*currentUrl*/ ctx[1]);

			if (dirty & /*$$scope*/ 2048) {
				button_changes.$$scope = { dirty, ctx };
			}

			button.$set(button_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(textbox.$$.fragment, local);
			transition_in(button.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(textbox.$$.fragment, local);
			transition_out(button.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			destroy_component(textbox);
			destroy_component(button);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(63:0) {#if group == 'page'}",
		ctx
	});

	return block;
}

// (66:4) <Button variant="accent" on:click={handleSave} style="margin-left: 20px;" disabled={!isValidURL(currentUrl)}>
function create_default_slot(ctx) {
	let t;

	const block = {
		c: function create() {
			t = text("Save");
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(t);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot.name,
		type: "slot",
		source: "(66:4) <Button variant=\\\"accent\\\" on:click={handleSave} style=\\\"margin-left: 20px;\\\" disabled={!isValidURL(currentUrl)}>",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let div0;
	let radiobutton0;
	let updating_group;
	let t0;
	let div1;
	let radiobutton1;
	let updating_group_1;
	let t1;
	let div2;
	let radiobutton2;
	let updating_group_2;
	let t2;
	let if_block_anchor;
	let current;

	function radiobutton0_group_binding(value) {
		/*radiobutton0_group_binding*/ ctx[5](value);
	}

	let radiobutton0_props = {
		value: "new-tab",
		$$slots: { default: [create_default_slot_5] },
		$$scope: { ctx }
	};

	if (/*group*/ ctx[0] !== void 0) {
		radiobutton0_props.group = /*group*/ ctx[0];
	}

	radiobutton0 = new RadioButton({
			props: radiobutton0_props,
			$$inline: true
		});

	binding_callbacks.push(() => bind(radiobutton0, 'group', radiobutton0_group_binding));

	function radiobutton1_group_binding(value) {
		/*radiobutton1_group_binding*/ ctx[6](value);
	}

	let radiobutton1_props = {
		value: "last-tabs",
		$$slots: { default: [create_default_slot_3] },
		$$scope: { ctx }
	};

	if (/*group*/ ctx[0] !== void 0) {
		radiobutton1_props.group = /*group*/ ctx[0];
	}

	radiobutton1 = new RadioButton({
			props: radiobutton1_props,
			$$inline: true
		});

	binding_callbacks.push(() => bind(radiobutton1, 'group', radiobutton1_group_binding));

	function radiobutton2_group_binding(value) {
		/*radiobutton2_group_binding*/ ctx[7](value);
	}

	let radiobutton2_props = {
		value: "page",
		$$slots: { default: [create_default_slot_1] },
		$$scope: { ctx }
	};

	if (/*group*/ ctx[0] !== void 0) {
		radiobutton2_props.group = /*group*/ ctx[0];
	}

	radiobutton2 = new RadioButton({
			props: radiobutton2_props,
			$$inline: true
		});

	binding_callbacks.push(() => bind(radiobutton2, 'group', radiobutton2_group_binding));
	let if_block = /*group*/ ctx[0] == 'page' && create_if_block(ctx);

	const block = {
		c: function create() {
			div0 = element("div");
			create_component(radiobutton0.$$.fragment);
			t0 = space();
			div1 = element("div");
			create_component(radiobutton1.$$.fragment);
			t1 = space();
			div2 = element("div");
			create_component(radiobutton2.$$.fragment);
			t2 = space();
			if (if_block) if_block.c();
			if_block_anchor = empty();
			attr_dev(div0, "class", "s-option");
			add_location(div0, file, 41, 0, 878);
			attr_dev(div1, "class", "s-option");
			add_location(div1, file, 48, 0, 1042);
			attr_dev(div2, "class", "s-option");
			add_location(div2, file, 55, 0, 1233);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, div0, anchor);
			mount_component(radiobutton0, div0, null);
			insert_dev(target, t0, anchor);
			insert_dev(target, div1, anchor);
			mount_component(radiobutton1, div1, null);
			insert_dev(target, t1, anchor);
			insert_dev(target, div2, anchor);
			mount_component(radiobutton2, div2, null);
			insert_dev(target, t2, anchor);
			if (if_block) if_block.m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const radiobutton0_changes = {};

			if (dirty & /*$$scope*/ 2048) {
				radiobutton0_changes.$$scope = { dirty, ctx };
			}

			if (!updating_group && dirty & /*group*/ 1) {
				updating_group = true;
				radiobutton0_changes.group = /*group*/ ctx[0];
				add_flush_callback(() => updating_group = false);
			}

			radiobutton0.$set(radiobutton0_changes);
			const radiobutton1_changes = {};

			if (dirty & /*$$scope*/ 2048) {
				radiobutton1_changes.$$scope = { dirty, ctx };
			}

			if (!updating_group_1 && dirty & /*group*/ 1) {
				updating_group_1 = true;
				radiobutton1_changes.group = /*group*/ ctx[0];
				add_flush_callback(() => updating_group_1 = false);
			}

			radiobutton1.$set(radiobutton1_changes);
			const radiobutton2_changes = {};

			if (dirty & /*$$scope*/ 2048) {
				radiobutton2_changes.$$scope = { dirty, ctx };
			}

			if (!updating_group_2 && dirty & /*group*/ 1) {
				updating_group_2 = true;
				radiobutton2_changes.group = /*group*/ ctx[0];
				add_flush_callback(() => updating_group_2 = false);
			}

			radiobutton2.$set(radiobutton2_changes);

			if (/*group*/ ctx[0] == 'page') {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*group*/ 1) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(radiobutton0.$$.fragment, local);
			transition_in(radiobutton1.$$.fragment, local);
			transition_in(radiobutton2.$$.fragment, local);
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(radiobutton0.$$.fragment, local);
			transition_out(radiobutton1.$$.fragment, local);
			transition_out(radiobutton2.$$.fragment, local);
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div0);
			destroy_component(radiobutton0);
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(div1);
			destroy_component(radiobutton1);
			if (detaching) detach_dev(t1);
			if (detaching) detach_dev(div2);
			destroy_component(radiobutton2);
			if (detaching) detach_dev(t2);
			if (if_block) if_block.d(detaching);
			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function isValidURL(url) {
	try {
		new URL(url);
		return true;
	} catch(e) {
		return false;
	}
}

function instance($$self, $$props, $$invalidate) {
	let $config;
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('OnStart', slots, []);
	let { update } = $$props;
	let config = getContext('config');
	validate_store(config, 'config');
	component_subscribe($$self, config, value => $$invalidate(9, $config = value));
	let group = $config.behaviour.onStart.type;
	let currentUrl = $config.behaviour.onStart.url ?? '';

	function handleSave() {
		set_store_value(config, $config.behaviour.onStart = { type: 'page', url: currentUrl }, $config);
		update();
	}

	const onGroupChange = noFirstTime(() => {
		if (group == 'page') return; // 'page' is handled by handleSave()
		set_store_value(config, $config.behaviour.onStart = { type: group }, $config);
		update();
	});

	const writable_props = ['update'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<OnStart> was created with unknown prop '${key}'`);
	});

	function radiobutton0_group_binding(value) {
		group = value;
		$$invalidate(0, group);
	}

	function radiobutton1_group_binding(value) {
		group = value;
		$$invalidate(0, group);
	}

	function radiobutton2_group_binding(value) {
		group = value;
		$$invalidate(0, group);
	}

	function textbox_value_binding(value) {
		currentUrl = value;
		$$invalidate(1, currentUrl);
	}

	$$self.$$set = $$props => {
		if ('update' in $$props) $$invalidate(4, update = $$props.update);
	};

	$$self.$capture_state = () => ({
		RadioButton,
		TextBlock,
		TextBox,
		Button,
		getContext,
		noFirstTime,
		update,
		config,
		group,
		currentUrl,
		handleSave,
		onGroupChange,
		isValidURL,
		$config
	});

	$$self.$inject_state = $$props => {
		if ('update' in $$props) $$invalidate(4, update = $$props.update);
		if ('config' in $$props) $$invalidate(2, config = $$props.config);
		if ('group' in $$props) $$invalidate(0, group = $$props.group);
		if ('currentUrl' in $$props) $$invalidate(1, currentUrl = $$props.currentUrl);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*group*/ 1) {
			$: {
				group;
				onGroupChange();
			}
		}
	};

	return [
		group,
		currentUrl,
		config,
		handleSave,
		update,
		radiobutton0_group_binding,
		radiobutton1_group_binding,
		radiobutton2_group_binding,
		textbox_value_binding
	];
}

class OnStart extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, { update: 4 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "OnStart",
			options,
			id: create_fragment.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*update*/ ctx[4] === undefined && !('update' in props)) {
			console.warn("<OnStart> was created without expected prop 'update'");
		}
	}

	get update() {
		throw new Error("<OnStart>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set update(value) {
		throw new Error("<OnStart>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

export default OnStart;