export const configPerLeds = {
  0: ["on", "on", "off", "off", "off", "on", "on", "on", "on"],
  1: ["off", "off", "off", "off", "off", "off", "on", "on", "off"],
  2: ["on", "off", "on-center", "on", "on", "on", "on", "off", "on"],
  3: ["on", "off", "on-center", "on", "on", "off", "on", "on", "on"],
  4: ["off", "on", "on-center", "on", "on", "off", "on", "on", "off"],
  5: ["on", "on", "on-center", "on", "on", "off", "off", "on", "on"],
  6: ["on", "on", "on-center", "on", "on", "on", "off", "on", "on"],
  7: ["on", "off", "off", "off", "off", "off", "on", "on", "off"],
  8: ["on", "on", "on-center", "on", "on", "on", "on", "on", "on"],
  9: ["on", "on", "on-center", "on", "on", "off", "on", "on", "on"],
};

export const htmlPerLeds = [
  `<div class="position-with-border top"></div>`,
  `<div class="position-with-border left-led-first"></div>`,
  `<div class="center-led "><div class="center ">`,
  `<div class="arrow-right"></div>`,
  `<div class="arrow-left"></div></div></div>`,
  `<div class="position-with-border left-led-second"></div>`,
  `<div class="position-with-border right-led-first"></div>`,
  `<div class="position-with-border right-led-second"></div>`,
  `<div class="position-with-border bottom"></div>`,
];
