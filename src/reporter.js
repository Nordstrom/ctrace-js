export default class Reporter {
  constructor (encoder, stream) {
    this.encoder = encoder
    this.stream = stream || process.stdout
  }

  report (spanFields) {
    let encoded = this.encoder.encode(spanFields)
    // if route is in the ignoreList, encoded may be undefined here
    if (!encoded) {
      return
    }
    this.stream.write(encoded)
  }
}
