"""Embed rendered figures into soma-field-paper.md by replacing ASCII art code blocks."""
import re

with open('soma-field-paper.md', 'r', encoding='utf-8') as f:
    text = f.read()

# Map: (unique text from *Figure caption line, figure file, width)
FIGURE_MAP = [
    ("Figure 1. The Soma-Field.",                   "figures/fig1_architecture.pdf",     "90%"),
    ("Figure 2. The perception threshold",          "figures/fig2_threshold.pdf",        "90%"),
    ("Figure 3a. Topographic",                      "figures/fig3a_energy_landscape.pdf","95%"),
    ("Figure 2. Schematic energy landscape",        "figures/fig3b_energy_profile.pdf",  "85%"),
    ("Figure 3. The Soma-Field Instrument",         "figures/fig4_instrument.pdf",       "90%"),
    ("Figure A1. Output functors",                  "figures/figA2_functors.pdf",        "90%"),
    ("Figure B1. Schematic comparison",             "figures/figB1_attractor_basins.pdf","90%"),
]

replacements_made = []
new_text = text

for caption_fragment, fig_file, width in FIGURE_MAP:
    # Find the *Figure line
    cap_pos = new_text.find('*' + caption_fragment)
    if cap_pos == -1:
        print("WARNING: caption not found: " + repr(caption_fragment))
        continue

    # Find the last ``` that closes a code block before this caption
    before_caption = new_text[:cap_pos]
    last_close = before_caption.rfind('```')
    if last_close == -1:
        print("WARNING: no closing ``` before caption: " + repr(caption_fragment))
        continue

    # Find the opening ``` that matches
    opening = before_caption.rfind('```', 0, last_close)
    if opening == -1:
        print("WARNING: no opening ``` before caption: " + repr(caption_fragment))
        continue

    # Build image line with literal curly braces for pandoc attribute
    img_line = '![](' + fig_file + '){ width=' + width + ' }'

    new_text = new_text[:opening] + img_line + new_text[last_close + 3:]
    replacements_made.append(caption_fragment)
    print("OK: replaced code block for " + repr(caption_fragment[:50]))

# Insert fig5 neurotype landscapes just before ## B.3 ADHD section
insert_marker = '## B.3 ADHD: High-Temperature, Low-Damping Dynamics'
fig5_block = (
    '\n![](figures/fig5_neurotype_landscapes.pdf){ width=100% }\n'
    '*Figure 5. Neurotype comparison: energy landscape modifications for Typical, ADHD, ASC, '
    'and C-PTSD dynamics. Each neurotype deforms the attractor topology in a characteristic way.*\n\n'
)
new_text = new_text.replace(insert_marker, fig5_block + insert_marker, 1)
print("OK: inserted fig5 before B.3")

# Insert fig0 before section 3.3
insert_marker2 = '## 3.3 The Interaction of Emotional Modes'
fig0_block = (
    '\n![](figures/fig0_field_mode.pdf){ width=95% }\n'
    '*Figure 0. Continuous soma-field activity (blue) with a single threshold-crossing event. '
    'The field is always active; conscious experience (shaded) arises only when amplitude exceeds '
    'the perception threshold \u03b8 (red dashed). Below the threshold: real, causally active, '
    'but not yet conscious.*\n\n'
)
new_text = new_text.replace(insert_marker2, fig0_block + insert_marker2, 1)
print("OK: inserted fig0 before 3.3")

with open('soma-field-paper.md', 'w', encoding='utf-8') as f:
    f.write(new_text)

print("\nDone. " + str(len(replacements_made)) + " code blocks replaced + 2 figures inserted.")
