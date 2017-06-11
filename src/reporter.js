export default class Reporter {
  constructor (encoder, stream) {
    this.encoder = encoder
    this.stream = stream || process.stdout
  }

  report (spanFields) {
    let encoded = this.encoder.encode(spanFields)
    this.stream.write(encoded)
  }
}
