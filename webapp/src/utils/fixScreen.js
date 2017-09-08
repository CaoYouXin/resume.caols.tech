function fixScreen(isAndroid, width, screenWidth) {
  let metaEl = document.querySelector('meta[name="viewport"]'),
    data = {
      width: width
    };

  if (isAndroid) {
    let medium_dpi = data.width / screenWidth * window['devicePixelRatio'] * 160;

    medium_dpi = medium_dpi.toFixed(2);

    data['target-densitydpi'] = medium_dpi;
  } else {
    let scale = screenWidth / data.width;

    scale = scale.toFixed(2);

    data['initial-scale'] = data['maximum-scale'] = data['minimum-scale'] = scale;
  }

  data['user-scalable'] = 'no';
  metaEl.content = JSON.stringify(data).replace(/\s*/g, '').replace(/[{}"]/g, '').replace(/:/g, '=');
}

export { fixScreen };