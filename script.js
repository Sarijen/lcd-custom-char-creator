var default_green = "#9ee837";
var default_blue = "#37d0e8";

//  COOKIES
var saved_cookies;

var grid_enabled_c;
var custom_color_c = "#DD2222";
var set_color_c = default_green;
//  COOKIES

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

window.onload = () => {
  load_cookies();
};

function get_cookie(name) {
  return saved_cookies 
    .split('; ')
    .find(row => row.startsWith(name + '='))
    ?.split('=')[1];
}

function load_cookies() {
  saved_cookies = document.cookie;


  const last_custom_color = get_cookie("custom_color");
  if (last_custom_color) {
    document.getElementById("color-picker").value = last_custom_color;
  } else {
    document.getElementById("color-picker").value = custom_color_c;
  }

  if (get_cookie("grid_enabled") == "true") {
    set_grid_color("black");
  }

  const last_set_color = get_cookie("set_color");
  if (last_set_color) {
    set_color(last_set_color);
  } else {
    set_color(default_green);
  }

  update_cookies();
}

function update_cookies() {
  document.cookie = "grid_enabled=" + grid_enabled_c + "; path=/";
  document.cookie = "custom_color=" + custom_color_c + "; path=/";
  document.cookie = "set_color=" + set_color_c + "; path=/";
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


function set_color(new_color) {
  document.getElementById("char").style.backgroundColor = new_color;

  const childDivs = document.querySelectorAll('.char > div');
  childDivs.forEach(div => {
    div.style.backgroundColor = new_color;
  });

  set_color_c = new_color;
  update_cookies();
}


function set_custom_color() {
  const new_color = document.getElementById("color-picker").value;
  set_color(new_color);

  custom_color_c = new_color;
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

  set_grid_color(grid_color);

}

function set_grid_color(new_color) {
  for (let pixel = 0; pixel < char_size; pixel++) {
    document.getElementById(pixel.toString()).style.borderColor = new_color;
  }

  if (grid_enabled_c == "true") {
    grid_enabled_c = "false";
  } else {
    grid_enabled_c = "true";
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

  update_text();
}
