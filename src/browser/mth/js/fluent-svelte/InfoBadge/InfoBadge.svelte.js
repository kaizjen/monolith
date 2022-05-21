/* $svelte\fluent-svelte-raw\InfoBadge\InfoBadge.svelte generated by Svelte v3.46.4 */
import {
	SvelteComponent,
	action_destroyer,
	append,
	append_styles,
	assign,
	attr,
	binding_callbacks,
	compute_rest_props,
	create_slot,
	detach,
	element as element_1,
	empty,
	exclude_internal_props,
	get_all_dirty_from_scope,
	get_slot_changes,
	get_spread_update,
	init,
	insert,
	safe_not_equal,
	set_attributes,
	set_svg_attributes,
	svg_element,
	toggle_class,
	transition_in,
	transition_out,
	update_slot_base
} from "mth://.svelte/internal";

import { createEventForwarder } from "../internal";
import { get_current_component } from "mth://.svelte/internal";

function add_css(target) {
	append_styles(target, "svelte-106nxdf", ".info-badge.svelte-106nxdf{align-items:center;border-radius:16px;box-sizing:border-box;color:var(--fds-text-on-accent-primary);display:inline-flex;font-family:var(--fds-font-family-small);font-size:var(--fds-caption-font-size);justify-content:center;line-height:var(--fds-caption-font-size);min-block-size:16px;min-inline-size:16px;padding:2px 4px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.info-badge.severity-attention.svelte-106nxdf{background-color:var(--fds-system-attention)}.info-badge.severity-success.svelte-106nxdf{background-color:var(--fds-system-success)}.info-badge.severity-caution.svelte-106nxdf{background-color:var(--fds-system-caution)}.info-badge.severity-critical.svelte-106nxdf{background-color:var(--fds-system-critical)}.info-badge.severity-information.svelte-106nxdf{background-color:var(--fds-system-solid-neutral)}.info-badge.svelte-106nxdf svg{fill:currentColor;block-size:8px;inline-size:8px}");
}

// (62:39) 
function create_if_block_4(ctx) {
	let svg;
	let path;
	let svg_levels = [/*svgProps*/ ctx[4], { viewBox: "406 64 213 875" }];
	let svg_data = {};

	for (let i = 0; i < svg_levels.length; i += 1) {
		svg_data = assign(svg_data, svg_levels[i]);
	}

	return {
		c() {
			svg = svg_element("svg");
			path = svg_element("path");
			attr(path, "fill", "currentColor");
			attr(path, "d", "M405.5,170.5C405.5,156.167 408.333,142.5 414,129.5C419.667,116.5 427.333,105.167 437,95.5C446.667,85.8334 457.917,78.1667 470.75,72.5C483.583,66.8334 497.333,64.0001 512,64C526.333,64.0001 540,66.8334 553,72.5C566,78.1667 577.333,85.8334 587,95.5C596.667,105.167 604.333,116.5 610,129.5C615.667,142.5 618.5,156.167 618.5,170.5C618.5,185.167 615.667,199 610,212C604.333,225 596.667,236.333 587,246C577.333,255.667 566.083,263.333 553.25,269C540.417,274.667 526.667,277.5 512,277.5C497.333,277.5 483.583,274.667 470.75,269C457.917,263.333 446.667,255.667 437,246C427.333,236.333 419.667,225 414,212C408.333,199 405.5,185.167 405.5,170.5ZM426.5,853.5L426.5,512C426.5,500.333 428.75,489.333 433.25,479C437.75,468.667 443.917,459.583 451.75,451.75C459.583,443.917 468.667,437.75 479,433.25C489.333,428.75 500.333,426.5 512,426.5C523.667,426.5 534.667,428.75 545,433.25C555.333,437.75 564.417,443.917 572.25,451.75C580.083,459.583 586.25,468.667 590.75,479C595.25,489.333 597.5,500.333 597.5,512L597.5,853.5C597.5,865.167 595.25,876.167 590.75,886.5C586.25,896.833 580.083,905.833 572.25,913.5C564.417,921.167 555.333,927.25 545,931.75C534.667,936.25 523.667,938.5 512,938.5C500.333,938.5 489.333,936.25 479,931.75C468.667,927.25 459.583,921.167 451.75,913.5C443.917,905.833 437.75,896.833 433.25,886.5C428.75,876.167 426.5,865.167 426.5,853.5Z");
			set_svg_attributes(svg, svg_data);
			toggle_class(svg, "svelte-106nxdf", true);
		},
		m(target, anchor) {
			insert(target, svg, anchor);
			append(svg, path);
		},
		p(ctx, dirty) {
			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [/*svgProps*/ ctx[4], { viewBox: "406 64 213 875" }]));
			toggle_class(svg, "svelte-106nxdf", true);
		},
		d(detaching) {
			if (detaching) detach(svg);
		}
	};
}

// (55:36) 
function create_if_block_3(ctx) {
	let svg;
	let path;
	let svg_levels = [/*svgProps*/ ctx[4], { viewBox: "172 171 683 683" }];
	let svg_data = {};

	for (let i = 0; i < svg_levels.length; i += 1) {
		svg_data = assign(svg_data, svg_levels[i]);
	}

	return {
		c() {
			svg = svg_element("svg");
			path = svg_element("path");
			attr(path, "fill", "currentColor");
			attr(path, "d", "M512.5,587.5L262.5,838C252.167,848.333 239.5,853.5 224.5,853.5C209.5,853.5 196.917,848.417 186.75,838.25C176.583,828.083 171.5,815.5 171.5,800.5C171.5,785.5 176.667,772.833 187,762.5L437,512L187,262C176.667,251.667 171.5,239.167 171.5,224.5C171.5,217.167 172.833,210.167 175.5,203.5C178.167,196.833 181.917,191.167 186.75,186.5C191.583,181.833 197.167,178.083 203.5,175.25C209.833,172.417 216.833,171 224.5,171C239.167,171 251.667,176.167 262,186.5L512.5,437L762.5,186.5C773.167,175.833 785.833,170.5 800.5,170.5C807.833,170.5 814.75,171.917 821.25,174.75C827.75,177.583 833.417,181.417 838.25,186.25C843.083,191.083 846.833,196.75 849.5,203.25C852.167,209.75 853.5,216.667 853.5,224C853.5,238.667 848.333,251.167 838,261.5L587.5,512L838,762.5C848.667,773.167 854,785.833 854,800.5C854,807.833 852.583,814.667 849.75,821C846.917,827.333 843.083,832.917 838.25,837.75C833.417,842.583 827.75,846.417 821.25,849.25C814.75,852.083 807.833,853.5 800.5,853.5C785.5,853.5 772.833,848.333 762.5,838Z");
			set_svg_attributes(svg, svg_data);
			toggle_class(svg, "svelte-106nxdf", true);
		},
		m(target, anchor) {
			insert(target, svg, anchor);
			append(svg, path);
		},
		p(ctx, dirty) {
			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [/*svgProps*/ ctx[4], { viewBox: "172 171 683 683" }]));
			toggle_class(svg, "svelte-106nxdf", true);
		},
		d(detaching) {
			if (detaching) detach(svg);
		}
	};
}

// (48:35) 
function create_if_block_2(ctx) {
	let svg;
	let path;
	let svg_levels = [/*svgProps*/ ctx[4], { viewBox: "406 86 213 875" }];
	let svg_data = {};

	for (let i = 0; i < svg_levels.length; i += 1) {
		svg_data = assign(svg_data, svg_levels[i]);
	}

	return {
		c() {
			svg = svg_element("svg");
			path = svg_element("path");
			attr(path, "fill", "currentColor");
			attr(path, "d", "M426.5,512L426.5,170.5C426.5,158.833 428.75,147.833 433.25,137.5C437.75,127.167 443.917,118.167 451.75,110.5C459.583,102.833 468.667,96.75 479,92.25C489.333,87.75 500.333,85.5 512,85.5C523.667,85.5 534.667,87.75 545,92.25C555.333,96.75 564.417,102.833 572.25,110.5C580.083,118.167 586.25,127.167 590.75,137.5C595.25,147.833 597.5,158.833 597.5,170.5L597.5,512C597.5,523.667 595.25,534.667 590.75,545C586.25,555.333 580.083,564.417 572.25,572.25C564.417,580.083 555.333,586.25 545,590.75C534.667,595.25 523.667,597.5 512,597.5C500.333,597.5 489.333,595.25 479,590.75C468.667,586.25 459.583,580.083 451.75,572.25C443.917,564.417 437.75,555.333 433.25,545C428.75,534.667 426.5,523.667 426.5,512ZM405.5,853.5C405.5,838.833 408.333,825 414,812C419.667,799 427.333,787.667 437,778C446.667,768.333 457.917,760.667 470.75,755C483.583,749.333 497.333,746.5 512,746.5C526.667,746.5 540.417,749.333 553.25,755C566.083,760.667 577.333,768.333 587,778C596.667,787.667 604.333,799 610,812C615.667,825 618.5,838.833 618.5,853.5C618.5,868.167 615.667,881.917 610,894.75C604.333,907.583 596.667,918.833 587,928.5C577.333,938.167 566,945.833 553,951.5C540,957.167 526.333,960 512,960C497.333,960 483.583,957.167 470.75,951.5C457.917,945.833 446.667,938.167 437,928.5C427.333,918.833 419.667,907.583 414,894.75C408.333,881.917 405.5,868.167 405.5,853.5Z");
			set_svg_attributes(svg, svg_data);
			toggle_class(svg, "svelte-106nxdf", true);
		},
		m(target, anchor) {
			insert(target, svg, anchor);
			append(svg, path);
		},
		p(ctx, dirty) {
			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [/*svgProps*/ ctx[4], { viewBox: "406 86 213 875" }]));
			toggle_class(svg, "svelte-106nxdf", true);
		},
		d(detaching) {
			if (detaching) detach(svg);
		}
	};
}

// (41:35) 
function create_if_block_1(ctx) {
	let svg;
	let path;
	let svg_levels = [/*svgProps*/ ctx[4], { viewBox: "118 245 790 577" }];
	let svg_data = {};

	for (let i = 0; i < svg_levels.length; i += 1) {
		svg_data = assign(svg_data, svg_levels[i]);
	}

	return {
		c() {
			svg = svg_element("svg");
			path = svg_element("path");
			attr(path, "fill", "currentColor");
			attr(path, "d", "M117.5,554.5C117.5,547.167 118.917,540.25 121.75,533.75C124.583,527.25 128.417,521.583 133.25,516.75C138.083,511.917 143.75,508.083 150.25,505.25C156.75,502.417 163.667,501 171,501C185.333,501 197.833,506.333 208.5,517L384,692.5L815.5,261C826.167,250.333 838.833,245 853.5,245C860.833,245 867.75,246.417 874.25,249.25C880.75,252.083 886.417,256 891.25,261C896.083,266 899.917,271.75 902.75,278.25C905.583,284.75 907,291.5 907,298.5C907,313.167 901.667,325.833 891,336.5L421.5,805.5C416.5,810.5 410.75,814.417 404.25,817.25C397.75,820.083 391,821.5 384,821.5C369.667,821.5 357.167,816.167 346.5,805.5L133,592.5C122.667,582.167 117.5,569.5 117.5,554.5Z");
			set_svg_attributes(svg, svg_data);
			toggle_class(svg, "svelte-106nxdf", true);
		},
		m(target, anchor) {
			insert(target, svg, anchor);
			append(svg, path);
		},
		p(ctx, dirty) {
			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [/*svgProps*/ ctx[4], { viewBox: "118 245 790 577" }]));
			toggle_class(svg, "svelte-106nxdf", true);
		},
		d(detaching) {
			if (detaching) detach(svg);
		}
	};
}

// (34:2) {#if severity === "attention"}
function create_if_block(ctx) {
	let svg;
	let path;
	let svg_levels = [/*svgProps*/ ctx[4], { viewBox: "162 118 701 789" }];
	let svg_data = {};

	for (let i = 0; i < svg_levels.length; i += 1) {
		svg_data = assign(svg_data, svg_levels[i]);
	}

	return {
		c() {
			svg = svg_element("svg");
			path = svg_element("path");
			attr(path, "fill", "currentColor");
			attr(path, "d", "M862.5,680C862.5,687.333 861.083,694.25 858.25,700.75C855.417,707.25 851.583,712.917 846.75,717.75C841.917,722.583 836.25,726.417 829.75,729.25C823.25,732.083 816.333,733.5 809,733.5C800,733.5 791.333,731.167 783,726.5L565.5,603.5L565.5,853.5C565.5,860.833 564.083,867.75 561.25,874.25C558.417,880.75 554.583,886.333 549.75,891C544.917,895.667 539.25,899.417 532.75,902.25C526.25,905.083 519.333,906.5 512,906.5C504.667,906.5 497.75,905.083 491.25,902.25C484.75,899.417 479.083,895.667 474.25,891C469.417,886.333 465.583,880.75 462.75,874.25C459.917,867.75 458.5,860.833 458.5,853.5L458.5,603.5L241,726.5C232.667,731.167 224,733.5 215,733.5C207.667,733.5 200.75,732.083 194.25,729.25C187.75,726.417 182.083,722.583 177.25,717.75C172.417,712.917 168.583,707.25 165.75,700.75C162.917,694.25 161.5,687.333 161.5,680C161.5,670.667 164,661.75 169,653.25C174,644.75 180.5,638.167 188.5,633.5L403.5,512L188.5,390.5C180.5,385.833 174,379.25 169,370.75C164,362.25 161.5,353.333 161.5,344C161.5,336.667 162.917,329.75 165.75,323.25C168.583,316.75 172.417,311.083 177.25,306.25C182.083,301.417 187.75,297.583 194.25,294.75C200.75,291.917 207.667,290.5 215,290.5C224.667,290.5 233.333,292.833 241,297.5L458.5,420.5L458.5,170.5C458.5,163.167 459.917,156.25 462.75,149.75C465.583,143.25 469.417,137.667 474.25,133C479.083,128.333 484.75,124.583 491.25,121.75C497.75,118.917 504.667,117.5 512,117.5C519.333,117.5 526.25,118.917 532.75,121.75C539.25,124.583 544.917,128.333 549.75,133C554.583,137.667 558.417,143.25 561.25,149.75C564.083,156.25 565.5,163.167 565.5,170.5L565.5,420.5L783,297.5C791.333,292.833 800,290.5 809,290.5C816.333,290.5 823.25,291.917 829.75,294.75C836.25,297.583 841.917,301.417 846.75,306.25C851.583,311.083 855.417,316.75 858.25,323.25C861.083,329.75 862.5,336.667 862.5,344C862.5,353.333 860,362.25 855,370.75C850,379.25 843.5,385.833 835.5,390.5L620.5,512L835.5,633.5C843.5,638.167 850,644.75 855,653.25C860,661.75 862.5,670.667 862.5,680Z");
			set_svg_attributes(svg, svg_data);
			toggle_class(svg, "svelte-106nxdf", true);
		},
		m(target, anchor) {
			insert(target, svg, anchor);
			append(svg, path);
		},
		p(ctx, dirty) {
			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [/*svgProps*/ ctx[4], { viewBox: "162 118 701 789" }]));
			toggle_class(svg, "svelte-106nxdf", true);
		},
		d(detaching) {
			if (detaching) detach(svg);
		}
	};
}

// (33:7)    
function fallback_block(ctx) {
	let if_block_anchor;

	function select_block_type(ctx, dirty) {
		if (/*severity*/ ctx[1] === "attention") return create_if_block;
		if (/*severity*/ ctx[1] === "success") return create_if_block_1;
		if (/*severity*/ ctx[1] === "caution") return create_if_block_2;
		if (/*severity*/ ctx[1] === "critical") return create_if_block_3;
		if (/*severity*/ ctx[1] === "information") return create_if_block_4;
	}

	let current_block_type = select_block_type(ctx, -1);
	let if_block = current_block_type && current_block_type(ctx);

	return {
		c() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert(target, if_block_anchor, anchor);
		},
		p(ctx, dirty) {
			if (current_block_type === (current_block_type = select_block_type(ctx, dirty)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
				if (if_block) if_block.d(1);
				if_block = current_block_type && current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			}
		},
		d(detaching) {
			if (if_block) {
				if_block.d(detaching);
			}

			if (detaching) detach(if_block_anchor);
		}
	};
}

function create_fragment(ctx) {
	let span;
	let span_class_value;
	let forwardEvents_action;
	let current;
	let mounted;
	let dispose;
	const default_slot_template = /*#slots*/ ctx[7].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[6], null);
	const default_slot_or_fallback = default_slot || fallback_block(ctx);

	let span_levels = [
		{
			class: span_class_value = "info-badge severity-" + /*severity*/ ctx[1] + " " + /*className*/ ctx[2]
		},
		/*$$restProps*/ ctx[5]
	];

	let span_data = {};

	for (let i = 0; i < span_levels.length; i += 1) {
		span_data = assign(span_data, span_levels[i]);
	}

	return {
		c() {
			span = element_1("span");
			if (default_slot_or_fallback) default_slot_or_fallback.c();
			set_attributes(span, span_data);
			toggle_class(span, "svelte-106nxdf", true);
		},
		m(target, anchor) {
			insert(target, span, anchor);

			if (default_slot_or_fallback) {
				default_slot_or_fallback.m(span, null);
			}

			/*span_binding*/ ctx[8](span);
			current = true;

			if (!mounted) {
				dispose = action_destroyer(forwardEvents_action = /*forwardEvents*/ ctx[3].call(null, span));
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 64)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[6],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[6])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[6], dirty, null),
						null
					);
				}
			} else {
				if (default_slot_or_fallback && default_slot_or_fallback.p && (!current || dirty & /*severity*/ 2)) {
					default_slot_or_fallback.p(ctx, !current ? -1 : dirty);
				}
			}

			set_attributes(span, span_data = get_spread_update(span_levels, [
				(!current || dirty & /*severity, className*/ 6 && span_class_value !== (span_class_value = "info-badge severity-" + /*severity*/ ctx[1] + " " + /*className*/ ctx[2])) && { class: span_class_value },
				dirty & /*$$restProps*/ 32 && /*$$restProps*/ ctx[5]
			]));

			toggle_class(span, "svelte-106nxdf", true);
		},
		i(local) {
			if (current) return;
			transition_in(default_slot_or_fallback, local);
			current = true;
		},
		o(local) {
			transition_out(default_slot_or_fallback, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(span);
			if (default_slot_or_fallback) default_slot_or_fallback.d(detaching);
			/*span_binding*/ ctx[8](null);
			mounted = false;
			dispose();
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	const omit_props_names = ["severity","class","element"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	let { severity = "attention" } = $$props;
	let { class: className = "" } = $$props;
	let { element = null } = $$props;
	const forwardEvents = createEventForwarder(get_current_component());

	const svgProps = {
		"aria-hidden": true,
		xmlns: "http://www.w3.org/2000/svg"
	};

	function span_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			element = $$value;
			$$invalidate(0, element);
		});
	}

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(5, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('severity' in $$new_props) $$invalidate(1, severity = $$new_props.severity);
		if ('class' in $$new_props) $$invalidate(2, className = $$new_props.class);
		if ('element' in $$new_props) $$invalidate(0, element = $$new_props.element);
		if ('$$scope' in $$new_props) $$invalidate(6, $$scope = $$new_props.$$scope);
	};

	return [
		element,
		severity,
		className,
		forwardEvents,
		svgProps,
		$$restProps,
		$$scope,
		slots,
		span_binding
	];
}

class InfoBadge extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { severity: 1, class: 2, element: 0 }, add_css);
	}
}

export default InfoBadge;