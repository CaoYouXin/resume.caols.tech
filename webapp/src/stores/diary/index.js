export default (state = { length: 1, contents: ["面部识别解锁已然是一项即将成为全面屏时代的标配技术，其技术成熟度将直接决定其应用体验。", "即将发布新机的苹果通过收购与研究，资料显示其已经掌握了足够成熟的面部识别技术。而在国内手机厂商中，以vivo为例，在早先的产品中，早已加入了部分面部识别技术在拍照功能上，凭借之前的积累，加之后期的深入研究，想必其面部识别技术的成熟度也已经达到、甚至高于国际水平，所以才敢于将即将发布的首款全面屏旗舰机X20的前置home键去掉。"] }, action) => {
  switch (action.type) {
    case 'DIARY_CHANGE':
      return {
        length: action.contents.length ? 1 : 0,
        contents: action.contents
      };
    case 'DIARY_NEXT':
      return {
        length: state.length + 1,
        contents: state.contents
      };
    default:
      return state;
  }
}