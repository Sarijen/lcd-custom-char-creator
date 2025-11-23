const light_green = "rgb(158, 232, 55)";
const light_blue = "rgb(31, 191, 215)";

//  COOKIES
var grid_enabled;
var custom_color = "#DD2222";
//  /COOKIES

const char_width = 5;
const char_height = 8;
const char_size = char_width * char_height;

var pixel_data = [
  0, 0, 0, 0, 0,

  0, 0, 0, 0, 0,

  0, 0, 0, 0, 0,

  0, 0, 0, 0, 0,

  0, 0, 0, 0, 0,

  0, 0, 0, 0, 0,

  0, 0, 0, 0, 0,

  0, 0, 0, 0, 0,
];

function get_cookie(name) {
  return document.cookie
    .split('; ')
    .find(row => row.startsWith(name + '='))
    ?.split('=')[1];
}

function load_cookies() {
  const saved_color = get_cookie("custom_color");

  if (saved_color) {
    document.getElementById("color-picker").value = saved_color;
  } else {
    document.getElementById("color-picker").value = custom_color;
  }

  if (get_cookie("grid_enabled") == "true") {
    toggle_grid();
  }

  update_cookies();
}

function update_cookies() {
  document.cookie = "grid_enabled=" + grid_enabled + "; path=/";
  document.cookie = "custom_color=" + custom_color + "; path=/";
}

function update_text() {
  let code_text = "uint8_t custom_char[] = {";

  for (let y = 0; y < char_height; y++) {
    code_text += "\n  0b";
    for (let x = 0; x < char_width; x++) {
      let pixel_index = (y * char_width) + x;

      code_text += pixel_data[pixel_index].toString();
    }
    code_text += ",";
  }

  code_text += "\n};";
  document.getElementById("code").textContent = code_text;
}


function set_color(color) {
  document.getElementById("char").style.backgroundColor = color;

  const childDivs = document.querySelectorAll('.char > div');
  childDivs.forEach(div => {
    div.style.backgroundColor = color;
  });
}


function set_custom_color() {
  let color = document.getElementById("color-picker").value;
  set_color(color);

  custom_color = color;
  update_cookies();
}


var is_mousedown = false;

document.addEventListener('mousedown', () => {
  is_mousedown = true;
});

document.addEventListener('mouseup', () => {
  is_mousedown = false;
});


function pixel_ondrag(pixel_id) {
  if (is_mousedown == false) {return;}

  const pixel_element = document.getElementById(pixel_id);
  pixel_element.classList.toggle("dimn");
  
  pixel_index = Number(pixel_id);
  toggle_pixel_value(pixel_index);

  update_text();
}


function pixel_onclick(pixel_id) {
  const pixel_element = document.getElementById(pixel_id);
  pixel_element.classList.toggle("dimn");
  
  const pixel_index = Number(pixel_id);
  toggle_pixel_value(pixel_index);

  update_text();
}


function toggle_pixel_value(pixel_index) {
  if (pixel_data[pixel_index] == 1) {
    pixel_data[pixel_index] = 0;
  } else {
    pixel_data[pixel_index] = 1;
  }

  update_text();
}


function toggle_grid() {
  let grid_color = document.getElementById("0").style.borderColor;

  if (grid_color == "black") {
    grid_color = "";
  } else {
    grid_color = "black";
  }

  for (let pixel = 0; pixel < char_size; pixel++) {
    document.getElementById(pixel.toString()).style.borderColor = grid_color;
  }

  if (grid_enabled == "true") {
    grid_enabled = "false";
  } else {
    grid_enabled = "true";
  }
  update_cookies();
}


function char_invert() {
  for (let pixel = 0; pixel < char_size; pixel++) {
    toggle_pixel_value(pixel);

    const pixel_element = document.getElementById(pixel.toString());
    pixel_element.classList.toggle("dimn");
  }

  update_text();
}


function char_clear() {
  for (let pixel = 0; pixel < char_size; pixel++) {
    document.getElementById(pixel.toString()).classList.remove("dimn");
  }

  pixel_data = [
    0, 0, 0, 0, 0,

    0, 0, 0, 0, 0,

    0, 0, 0, 0, 0,

    0, 0, 0, 0, 0,

    0, 0, 0, 0, 0,

    0, 0, 0, 0, 0,

    0, 0, 0, 0, 0,

    0, 0, 0, 0, 0,
  ];
}
