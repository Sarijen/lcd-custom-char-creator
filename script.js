const light_green = "rgb(158, 232, 55)";
const light_blue = "rgb(31, 191, 215)";

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
}


var is_mousedown = false;

document.addEventListener('mousedown', () => {
  is_mousedown = true;
});

document.addEventListener('mouseup', () => {
  is_mousedown = false;
});

function toggle_pixel(pixel_id) {
  if (is_mousedown == false) {return;}

  const pixel_element = document.getElementById(pixel_id);

  pixel_element.classList.toggle("dimn");
  
  pixel_index = Number(pixel_id);
  pixel_value = pixel_data[pixel_index % char_width];

  if (pixel_value == 1) {
    pixel_data[pixel_index % char_width] = 0;
  } else {
    pixel_data[pixel_index % char_width] = 1;
  }

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

}


function char_invert() {
  for (let pixel = 0; pixel < char_size; pixel++) {
    const current_pixel = document.getElementById(pixel.toString());
    current_pixel.classList.toggle("dimn");
  }
}


function char_clear() {
  for (let pixel = 0; pixel < char_size; pixel++) {
    document.getElementById(pixel.toString()).classList.remove("dimn");
  }
}
