function convertToHex(dec) {
    d = parseInt(dec, 10);
    if (d > 255) {
        return '00';
    }
    if (d < 16) {
        return '0' + d.toString(16);
    } else {
        return d.toString(16);
    }
}

var colorPalette = new function()
{
    colors = [];
    colors['000000'] = '000000';
    colors['ffffff'] = 'ffffff';

    var body = jQuery("body");
    getAllColorsRecursive(body);

    function getAllColorsRecursive(jqObj)
    {
        addColorFromCss(jqObj, "backgroundColor");
        addColorFromCss(jqObj, "color");


        // Analyze all children
        jqObj.children().each(function()
        {
            getAllColorsRecursive($(this));
        });
    }

    function addColorFromCss(jqObj, cssProperty)
    {
        var color = jqObj.css(cssProperty);
        var hexColor = rgbToHashStyle(color);
        if (hexColor) {
            colors[hexColor] = hexColor;
        }
    }
    function rgbToHashStyle(rgbColorString)
    {
        var hexString = rgbColorString;

        var regexp = /rgb\(([0-9]+), ([0-9]+), ([0-9]+)\)/;

        if (regexp.test(rgbColorString))
        {
            var result = regexp.exec(rgbColorString);
            hexString = convertToHex(result[1]) + convertToHex(result[2]) + convertToHex(result[3]);
            return hexString;
        }
        return false;
    }

    var hexColor2, i, j, sel = /a:hover/;
    for (i = 0; i < document.styleSheets.length; ++i) {

        try {
            for (j = 0; j < document.styleSheets[i].cssRules.length; ++j) {

                try {
                    //if (sel.test(document.styleSheets[i].cssRules[j].selectorText)) {
                        try {
                            hexColor2 = rgbToHashStyle(document.styleSheets[i].cssRules[j].style.cssText)
                            if (hexColor2) {
                                //colors[hexColor2] = hexColor2;
                            }
                        } catch (e) {
                            //console.log('err')
                        }
                    //}
                } catch (e) {
                    //console.log('err2');

                }

            }
        } catch (e) {
            //console.log('err');
        }

    }

    var urlString = '';
    var firstPass = true;
    for (var key in colors) {
        if (firstPass) {
            firstPass = false;
        } else {
            urlString += ',';
        }
        if(colors[key].length==3 || colors[key].length==6){
            urlString += colors[key];
        }
        
    }
    window.open('http://accessibility.oit.ncsu.edu/tools/color-contrast/accessible-color-palette.php?colors=' + urlString + '&level=AA', '_blank');

}

