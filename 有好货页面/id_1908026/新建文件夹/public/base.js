// 关闭选择
// document.addEventListener("selectstart", (e) => {
//   e.preventDefault();
// });
// 避免鼠标变成文本选择形状
// TODO: input无法获取焦点
// document.addEventListener("mousedown", (e) => {
//   e.preventDefault();
// });
// 避免双指缩放页面
document.addEventListener(
  "touchmove",
  (e) => {
    if (e.touches.length === 2) e.preventDefault();
  },
  { passive: false },
);

document.addEventListener(
  "touchmove",
  (e) => {
    if (e.touches.length === 1) e.preventDefault();
  },
  { passive: false },
);
