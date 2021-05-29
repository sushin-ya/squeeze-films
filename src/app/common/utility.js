export default function getYear(yyyyMmDd) {
  return yyyyMmDd.slice(0, 4);
}

export function getFileExtention(filename) {
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
}
