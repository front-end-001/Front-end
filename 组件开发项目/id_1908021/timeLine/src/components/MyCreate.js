export default function myCreate(Class, attributes) {
  console.log(arguments);
  const object = new Class(attributes);
  return object;
}
