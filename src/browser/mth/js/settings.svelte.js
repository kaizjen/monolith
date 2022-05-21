/* src\browser\mth\$svelte\src\settings.svelte generated by Svelte v3.48.0 */
import {
	SvelteComponentDev,
	add_flush_callback,
	add_location,
	append_dev,
	append_styles,
	attr_dev,
	bind,
	binding_callbacks,
	check_outros,
	component_subscribe,
	create_component,
	destroy_component,
	destroy_each,
	detach_dev,
	dispatch_dev,
	element,
	empty,
	globals,
	group_outros,
	handle_promise,
	init,
	insert_dev,
	is_function,
	mount_component,
	noop,
	safe_not_equal,
	set_data_dev,
	set_store_value,
	set_style,
	space,
	text,
	transition_in,
	transition_out,
	update_await_block_branch,
	validate_each_argument,
	validate_slots,
	validate_store
} from "mth://.svelte/internal";

const { console: console_1 } = globals;

import {
	ListItem,
	TextBlock,
	TextBox,
	Flyout,
	ProgressRing
} from "mth://js/fluent-svelte/index.js";

import { onMount, setContext } from "mth://.svelte/internal";
import { writable } from "mth://.svelte/store";
import Appearance from "./Settings/Appearance.svelte";
import Privacy from "./Settings/Privacy.svelte";
import SearchEngines from "./Settings/SearchEngines.svelte";
import OnStart from "./Settings/OnStart.svelte";
import Downloads from "./Settings/Downloads.svelte";
const file = "src\\browser\\mth\\$svelte\\src\\settings.svelte";

function add_css(target) {
	append_styles(target, "svelte-12ohqlm", ":root{--menu-width-value:7cm}@media(prefers-color-scheme: light){:root{--default-gray:#c9c9c9}}@media(prefers-color-scheme: dark){:root{--default-gray:gray}}aside.svelte-12ohqlm{padding-top:20px;border-right:1px solid var(--default-gray);width:var(--menu-width-value);flex-grow:4;position:absolute;height:100%;display:flex;flex-direction:column;align-items:center}main.svelte-12ohqlm{overflow-y:auto;overflow-x:auto;position:absolute;left:var(--menu-width-value);height:100%;width:calc(100% - var(--menu-width-value));display:flex;justify-content:center;align-items:baseline}.content.svelte-12ohqlm{width:18cm;padding-top:30px}section.svelte-12ohqlm{display:block;border:1px solid var(--default-gray);border-radius:8px;padding:6px;margin-bottom:40px}.absolute-center.svelte-12ohqlm{position:fixed;display:flex;width:100%;height:100%;justify-content:center;align-items:center;top:0;left:0;z-index:999}");
}

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[13] = list[i];
	child_ctx[14] = list;
	child_ctx[15] = i;
	return child_ctx;
}

function get_each_context_1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[13] = list[i];
	child_ctx[17] = i;
	return child_ctx;
}

// (142:4) <Flyout placement="bottom" alignment="start" bind:open={unsupportedFlyoutOpened}>
function create_default_slot_2(ctx) {
	let textbox;
	let current;

	textbox = new TextBox({
			props: {
				type: "search",
				placeholder: "Search settings..."
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(textbox.$$.fragment);
		},
		m: function mount(target, anchor) {
			mount_component(textbox, target, anchor);
			current = true;
		},
		p: noop,
		i: function intro(local) {
			if (current) return;
			transition_in(textbox.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(textbox.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(textbox, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_2.name,
		type: "slot",
		source: "(142:4) <Flyout placement=\\\"bottom\\\" alignment=\\\"start\\\" bind:open={unsupportedFlyoutOpened}>",
		ctx
	});

	return block;
}

// (144:6) <svelte:fragment slot="flyout">
function create_flyout_slot(ctx) {
	let t;

	const block = {
		c: function create() {
			t = text("This feature is unsupported.");
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
		id: create_flyout_slot.name,
		type: "slot",
		source: "(144:6) <svelte:fragment slot=\\\"flyout\\\">",
		ctx
	});

	return block;
}

// (151:4) <ListItem        selected={checkIfInCenter(section.element, i == settingsSections.length-1 ? 'last' : (i == 0 ? 'first' : null), scrollTag)}        on:click={scrollToElementF(section.element)}      >
function create_default_slot_1(ctx) {
	let t_value = /*section*/ ctx[13].name + "";
	let t;

	const block = {
		c: function create() {
			t = text(t_value);
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*settingsSections*/ 8 && t_value !== (t_value = /*section*/ ctx[13].name + "")) set_data_dev(t, t_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(t);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_1.name,
		type: "slot",
		source: "(151:4) <ListItem        selected={checkIfInCenter(section.element, i == settingsSections.length-1 ? 'last' : (i == 0 ? 'first' : null), scrollTag)}        on:click={scrollToElementF(section.element)}      >",
		ctx
	});

	return block;
}

// (150:2) {#each settingsSections as section, i}
function create_each_block_1(ctx) {
	let listitem;
	let current;

	listitem = new ListItem({
			props: {
				selected: /*checkIfInCenter*/ ctx[6](
					/*section*/ ctx[13].element,
					/*i*/ ctx[17] == /*settingsSections*/ ctx[3].length - 1
					? 'last'
					: /*i*/ ctx[17] == 0 ? 'first' : null,
					/*scrollTag*/ ctx[0]
				),
				$$slots: { default: [create_default_slot_1] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	listitem.$on("click", function () {
		if (is_function(/*scrollToElementF*/ ctx[7](/*section*/ ctx[13].element))) /*scrollToElementF*/ ctx[7](/*section*/ ctx[13].element).apply(this, arguments);
	});

	const block = {
		c: function create() {
			create_component(listitem.$$.fragment);
		},
		m: function mount(target, anchor) {
			mount_component(listitem, target, anchor);
			current = true;
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
			const listitem_changes = {};

			if (dirty & /*settingsSections, scrollTag*/ 9) listitem_changes.selected = /*checkIfInCenter*/ ctx[6](
				/*section*/ ctx[13].element,
				/*i*/ ctx[17] == /*settingsSections*/ ctx[3].length - 1
				? 'last'
				: /*i*/ ctx[17] == 0 ? 'first' : null,
				/*scrollTag*/ ctx[0]
			);

			if (dirty & /*$$scope, settingsSections*/ 262152) {
				listitem_changes.$$scope = { dirty, ctx };
			}

			listitem.$set(listitem_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(listitem.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(listitem.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(listitem, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block_1.name,
		type: "each",
		source: "(150:2) {#each settingsSections as section, i}",
		ctx
	});

	return block;
}

// (1:0) <style>    :root {      --menu-width-value: 7cm;    }
function create_catch_block(ctx) {
	const block = {
		c: noop,
		m: noop,
		p: noop,
		i: noop,
		o: noop,
		d: noop
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_catch_block.name,
		type: "catch",
		source: "(1:0) <style>    :root {      --menu-width-value: 7cm;    }",
		ctx
	});

	return block;
}

// (163:4) {:then _}
function create_then_block(ctx) {
	let each_1_anchor;
	let current;
	let each_value = /*settingsSections*/ ctx[3];
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	const block = {
		c: function create() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();
		},
		m: function mount(target, anchor) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			insert_dev(target, each_1_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			if (dirty & /*settingsSections*/ 8) {
				each_value = /*settingsSections*/ ctx[3];
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o: function outro(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d: function destroy(detaching) {
			destroy_each(each_blocks, detaching);
			if (detaching) detach_dev(each_1_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_then_block.name,
		type: "then",
		source: "(163:4) {:then _}",
		ctx
	});

	return block;
}

// (165:8) <TextBlock variant="titleLarge" style="margin-bottom: 15px;">
function create_default_slot(ctx) {
	let t_value = /*section*/ ctx[13].name + "";
	let t;

	const block = {
		c: function create() {
			t = text(t_value);
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*settingsSections*/ 8 && t_value !== (t_value = /*section*/ ctx[13].name + "")) set_data_dev(t, t_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(t);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot.name,
		type: "slot",
		source: "(165:8) <TextBlock variant=\\\"titleLarge\\\" style=\\\"margin-bottom: 15px;\\\">",
		ctx
	});

	return block;
}

// (164:6) {#each settingsSections as section}
function create_each_block(ctx) {
	let textblock;
	let t0;
	let section;
	let switch_instance;
	let t1;
	let each_value = /*each_value*/ ctx[14];
	let section_index = /*section_index*/ ctx[15];
	let current;

	textblock = new TextBlock({
			props: {
				variant: "titleLarge",
				style: "margin-bottom: 15px;",
				$$slots: { default: [create_default_slot] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	var switch_value = /*section*/ ctx[13].component;

	function switch_props(ctx) {
		return { $$inline: true };
	}

	if (switch_value) {
		switch_instance = new switch_value(switch_props(ctx));
	}

	const assign_section = () => /*section_binding*/ ctx[9](section, each_value, section_index);
	const unassign_section = () => /*section_binding*/ ctx[9](null, each_value, section_index);

	const block = {
		c: function create() {
			create_component(textblock.$$.fragment);
			t0 = space();
			section = element("section");
			if (switch_instance) create_component(switch_instance.$$.fragment);
			t1 = space();
			attr_dev(section, "class", "svelte-12ohqlm");
			add_location(section, file, 166, 8, 4783);
		},
		m: function mount(target, anchor) {
			mount_component(textblock, target, anchor);
			insert_dev(target, t0, anchor);
			insert_dev(target, section, anchor);

			if (switch_instance) {
				mount_component(switch_instance, section, null);
			}

			append_dev(section, t1);
			assign_section();
			current = true;
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
			const textblock_changes = {};

			if (dirty & /*$$scope, settingsSections*/ 262152) {
				textblock_changes.$$scope = { dirty, ctx };
			}

			textblock.$set(textblock_changes);

			if (switch_value !== (switch_value = /*section*/ ctx[13].component)) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props(ctx));
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, section, t1);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				
			}

			if (each_value !== /*each_value*/ ctx[14] || section_index !== /*section_index*/ ctx[15]) {
				unassign_section();
				each_value = /*each_value*/ ctx[14];
				section_index = /*section_index*/ ctx[15];
				assign_section();
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(textblock.$$.fragment, local);
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(textblock.$$.fragment, local);
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(textblock, detaching);
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(section);
			if (switch_instance) destroy_component(switch_instance);
			unassign_section();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block.name,
		type: "each",
		source: "(164:6) {#each settingsSections as section}",
		ctx
	});

	return block;
}

// (159:23)         <div class="absolute-center">          <ProgressRing />        </div>      {:then _}
function create_pending_block(ctx) {
	let div;
	let progressring;
	let current;
	progressring = new ProgressRing({ $$inline: true });

	const block = {
		c: function create() {
			div = element("div");
			create_component(progressring.$$.fragment);
			attr_dev(div, "class", "absolute-center svelte-12ohqlm");
			add_location(div, file, 159, 6, 4545);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			mount_component(progressring, div, null);
			current = true;
		},
		p: noop,
		i: function intro(local) {
			if (current) return;
			transition_in(progressring.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(progressring.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			destroy_component(progressring);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_pending_block.name,
		type: "pending",
		source: "(159:23)         <div class=\\\"absolute-center\\\">          <ProgressRing />        </div>      {:then _}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let aside;
	let div0;
	let flyout;
	let updating_open;
	let t0;
	let t1;
	let main_1;
	let div1;
	let promise;
	let current;

	function flyout_open_binding(value) {
		/*flyout_open_binding*/ ctx[8](value);
	}

	let flyout_props = {
		placement: "bottom",
		alignment: "start",
		$$slots: {
			flyout: [create_flyout_slot],
			default: [create_default_slot_2]
		},
		$$scope: { ctx }
	};

	if (/*unsupportedFlyoutOpened*/ ctx[2] !== void 0) {
		flyout_props.open = /*unsupportedFlyoutOpened*/ ctx[2];
	}

	flyout = new Flyout({ props: flyout_props, $$inline: true });
	binding_callbacks.push(() => bind(flyout, 'open', flyout_open_binding));
	let each_value_1 = /*settingsSections*/ ctx[3];
	validate_each_argument(each_value_1);
	let each_blocks = [];

	for (let i = 0; i < each_value_1.length; i += 1) {
		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	let info = {
		ctx,
		current: null,
		token: null,
		hasCatch: false,
		pending: create_pending_block,
		then: create_then_block,
		catch: create_catch_block,
		value: 12,
		blocks: [,,,]
	};

	handle_promise(promise = /*configProm*/ ctx[4], info);

	const block = {
		c: function create() {
			aside = element("aside");
			div0 = element("div");
			create_component(flyout.$$.fragment);
			t0 = space();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t1 = space();
			main_1 = element("main");
			div1 = element("div");
			info.block.c();
			set_style(div0, "margin-bottom", "30px");
			add_location(div0, file, 140, 2, 3852);
			attr_dev(aside, "class", "svelte-12ohqlm");
			add_location(aside, file, 139, 0, 3841);
			attr_dev(div1, "class", "content svelte-12ohqlm");
			add_location(div1, file, 157, 2, 4491);
			attr_dev(main_1, "class", "svelte-12ohqlm");
			add_location(main_1, file, 156, 0, 4464);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, aside, anchor);
			append_dev(aside, div0);
			mount_component(flyout, div0, null);
			append_dev(aside, t0);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(aside, null);
			}

			insert_dev(target, t1, anchor);
			insert_dev(target, main_1, anchor);
			append_dev(main_1, div1);
			info.block.m(div1, info.anchor = null);
			info.mount = () => div1;
			info.anchor = null;
			/*main_1_binding*/ ctx[10](main_1);
			current = true;
		},
		p: function update(new_ctx, [dirty]) {
			ctx = new_ctx;
			const flyout_changes = {};

			if (dirty & /*$$scope*/ 262144) {
				flyout_changes.$$scope = { dirty, ctx };
			}

			if (!updating_open && dirty & /*unsupportedFlyoutOpened*/ 4) {
				updating_open = true;
				flyout_changes.open = /*unsupportedFlyoutOpened*/ ctx[2];
				add_flush_callback(() => updating_open = false);
			}

			flyout.$set(flyout_changes);

			if (dirty & /*checkIfInCenter, settingsSections, scrollTag, scrollToElementF*/ 201) {
				each_value_1 = /*settingsSections*/ ctx[3];
				validate_each_argument(each_value_1);
				let i;

				for (i = 0; i < each_value_1.length; i += 1) {
					const child_ctx = get_each_context_1(ctx, each_value_1, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block_1(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(aside, null);
					}
				}

				group_outros();

				for (i = each_value_1.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}

			update_await_block_branch(info, ctx, dirty);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(flyout.$$.fragment, local);

			for (let i = 0; i < each_value_1.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			transition_in(info.block);
			current = true;
		},
		o: function outro(local) {
			transition_out(flyout.$$.fragment, local);
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			for (let i = 0; i < 3; i += 1) {
				const block = info.blocks[i];
				transition_out(block);
			}

			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(aside);
			destroy_component(flyout);
			destroy_each(each_blocks, detaching);
			if (detaching) detach_dev(t1);
			if (detaching) detach_dev(main_1);
			info.block.d();
			info.token = null;
			info = null;
			/*main_1_binding*/ ctx[10](null);
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

function instance($$self, $$props, $$invalidate) {
	let $config;
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Settings', slots, []);
	const configProm = window.monolith.userdata.config.get();
	let config = writable(null);
	validate_store(config, 'config');
	component_subscribe($$self, config, value => $$invalidate(11, $config = value));
	setContext('config', config);

	configProm.then(c => {
		set_store_value(config, $config = c, $config);
	});

	let scrollTag = {};
	let main;
	let unsupportedFlyoutOpened = false;

	const settingsSections = [
		{
			name: 'Appearance',
			element: null,
			component: Appearance
		},
		{
			name: 'Privacy',
			element: null,
			component: Privacy
		},
		{
			name: 'Search engines',
			element: null,
			component: SearchEngines
		},
		{
			name: 'When Monolith starts',
			element: null,
			component: OnStart
		},
		{
			name: 'Downloads',
			element: null,
			component: Downloads
		}
	];

	console.log(settingsSections);

	onMount(() => {
		main.addEventListener(
			'scroll',
			() => {
				requestAnimationFrame(() => {
					$$invalidate(0, scrollTag = {}); // update scrolltag
				});
			},
			{ passive: true }
		);
	});

	function checkIfInCenter(element, pos) {
		if (!element) return false;

		if (main.scrollTop <= 0) {
			// the highest element if scrolled to the top
			if (pos == 'first') return true; else return false;
		}

		if (main.scrollHeight - main.scrollTop == main.clientHeight) {
			// the lowest element if scrolled to the bottom
			if (pos == 'last') return true; else return false;
		}

		const { bottom, top } = element.getBoundingClientRect();
		const windowCenter = window.innerHeight / 2;
		return top - 50 < windowCenter && bottom + 50 > windowCenter; // 50 px added to minimize the possibility that no item is selected
	}

	function scrollToElementF(element) {
		return function () {
			if (!element) return false;
			const elemCenter = element.clientHeight / 2;
			const halfWindowSize = window.innerHeight / 2;
			const absoluteElementCenter = element.offsetTop + elemCenter;

			// Need to get the position in which halfWindowSize (windowCenter) and absoluteElementCenter are the same.
			// This is the same as ( absElemCenter - (windowSize - windowCenter) )
			main.scrollTo(0, absoluteElementCenter - halfWindowSize);
		};
	}

	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<Settings> was created with unknown prop '${key}'`);
	});

	function flyout_open_binding(value) {
		unsupportedFlyoutOpened = value;
		$$invalidate(2, unsupportedFlyoutOpened);
	}

	function section_binding($$value, each_value, section_index) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			each_value[section_index].element = $$value;
			$$invalidate(3, settingsSections);
		});
	}

	function main_1_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			main = $$value;
			$$invalidate(1, main);
		});
	}

	$$self.$capture_state = () => ({
		ListItem,
		TextBlock,
		TextBox,
		Flyout,
		ProgressRing,
		onMount,
		setContext,
		writable,
		Appearance,
		Privacy,
		SearchEngines,
		OnStart,
		Downloads,
		configProm,
		config,
		scrollTag,
		main,
		unsupportedFlyoutOpened,
		settingsSections,
		checkIfInCenter,
		scrollToElementF,
		$config
	});

	$$self.$inject_state = $$props => {
		if ('config' in $$props) $$invalidate(5, config = $$props.config);
		if ('scrollTag' in $$props) $$invalidate(0, scrollTag = $$props.scrollTag);
		if ('main' in $$props) $$invalidate(1, main = $$props.main);
		if ('unsupportedFlyoutOpened' in $$props) $$invalidate(2, unsupportedFlyoutOpened = $$props.unsupportedFlyoutOpened);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		scrollTag,
		main,
		unsupportedFlyoutOpened,
		settingsSections,
		configProm,
		config,
		checkIfInCenter,
		scrollToElementF,
		flyout_open_binding,
		section_binding,
		main_1_binding
	];
}

class Settings extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, {}, add_css);

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Settings",
			options,
			id: create_fragment.name
		});
	}
}

export default Settings;