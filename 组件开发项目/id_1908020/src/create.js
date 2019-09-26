var c = myCreate(
  new Div(),
  { className: "container" },
  myCreate(
    new Div(),
    { className: "container", style: "color:red;", "on-click": aaaa.bind(undefined) },
    "111"
  ),
  myCreate(
    new Div(),
    { className: "container", style: "color:yellow;" },
    "111"
  ),
  "asdfasdf",
  myCreate(
    new Div(),
    { className: "container", style: "color:green;" },
    "111"
  )
);