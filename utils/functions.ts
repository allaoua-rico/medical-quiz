// export function LightenDarkenColor(col: string, amt: number) {
//   var usePound = false;

//   if (col[0] == "#") {
//     col = col.slice(1);
//     usePound = true;
//   }

//   var num = parseInt(col, 16);

//   var r = (num >> 16) + amt;

//   if (r > 255) r = 255;
//   else if (r < 0) r = 0;

//   var b = ((num >> 8) & 0x00ff) + amt;

//   if (b > 255) b = 255;
//   else if (b < 0) b = 0;

//   var g = (num & 0x0000ff) + amt;

//   if (g > 255) g = 255;
//   else if (g < 0) g = 0;

//   return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
// }

var varExtractor = new RegExp("return (.*);");

export function getVariableName<TResult>(name: () => TResult) {
  var m = varExtractor.exec(name + "");
  if (m == null)
    throw new Error(
      "The function does not contain a statement matching 'return variableName;'"
    );
  return m[1];
}

